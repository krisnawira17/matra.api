import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

//test connection
// app.get("/getAllUser", (req, res) => {
//   const get_query = `SELECT * FROM "user"`;
//   connection.query(get_query, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       console.log(result);
//       res.send(result.rows);
//     }
//   });
// });

//Server running
app.listen(port, () =>
  console.log(`Server is running on http:localhost:${port}`)
);
