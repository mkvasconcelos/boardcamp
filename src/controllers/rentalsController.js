import connection from "../database/database.js";
import dayjs from "dayjs";

export async function rentalsRead(_, res) {
  try {
    const result = await connection.query(
      `SELECT rentals.*, games.name AS "gameName", customers.name AS "customerName" 
      FROM rentals 
      INNER JOIN games ON games.id = rentals."gameId"
      INNER JOIN customers ON customers.id = rentals."customerId";`
    );
    let answer = [];
    for (let i = 0; i < result.rows.length; i++) {
      answer.push({
        id: result.rows[i].id,
        customerId: result.rows[i].customerId,
        gameId: result.rows[i].gameId,
        rentDate: result.rows[i].rentDate,
        daysRented: result.rows[i].daysRented,
        returnDate: result.rows[i].returnDate,
        originalPrice: result.rows[i].originalPrice,
        delayFee: result.rows[i].delayFee,
        customer: {
          id: result.rows[i].customerId,
          name: result.rows[i].customerName,
        },
        game: {
          id: result.rows[i].gameId,
          name: result.rows[i].gameName,
        },
      });
    }
    return res.status(200).send(answer);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function rentalsCreate(_, res) {
  const { customerId, gameId, daysRented, game } = res.locals;
  try {
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        dayjs().format("YYYY-MM-DD"),
        daysRented,
        null,
        daysRented * game.pricePerDay,
        null,
      ]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}