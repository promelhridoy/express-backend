import express, { type Application, type Request, type Response } from "express";
import type { resolvePtr } from "node:dns";

const app: Application = express();

const PORT = 3000;

app.get("/", (req : Request, res: Response) => {
//   res.send("Hello World!");


res.status(200).json({
    success: true,
    message: "This is root route",
    author: "PHH",
})
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});