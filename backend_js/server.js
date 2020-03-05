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
  
  //import doctor GET methods
  const GET_d = require('./GET_doctor')

  // set search terms as a js object
  const s_terms = await GET_d.set_input(name,special,gender)
  try{
    let data = await pg.select('*').from('doctor_info').where(s_terms)
    data = await GET_d.set_res(data)
    res.status(200).json(data)
  }catch(err){
    res.status(400).json("search_failed")
  }

})

//get hospital info by name & type
app.get('/h/name=:name/type=:type', async(req, res)=>{

  const {name, type} = req.params

  //import hospital GET methods
  const GET_h = require('./GET_hospital') 

  // set search terms as a js object
  const s_terms = await GET_h.set_input(name,type)

  try{
    let data = await pg.select('*').from('hospital_info').where(s_terms)
    data = await GET_h.set_res(data)
    res.status(200).json(data)
  }catch(err){
    res.status(400).json("search_failed")
  }

})

app.listen(PORT)