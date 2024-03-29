// import react
import React from 'react'

//imporrt Bootstrap components
import {Navbar, Nav} from 'react-bootstrap'

// import local css file
import "./Navigation.css"

// import local modules
import Homepage from '../Homepage/Homepage'
import DoctorSearch from '../DoctorSearch/DoctorSearch'
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
import HospitalSearch from '../HospitalSearch/HospitalSearch'

const Navigation = ({currentPageSetter, hostname, setUserName, setUserEmail}) =>{

    // navigation link controls
    const onHome = () =>{
        currentPageSetter(<Homepage/>)
    }

    const onDoctorSearch = () =>{
        currentPageSetter(<DoctorSearch hostname = {hostname}/>)
    }


    const onHospitalSearch = () =>{
        currentPageSetter(<HospitalSearch hostname = {hostname}/>)
    }

    const onLogin = () =>{
        currentPageSetter(<Login hostName = {hostname} setUserName = {setUserName} setUserEmail={setUserEmail} setHome = {onHome}/>)
    }

    const onRegistration = () =>{
        currentPageSetter(<Registration/>)
    }

    return(
        <nav className = "base_nav">
            <Navbar sticky = "top" bg="light" expand="lg" >
                <Navbar.Brand href="#home">Doctorpur</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick = {onHome}> Home </Nav.Link>
                        <Nav.Link> Manage Appointments </Nav.Link>
                        <Nav.Link onClick = {onDoctorSearch} > Search for Doctors</Nav.Link>
                        <Nav.Link onClick = {onHospitalSearch}> Search for Hospitals</Nav.Link>
                        <Nav.Link onClick = {onLogin}> Login </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </nav>
    )
}

export default Navigation;