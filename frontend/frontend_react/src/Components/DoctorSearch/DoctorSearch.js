// import react
import React, {useEffect, useState} from 'react'

// import react bootstrap
import {Form, Dropdown,} from 'react-bootstrap'

// import local css file
import './DoctorSearch.css'

// import local modles
import SearchList from './SearchList/SearchList';

const DoctorSearch = ({hostname}) =>{

    // func for translating gender values
    const translateGender = (g) =>{
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
    let [gender, setGender] = useState('null');

    // searchdata state
    let [searchData, setSearchData] = useState([]);


    const onNameChange = (event) =>{
        setName(event.target.value)
    }

    const onSpecialChange = (event) =>{
        setSpecial(event.target.value)
    }

    const onGenderSelect = (event) =>{
        setGender(event)
    }

    useEffect( () =>{
        const req = hostname + 'd/name=' + name + '/special=' + special+ '/gender=' + gender;
        
        if (name.length === 0){
            setName('null')
        }

        if (special.length === 0){
            setSpecial('null')
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
    }, [name,special,gender])
    
    return(
        <div>
            <h1 className="doctor_title"> Search for your desired Doctor Here</h1>
            <Form className = "doctor_form">
                <Form.Group>
                    <Form.Label> Doctors Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter doctor's name" onChange = {onNameChange}/>

                    <Form.Label> Doctors Specialization </Form.Label>
                    <Form.Control type="text" placeholder="Enter Doctor's specialization" onChange = {onSpecialChange}/>

                    <Form.Label> Doctor Gender</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {translateGender(gender)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey = 'm' onSelect = {onGenderSelect}>Male</Dropdown.Item>
                            <Dropdown.Item eventKey = 'f' onSelect = {onGenderSelect}>Female</Dropdown.Item>
                            <Dropdown.Item eventKey = 'null' onSelect = {onGenderSelect}>All</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </Form>
            <SearchList objList = {searchData}/>
        </div>
    )
}

export default DoctorSearch