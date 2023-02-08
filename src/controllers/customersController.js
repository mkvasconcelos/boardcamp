import connection from "../database/database.js";

export async function customersCreate(_, res) {
  const { name, phone, cpf, birthday } = res.locals;
  try {
    const result = await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
         VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    return res.send(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function customersRead(_, res) {
  try {
    const result = await connection.query(`SELECT * FROM customers;`);
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function customersReadId(req, res) {
  const { id } = req.params;
  try {
    const result = await connection.query(
      `SELECT * FROM customers WHERE id = ${id};`
    );
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}
