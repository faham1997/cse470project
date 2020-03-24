// import react
import React, {useEffect, useState} from 'react'

// import react bootstrap
import {Form, Dropdown,} from 'react-bootstrap'

// import local modles
import SearchList from './SearchList/SearchList';

const DoctorSearch = ({hostname}) =>{

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
            <SearchList objList = {searchData}/>
        </div>
    )
}

export default DoctorSearch