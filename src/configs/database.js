import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const connection = new Pool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.on("connect", () => {
  console.log("Connection has been established with postgress");
});

export default connection;
