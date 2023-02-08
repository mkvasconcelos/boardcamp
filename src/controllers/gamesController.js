import connection from "../database/database.js";

export async function gamesCreate(_, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals;
  try {
    const result = await connection.query(
      `INSERT INTO games (name, image, stockTotal, pricePerDay) 
         VALUES ($2, $3, $4, $5);`,
      [name, image, stockTotal, pricePerDay]
    );
    console.log(result);
    res.send(201);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function gamesRead(_, res) {
  try {
    const result = await connection.query(`SELECT * FROM games;`);
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}
