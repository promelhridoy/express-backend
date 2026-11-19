import express, { type Application, type Request, type Response } from "express";
import { pool } from "./db";
import { userRouter } from "./modules/users/user.route";
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from "./modules/auth/auth.route";


const app: Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/users", userRouter)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth", authRoute)

app.get("/", (req : Request, res: Response) => {
//   res.send("Hello World!");


res.status(200).json({
    success: true,
    message: "This is root route",
    author: "PHH",
})
});





export default app;