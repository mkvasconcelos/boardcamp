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
  const result = await connection.query(`SELECT * FROM games;`);
  //   console.log(result.rows);
  console.log(result);
  res.send(result.rows[0]);
}
