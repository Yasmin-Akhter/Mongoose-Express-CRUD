import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./app/module/user/user.route";
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello Worldddd!");
});

export default app;
