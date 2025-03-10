import React, {useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from './AuthContext'
import api from '../api'

const NavBar = () => {
    const {Authenticated, user} = useContext(AuthContext)

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Nuxlink</Navbar.Brand>
                <Nav className="me-auto">
                    {Authenticated ? <Nav.Link href="#link">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar