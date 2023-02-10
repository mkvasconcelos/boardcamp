import connection from "../database/database.js";

export async function gamesCreate(_, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals;
  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );
    res.send(201);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function gamesRead(req, res) {
  const { name } = req.query;
  try {
    let query = `SELECT * FROM games;`;
    if (name) {
      query = `SELECT * FROM games WHERE name ILIKE '${name}%';`;
    }
    const result = await connection.query(query);
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}
