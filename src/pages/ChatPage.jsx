import React, {useEffect, useState} from 'react'
import api from '../api'
import styles from './ChatPage.module.css'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'
import Chat from './Chat'

const ChatPage = () => {

	const {room_name} = useParams()

	const [participants, setParticipants] = useState([])
	
    useEffect(() => {
		// Get participants
		api.get(`chat/${room_name}`)
		.then(res => {
			setParticipants(res.data.participants)
		})
		.catch(err => {
			console.log(err.message);
		})
	}, [])

    return (
		<>
			<NavBar />
			<div className={`${styles.chat}`}>
				<div  className={`${styles.sidebar}`}>
					{participants.map((participant) => {
						return(<Sidebar participant={participant.username} key={participant.username}/>)
					})}
				</div>
				
				<div className={`${styles.chatarea}`}>
					<div className={`${styles.chatheader}`}>Chat </div>
					<Chat room_name={room_name}/>
				</div>
			</div>
		</>
    )
}

export default ChatPage