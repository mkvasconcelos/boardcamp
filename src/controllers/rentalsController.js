import connection from "../database/database.js";
import dayjs from "dayjs";

export async function rentalsRead(_, res) {
  try {
    const result = await connection.query(`SELECT * FROM rentals;`);
    return res.status(200).send(result.rows);
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
    return res.send(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
