import connection from "../database/database.js";

export async function customersCreate(_, res) {
  const { name, phone, cpf, birthday } = res.locals;
  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
         VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    return res.send(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function customersUpdate(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = res.locals;
  try {
    const resultId = await connection.query(
      `SELECT * FROM customers WHERE id = ${id};`
    );
    if (resultId.rows.length === 0) {
      return res.sendStatus(404);
    }
    await connection.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = ${id};`,
      [name, phone, cpf, birthday]
    );
    return res.send(200);
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

export async function customersReadId(_, res) {
  const { id } = res.locals;
  try {
    const result = await connection.query(
      `SELECT * FROM customers WHERE id = ${id};`
    );
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
}
