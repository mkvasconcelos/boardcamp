import connection from "../database/database.js";

export async function customersDocumentValidation(_, res, next) {
  const { cpf, id } = res.locals;
  try {
    let query;
    if (id) {
      query = `SELECT * FROM customers WHERE cpf = '${cpf}' AND id <> ${id};`;
    } else {
      query = `SELECT * FROM customers WHERE cpf = '${cpf}';`;
    }
    const result = await connection.query(query);
    if (result.rows.length !== 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
