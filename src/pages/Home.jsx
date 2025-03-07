import React, { useEffect, useState } from 'react'
import api from '../api'
import NavBar from './NavBar'
import Chats from './Chats'
import { Link } from 'react-router-dom'

const Home = () => {
    
    const [chats, setChats] = useState([])

    useEffect(function(){
        api.get('chat/rooms')
        .then(res => {
            setChats(res.data)
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    return (
        <>
            <NavBar />
            <div className='mx-3 my-5'>
                {chats.map((chat) => {
                    return(<Link to={`/room/${chat.room_name}`} key={chat.id}><Chats chat={chat} key={chat.id} /></Link>)
                })}
            </div>
        </>
    )
}

export default Home