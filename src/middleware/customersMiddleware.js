import connection from "../database/database.js";

export async function customersDocumentValidation(_, res, next) {
  const { cpf } = res.locals;
  try {
    const result = await connection.query(
      `SELECT * FROM customers WHERE (cpf) = '${cpf}';`
    );
    console.log(result);
    if (result.rows.length === 1) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
