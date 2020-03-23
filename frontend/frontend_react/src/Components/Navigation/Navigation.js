// import react
import React from 'react'

//imporrt Bootstrap components
import {Navbar, Nav} from 'react-bootstrap'

// import local css file
import "./Navigation.css"


const Navigation = () =>{
    return(
        <nav className = "base_nav">
            <Navbar sticky = "top" bg="light" expand="lg" >
                <Navbar.Brand href="#home">Doctor Coconut</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link> Home </Nav.Link>
                        <Nav.Link> Manage Appointments </Nav.Link>
                        <Nav.Link> Search for Doctors</Nav.Link>
                        <Nav.Link> Search for Hospitals</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </nav>
    )
}

export default Navigation;