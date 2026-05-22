import express, { type Application, type Request, type Response } from "express";
import { Pool, Result } from "pg";
import { error } from "node:console";
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.status(201).json(
    {
      message: "Express Server",
      author: "Next Level"
    }
  );
});

app.use('/api/users', userRoute)


app.use("/api/profiles", profileRoute)


app.use("/api/auth",authRoute)




export default app;