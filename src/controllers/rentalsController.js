import connection from "../database/database.js";
import dayjs from "dayjs";

export async function rentalsRead(req, res) {
  const { customerId, gameId, order, desc, offset, limit, status, startDate } =
    req.query;
  try {
    let query = `SELECT rentals.*, games.name AS "gameName", customers.name AS "customerName" 
    FROM rentals 
    INNER JOIN games ON games.id = rentals."gameId"
    INNER JOIN customers ON customers.id = rentals."customerId"`;
    if (customerId) {
      query += ` WHERE "customerId" = ${Number(customerId)}`;
    }
    if (gameId) {
      if (query.includes("WHERE")) {
        query += ` AND "gameId" = ${gameId}`;
      } else {
        query += ` WHERE "gameId" = ${gameId}`;
      }
    }
    if (startDate) {
      if (query.includes("WHERE")) {
        query += ` AND "rentDate" >= '${startDate}'`;
      } else {
        query += ` WHERE "rentDate" >= '${startDate}'`;
      }
    }
    if (status) {
      if (status === "open") {
        if (query.includes("WHERE")) {
          query += ` AND "returnDate" IS NULL`;
        } else {
          query += ` WHERE "returnDate" IS NULL`;
        }
      } else if (status === "closed") {
        if (query.includes("WHERE")) {
          query += ` AND "returnDate" IS NOT NULL`;
        } else {
          query += ` WHERE "returnDate" IS NOT NULL`;
        }
      }
    }
    if (order) {
      query += ` ORDER BY "${order}"`;
    }
    if (desc) {
      query += ` DESC`;
    }
    if (limit) {
      query += ` LIMIT ${limit}`;
    }
    if (offset) {
      query += ` OFFSET ${offset}`;
    }
    const result = await connection.query(query + ";");
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

export async function rentalsFinish(_, res) {
  const { id, delayFee, daysRented, rentDate, gameId } = res.locals;
  let newDelayFee = delayFee;
  const newReturnDate = new Date(new Date().setHours(0, 0, 0, 0));
  const deltaTime =
    (newReturnDate.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24);
  if (deltaTime > daysRented) {
    const result = await connection.query(
      `SELECT "pricePerDay" FROM games WHERE id = ${gameId};`
    );
    const pricePerDay = result.rows[0].pricePerDay;
    newDelayFee = (deltaTime - daysRented) * pricePerDay;
  }
  try {
    await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = ${id};`,
      [newReturnDate, newDelayFee]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function rentalsDelete(_, res) {
  const { id } = res.locals;
  try {
    await connection.query(`DELETE FROM rentals WHERE id = ${id};`);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}
