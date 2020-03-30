import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Login.css'


const Login =  ({hostName, setUserName, setUserEmail, setHome}) => {
  const[errorText, setErrorText] = useState(null);

  let userInfo = {
      email : "",
      pass: ""
  } 

  const onLogInClick = async () =>{

      const response = await fetch(hostName+"signin/", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userInfo)
      })

      const data = await response.json();

      if(await data !== "SIGNIN ERROR"){
          userInfo.pass = "";
          setUserName(data.name)
          setUserEmail(data.email)
          setHome()
      }else{
          setErrorText("Either Email Or Password is wrong");
      }
  }

  const onEmailChange = (event) =>{
      userInfo.email = event.target.value;
  }

  const onPassChange = (event) =>{
      userInfo.pass = event.target.value;
  }

  return (
    <Form className="login-form center">
      <h1> Sign in to Doctorpur </h1>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your Email" onChange = {onEmailChange}/>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" placeholder="Enter your Password" onChange = {onPassChange}/>
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block" onClick = {onLogInClick}>Log in</Button>
      <div className="text-center">
        <a href ="/registration"> Sign up</a>
        <span className="p-2">|</span>
        <a href="/registration">Forgot Password</a>
      </div>
      <p> {errorText}</p>
    </Form>
  );
}

export default Login;heroku run rake db:migrate