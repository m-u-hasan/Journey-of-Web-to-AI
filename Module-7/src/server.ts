import express, { type Application, type Request, type Response } from "express";
import { Pool, Result } from "pg";
import { error } from "node:console";
import config from "./config";


const app: Application = express();
const port =config.port;

app.use(express.json());

const pool = new Pool({
  connectionString: config.connecion_string,
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
      res.status(404).json({
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


//===============Update user table===============
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age } = req.body;
  // console.log("Id: ", id);
  // console.log(name, password, age);
  try {
    const result = await pool.query(`
    UPDATE users
    SET
    name=COALESCE($1, name), 
    password=COALESCE($2, password),
    age=COALESCE($3, age)
    WHERE id=$4 
    RETURNING *
    `, [name, password, age, id]);
    //COALESCE ( , ) use for update separately, not effect another


    //=====if user not exist, so that updt will not completed========
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not Exist"
      })
    }

    res.status(200).json({
      success: true,
      message: "User update Successfully",
      data: result.rows[0]

    })
  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }


});

//=============User Delte from DB=============
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      DELETE FROM users where id=$1
      `, [id],
    );
        // If user not exist in DB, so that we check early
    if (result.rowCount === 0) {
      res.status(500).json({
        status: true,
        message: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User Delted successfully",
      data: {}
    })
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message
    })
  }
});



app.listen(port, () => {
  console.log(`Your listening on port ${port}`);
});

