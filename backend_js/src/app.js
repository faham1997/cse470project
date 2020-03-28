//express
const express = require("express")
const app = express()

// knex db
const pg = require('./pg_knex_deploy')

// cors
const cors = require('cors')
app.use(cors())

//bcrypt
const bcrypt = require('bcrypt');
const hashStr = 10;

// deault root path for testing
app.get('/', (req, res) =>{
    res.status(200).json("This is the root path. Please consult the api docs for more info")
})


//register func
app.post("/register", (req, res) => {

  const {name, email, password } = req.body;
  let hash_password = bcrypt.hashSync(password, hashStr);
  
  if (email === null || password === null) {
      res.json("Empty Email or password");
  }

  let new_user = {
      user_id: email,
      name: name,
      pass_hash: hash_password
  }


  pg('users')
  .insert(new_user)
  .then( () =>{
      res.status(200).json("REGISTERED");
  })
  .catch( (err) =>{
      res.status(400).json("REGISTRATION ERROR")
  });

})



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

// get all doctor info
app.get('/d', async(req, res)=>{

  const name = 'null'
  const special = 'null'
  const gender = 'null'

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

// get  doctor info with name only
app.get('/d/name=:name', async(req, res)=>{

  const {name} = req.params
  const special = 'null'
  const gender = 'null'

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


// get  doctor info with specialization only
app.get('/d/special=:special', async(req, res)=>{

  const name = 'null'
  const {special} = req.params
  const gender = 'null'

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

// get  doctor info with gender only
app.get('/d/gender=:gender', async(req, res)=>{

  const name = 'null'
  const special = 'null'
  const {gender} = req.params

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

//get hospital info by name 
app.get('/h/name=:name', async(req, res)=>{

  const type = 'null'
  const {name} = req.params

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

//get hospital info by type
app.get('/h/type=:type', async(req, res)=>{

  const {type} = req.params
  const name = 'null'
  
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
module.exports.app = app
module.exports.pg = pg
