import connection from "../database/database.js";

export async function customersCreate(_, res) {
  const { name, phone, cpf, birthday } = res.locals;
  try {
    const result = await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
         VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    res.send(201);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function customersRead(_, res) {
  try {
    const result = await connection.query(`SELECT * FROM customers;`);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
}
