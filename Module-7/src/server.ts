import express, {type Application, type Request, type Response} from "express";
//const express = require('express')
const app : Application = express();
const port = 3000;

app.use(express.json());// Middle Ware


app.get('/', (req : Request, res:Response) => {
  res.send('Hello World! This is express Server');
})

app.get('/User', (req: Request , res: Response) => {
 // res.send('This is user route');
  res.status(200).json({
    "message" : "Express Server",
    "author": "Next",
  })

})

app.post('/', async(req: Request, res: Response)=>
{
    console.log(req.body);

    res.status(201).json({
        "success": true,
        data: req.body,
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})