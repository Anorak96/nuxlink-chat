import React from 'react'
import { Button } from 'react-bootstrap'

const Chats = ({chat}) => {
    return (
        <div>
            <Button className='m-1'>{chat.name}</Button>
        </div>
    )
}

export default Chats