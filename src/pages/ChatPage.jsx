import React, {useEffect, useState} from 'react'
import api from '../api'
import styles from './ChatPage.module.css'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'
import Chat from './Chat'

const ChatPage = () => {

	const {uuid} = useParams()
	const [participants, setParticipants] = useState([])
	const [room, setRoom] = useState([])

  	useEffect(() => {
	
		api.get(`api/chat/room/${uuid}`)
		.then(res => {
			setParticipants(res.data.participants)
			setRoom(res.data)
		})
		.catch(err => {
			console.log(err.message);
		})
	}, [])

    return (
		<>
			<div className={`${styles.chat}`}>
				<div  className={`${styles.sidebar}`}>
					{participants.map((participant) => {
						return(<Sidebar participant={participant.full_name} key={participant.full_name}/>)
					})}
				</div>
				
				<div className={`${styles.chatarea}`}>
					<div className={`${styles.chatheader}`}>{room.name}</div>
					<Chat uuid={uuid}/>
				</div>
			</div>
		</>
    )
}

export default ChatPage