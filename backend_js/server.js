//constants
const PORT = 3000

//express
const express = require("express")
const app = express()

//basic get
app.get("/", (req, res) =>{
    res.status(200).json("Hello World")
})

app.listen(PORT)