// import react
import React, {useEffect} from 'react'

// import react bootstrap
import {Form, Dropdown,} from 'react-bootstrap'

const DoctorSearch = ({hostname}) =>{

    // search info variables
    let name = 'null';
    let special = 'null';
    let gender = 'null';

    const onNameChange = (event) =>{
        name = event.target.value
        if (name === ""){
            name = "null"
        }

    }

    const onSpecialChange = (event) =>{
        special = event.target.value
        if (special === ""){
            special = "null"
        }
    }

    const onGenderSelect = (event) =>{
        gender = event
    }

    useEffect( () =>{
        const req = hostname + 'd/name=' + name + '/special=' + special+ '/gender=' + gender;
        fetch(req).then(
            (response) =>{
                response.json.then(
                    (data)=>{
                        console.log(data)
                    }
                )
            }
        )
    }, [name,special,gender])
    
    return(
        <div>
            <Form>
                <Form.Group>
                    <Form.Label> Doctors Name </Form.Label>
                    <Form.Control type="text" placeholder="Normal text" onChange = {onNameChange}/>

                    <Form.Label> Doctors Specialization </Form.Label>
                    <Form.Control type="text" placeholder="Normal text" onChange = {onSpecialChange}/>

                    <Form.Label> Doctor Gender</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey = 'm' onSelect = {onGenderSelect}>Male</Dropdown.Item>
                            <Dropdown.Item eventKey = 'f' onSelect = {onGenderSelect}>Female</Dropdown.Item>
                            <Dropdown.Item eventKey = 'null' onSelect = {onGenderSelect}>All</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </Form>
        </div>
    )
}

export default DoctorSearch