import express, {type Application, type Request, type Response} from "express";
import{Pool} from "pg";
//const express = require('express')
const app : Application = express();
const port = 3000;
app.use(express.json());// MiddleWare




const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', (req : Request, res:Response) => {
  res.send('Hello World! This is express Server');
});

app.get('/User', (req: Request , res: Response) => {
 // res.send('This is user route');
  res.status(200).json({
    "message" : "Express Server",
    "author": "Next",
  });

});

//=================Data Type of SQL===============
        //boolean
        //Numbers
        //Binary
        //Date/time
        //Json
        //Character
        //UUID
        //Array
        //XML
//=================Data Type of SQL==============


app.post('/', async(req: Request, res: Response)=>
{
    //console.log(req.body);

    const {name, email, password}=req.body;

    res.status(201).json({
        "success": true,
        "message": "Created Data",
        data: {
            name,
            email,
        },
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})