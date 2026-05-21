import express, { type Application, type Request, type Response } from "express";
import { Pool, Result } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express()

const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is express Server");
});


//=================Created a Table===================

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,

        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      )
    `);

    console.log("Database Connected");
  } catch (error) {
    console.error("DB ERROR:", error);
  }
};

initDB();

app.get('/', (req: Request, res: Response) => {
  res.status(201).json(
    {
      message: "Express Server",
      author: "Next Level"
    }
  );
});


//==============Insert Data in users Table=================
app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(`
  INSERT INTO users(name, email, password, age) VALUES($1,$2,$3,$4)
  RETURNING *`, [name, email, password, age]);
    console.log(result);

    res.status(201).json(
      {
        success: true,
        message: "User create Successfully",
        data: result.rows[0],
      }
    );
  } catch (error: any) {
    res.status(500).json(
      {
        message: error.message,
        error: error,
      }
    )
  }
});

//================Retrive All User of DB============= 

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECt *from users
      `);
    res.status(200).json({
      success: true,
      message: "All User Retrive successfully",
      data: result.rows
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User cant't get",
      data: error
    });
  }
});


//======================Retrive Single user with params================
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
  SELECT *from users where id=$1
  `, [id])

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "User Not found in DB",
        data: []
      })
    }
    res.status(200).json({
      success: true,
      message: "Single User Retrive successfully",
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      data: error
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

