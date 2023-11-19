import express, { Express, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get("/", (_, res: Response) => {
  res.status(200).json({ message: "success" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
