import connection from "../database/database.js";

export async function rentalsIdValidation(req, res, next) {
  const { id } = req.params;
  try {
    const result = await connection.query(
      `SELECT "rentDate", "returnDate", "daysRented", "gameId", "delayFee" FROM rentals WHERE id = ${id};`
    );
    const returnDate = result.rows[0].returnDate;
    const rentDate = result.rows[0].rentDate;
    const daysRented = result.rows[0].daysRented;
    const gameId = result.rows[0].gameId;
    const delayFee = result.rows[0].delayFee;
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    } else if (returnDate) {
      return res.sendStatus(400);
    }
    res.locals.returnDate = returnDate;
    res.locals.delayFee = delayFee;
    res.locals.daysRented = daysRented;
    res.locals.rentDate = rentDate;
    res.locals.gameId = gameId;
    res.locals.id = id;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
