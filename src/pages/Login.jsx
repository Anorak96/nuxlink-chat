import React, { useContext, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'

const login = () => {

    const navigate = useNavigate()
	const {setAuthenticated} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const userInfo = {username, password}

    function handlesubmit(e){
        e.preventDefault()
        api.post('user/token', userInfo)
        .then(res => {
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
			setAuthenticated(true)
            navigate('/')
        })
        .catch(err => {
            console.log(err.message);
        })
    }

	return (
		<section style={{'padding': "7em 0"}} >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="p-4 p-md-5" style={{'backgroundColor': '#382C58', 'borderRadius': '10px'}}>
                            <Form onSubmit={handlesubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	)
}

export default login