import connection from "../database/database.js";

export async function gamesNameValidation(_, res, next) {
  const { name } = res.locals;
  try {
    const result = await connection.query(
      `SELECT * FROM games WHERE name = '${name}';`
    );
    if (result.rows.length !== 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function gamesIdValidation(_, res, next) {
  const { gameId } = res.locals;
  try {
    const result = await connection.query(
      `SELECT * FROM games WHERE id = ${gameId};`
    );
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.locals.gameId = gameId;
    res.locals.game = result.rows[0];
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function gamesStockValidation(_, res, next) {
  const { gameId, game } = res.locals;
  try {
    const gamesRented = await connection.query(
      `SELECT COUNT(*) FROM rentals WHERE "gameId" = ${gameId} AND "returnDate" IS NULL;`
    );
    if (Number(gamesRented.rows[0].count) === game.stockTotal) {
      return res.sendStatus(404);
    }
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
