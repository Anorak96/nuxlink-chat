import React, { useEffect, useState} from 'react'
import api from '../api'
import Message from './Message'
import styles from './ChatPage.module.css'
import { jwtDecode } from 'jwt-decode'

const Chat = ({uuid}) => {

    const [socket, setSocket] = useState(null)
    const [chats, setChats] = useState([])
    const [user, setUser] = useState("") // account id
    const [sender, setSender] = useState("") // account id
    const [message, setMessage] = useState("")

    useEffect(() => {
        api.get(`api/chat/room/${uuid}/messages`)
		.then(res => {
            setChats(res.data)
            // console.log("Chats", res.data);
		})
		.catch(err => {
			console.log(err.message);
		})
        
        const token = localStorage.getItem("access")
        const decoded = jwtDecode(token)
        
        api.get(`api/employee/dashboard/${decoded.email}`)
        .then(res => {
            // console.log("Employee", res.data);  
            setUser(res.data)
            setSender(res.data.account)
		})
		.catch(err => {
			console.log(err.message);
		})
        
    },[])

    useEffect(() => {
        const websocketProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const socketURL = `${websocketProtocol}://nuxlink.onrender.com/ws/chat/${uuid}/`;
        const socket = new WebSocket(socketURL)
        setSocket(socket)
            
        socket.onopen = () => {
            console.log("Connection Established");
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log("receiving data", data);
            setChats((prevMessages) => [...prevMessages, data]);
        }

        socket.onclose = () => {
            console.log('Socket closed');
        }

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        }

        return () => {
            socket.close()
        }
    }, [uuid])

    const sendMessage = () => {
        if (socket && message.trim()) {
            socket.send(
                JSON.stringify({
                    room_uuid: `${uuid}`,
                    body: message,
                    sender: user.account // account id
                })
            );
            setMessage("")
        }
    }

    return (
        <div>
            <div className={`${styles.messages}`}>
                {chats && chats.map((chat) => {
                    return(<Message chat={chat} key={chat.id} classname={user.account === chat.sender.account ? styles.sent : styles.receive}/>)
                })}
            </div>
            <div className={`${styles.messageinput}`} >
                <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
