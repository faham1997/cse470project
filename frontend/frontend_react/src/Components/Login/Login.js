import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Login.css'


export default function Login() {
  return (
    <Form className="login-form">
      <h1>
        <span className="font-weight-bold"> doctorpur</span>.com
      </h1>
      <h2 className="text-center">Welcome </h2>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your Email"/>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" placeholder="Enter your Password"/>
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block">Log in</Button>
      <div className="text-center">
        <a href ="/registration"> Sign up</a>
        <span className="p-2">|</span>
        <a href="/registration">Forgot Password</a>
      </div>
    </Form>
  );
}
