//constants
const PORT = 3000

//express
const express = require("express")
const app = express()

// knex db
const knex = require('knex')
const pg = require('knex')({
  client: 'pg',
  connection: {
    user : 'postgres',
    password : 'deepfreeze',
    database : '470project'
  }
});

//get doctor info by name, gender & specialization
app.get('/d/name=:name/special=:special/gender=:gender', async(req, res)=>{

  const {name, special, gender} = req.params
  //doctor GET methods
  const GET_d = require('./GET_doctor') 

  // set inputs as a js object
  const s_terms = await GET_d.set_input(name,special,gender)
  try{
    let data = await pg.select('doctor_name', 'specialization', 'gender').from('doctor').where(s_terms)
    res.status(200).json(data)
  }catch(err){
    res.status(400).json("search_failed")
  }

})

app.listen(PORT)