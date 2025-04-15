import connection from "../configs/database.js";

export const createUser = async (username, email, hashedPassword) => {
  const result = await connection.query(
    `INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

export const findByUsername = async (username) => {
  const result = await connection.query(
    `SELECT * FROM "user" WHERE name = $1`,
    [username]
  );
  console.log(result.rows);
  return result.rows[0];
};
