import React, { useEffect, useState } from 'react'
import api from '../api'
import Chats from './Chats'
import { Link } from 'react-router-dom'

const Index = () => {
    
    const [chats, setChats] = useState([])

    useEffect(() => {
        api.get('api/chat/rooms')
        .then(res => {
            setChats(res.data)
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    return (
        <div>
            {chats.map((chat) => {
                return(<Link to={`/room/${chat.id}`} key={chat.id}><Chats chat={chat} key={chat.id} /></Link>)
            })}
        </div>
    )
}

export default Index