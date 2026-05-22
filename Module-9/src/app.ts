import express, { type Application, type Request, type Response } from "express";
import { Pool, Result } from "pg";
import { error } from "node:console";
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

import fs from "fs"

const app: Application = express();
app.use(express.json());



app.use((req, res, next) => {
  console.log('\nMethod - Time - URL:',req.method, Date.now(), req.url);
  const log = `Method -> ${req.method} Time-> ${Date.now()} URL-> ${req.url}\n`;

  fs.appendFile('logger.txt', log, (err)=>{
    console.log(err);
  })
  next();
});


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