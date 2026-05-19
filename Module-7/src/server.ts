import express from "express"
//const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! This is express Server')
})

app.get('/User', (req, res) => {
  res.send('This is user route')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})