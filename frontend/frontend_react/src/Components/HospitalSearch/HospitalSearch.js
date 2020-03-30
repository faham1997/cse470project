// import react
import React, {useEffect, useState} from 'react'

// import react bootstrap
import {Form, Dropdown} from 'react-bootstrap'

// import local css file
import './HospitalSearch.css'

// import local modles
import SearchList from './SearchList/SearchList';

const HospitalSearch = ({hostname}) =>{

    // func for translating type values
    const translatetype = (g) =>{
        if( g === 'm'){
            return 'Male'
        }else if( g === 'f'){
            return 'Female'
        }else{
            return 'All'
        }
    }

    // search info variables
    let [name, setName] = useState('null');
    let [special, setSpecial] = useState('null');
    let [type, setType] = useState('null');

    // searchdata state
    let [searchData, setSearchData] = useState([]);


    const onNameChange = (event) =>{
        setName(event.target.value)
    }

    const ontypeSelect = (event) =>{
        setType(event)
    }

    useEffect( () =>{
        const req = hostname + 'h/name=' + name + '/type=' + type;
        
        if (name.length === 0){
            setName('null')
        }


        fetch(req).then(
            (response) =>{
                console.log(response)
                response.json().then(
                    (data)=>{
                        setSearchData(data)
                    }
                )
            }
        )
    }, [name,type])
    
    return(
        <div>
            <h1 className="doctor_title"> Search for your desired Hospital Here</h1>
            <Form className = "doctor_form">
                <Form.Group>
                    <Form.Label> Hospital Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter doctor's name" onChange = {onNameChange}/>

                    <Form.Label> Hospital Type</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {translatetype(type)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey = 'null' onSelect = {ontypeSelect}>All</Dropdown.Item>
                            <Dropdown.Item eventKey = 'Hospital' onSelect = {ontypeSelect}>Hospital</Dropdown.Item>
                            <Dropdown.Item eventKey = 'Clinic' onSelect = {ontypeSelect}>Clinic</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </Form>
            <SearchList objList = {searchData}/>
        </div>
    )
}

export default HospitalSearch