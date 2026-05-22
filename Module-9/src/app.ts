import express, { type Application, type Request, type Response } from "express";
import { Pool, Result } from "pg";
import { error } from "node:console";
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

import fs from "fs"
import logger from "./middleware/logger";

const app: Application = express();
app.use(express.json());

//===========express middleware=========== 
app.use(logger);


app.get('/', (req: Request, res: Response) => {
  res.status(200).json(
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