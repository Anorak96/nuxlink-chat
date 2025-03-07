import React, { useEffect, useRef, useState} from 'react'
import api from '../api'
import Message from './Message'
import styles from './ChatPage.module.css'

const Chat = ({room_name}) => {

    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState()
    const [mess, setMessage] = useState('');

    useEffect(() => {
        api.get(`chat/${room_name}/messages`)
		.then(res => {
			setMessages(res.data)
		})
		.catch(err => {
			console.log(err.message);
		})

        api.get(`user/`)
		.then(res => {
			setUser(res.data.username)
		})
		.catch(err => {
			console.log(err.message);
		})
    },[])

    useEffect(() => {
        const socketURL = `wss://nuxlink-chat.onrender.com/ws/messages/${room_name}/`;
        const socket = new WebSocket(socketURL)

        socket.onopen = () => {
            console.log("Connection Established");
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        }

        socket.onclose = () => {
            console.log('Socket closed');
        }

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close()
        }
	}, [socket])

    const sendMessage = () => {
        // if (socket && mess) {
        //     socket.send(
        //         JSON.stringify({
        //             message: mess,
        //             sender: {username: user},
        //             room: `${room_name}`
        //         })
        //     );
        //     setMessage("")
        // }
	console.log("Sending Message": mess)
    }

    return (
        <div>
            <div className={`${styles.messages}`}>
                {messages && messages.map((mssage) => {
                    return(<Message mssage={mssage} key={mssage.id} classname={user === mssage.sender.username ? styles.sent : styles.receive}/>)
                })}
            </div>
            <div className={`${styles.messageinput}`} >
                <input type="text" placeholder="Type a message..." value={mess} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
