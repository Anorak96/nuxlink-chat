import React, {useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import AuthContext from './AuthContext'
import api from '../api'

const NavBar = () => {
    const {Authenticated, setAuthenticated} = useContext(AuthContext)
    const [user, setUser] = useState()

    useEffect(function() {
        const access = localStorage.getItem("access")
        if(access){
            setAuthenticated(true)
        }

        if(access){
            api.get(`user/`)
            .then(res => {
                setUser(res.data.username)
            })
            .catch(err => {
                console.log(err.message);
            })
        }
    })
    function logout(){
        localStorage.removeItem("access")
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Chat</Navbar.Brand>
                <Nav className="me-auto">
                    {Authenticated ? <Button onclick={logout}>Logout {user}</Button> : <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar