import React from 'react'
import { Button, Form, FormGroup, Label, Input , CustomInput } from 'reactstrap';

import './Registration.css'


export default function Registration() {
  return (
    <Form className="registration-form">
      <h2>
        <span className="font-weight-bold"> Registration Page </span>
      </h2>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" placeholder="Enter your Name"/>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your Email"/>
      </FormGroup>
      <FormGroup>
        <Label>Password :</Label>
        <Input type="password" placeholder="Enter your Password"/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleCheckbox">Gender :</Label>
        <div>
          <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Male" />
          <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Female" />
        </div>
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block">Sign up</Button>
    </Form>
  );
}
