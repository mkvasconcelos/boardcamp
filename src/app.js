import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
