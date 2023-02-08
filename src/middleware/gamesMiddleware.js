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
