import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [Authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState([])

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date > current_time){
                setAuthenticated(true)
            }
        }
    }

    function get_user(){
        api.get('api/auth/account')
        .then(res => {
            setUser(res.data)
		})
		.catch(err=> {
			console.log(err.message);
		})
    }
    
    useEffect(function(){
        handleAuth()
        get_user()
    }, [])

    const authValue = {Authenticated, user, setAuthenticated}

    return (
        <AuthContext.Provider value={authValue} >
            {children}
        </AuthContext.Provider>
    )
}