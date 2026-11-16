import express, { type Application, type Request, type Response } from "express";
import type { resolvePtr } from "node:dns";

const app: Application = express();

const PORT = 3000;

app.use(express.json())
app.use(express.text)
app.use(express.urlencoded({extended: true}))

app.get("/", (req : Request, res: Response) => {
//   res.send("Hello World!");


res.status(200).json({
    success: true,
    message: "This is root route",
    author: "PHH",
})
});

app.post("/", async (req: Request, res: Response) => {
    console.log(req.body);
    
})

app.listen(PORT, () => {
  console.log(`The Express server is running on the port ${PORT}`);
});