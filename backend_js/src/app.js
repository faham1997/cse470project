//express
const express = require("express")
const app = express()

// knex db
const pg = require('./pg_knex')

// cors
const cors = require('cors')
app.use(cors())

//bcrypt
const bcrypt = require('bcrypt');
const hashStr = 10;

//body parser 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

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

// user removal function (((NOTE: Remember to add admin authorization)))
app.post("/remove_user", (req, res) => {

  const {name, email } = req.body;

  if (email === null) {
      res.json("Empty Email");
  }

  let new_user = {
      user_id: email,
      name: name
  }

  pg('users')
  .where(new_user)
  .del()
  .then( () =>{
      res.status(200).json("USER REMOVED");
  })
  .catch( (err) =>{
      res.status(400).json("REMOVAL ERROR")
  });

})

// user signin function
app.post('/signin', async(req, res) =>{

  const {email, password } = req.body;
  
  if (email === null || password === null) {
      res.json("Empty Email or password");
  }

  const userData = await pg.select('*').from('users').where({user_id: email})
  const signinSuccess = bcrypt.compareSync(password, userData[0].pass_hash);

  if(signinSuccess){
    res.json(200).json(userData.email)
  }else{
    res.json(400).json("SIGNIN ERROR")
  }

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

// add an user appointment
app.post('/add_user_apt', async(req, res) =>{
  const {user_id, apt_id,doctor_id, hospital_id} = req.body
  const userData = {
    user_id: user_id,
    apt_id: apt_id,
    doctor_id: doctor_id,
    hospital_id: hospital_id
  }
  
  try{
    let data = await pg('user_apt').insert(userData)
    console.log(data)
    res.status(200).json("APPOINTMENT ADDED")
  }catch(err){
    res.status(400).json("data_insertion_failed")
  }
})

// get all appointment times
app.get('/all_appointments', async(req, res) =>{
  
  try{
    let data = await pg.select('*').from('all_appointments')
    res.status(200).json(data)
  }catch(err){
    res.status(400).json("data_retrival_failed")
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
