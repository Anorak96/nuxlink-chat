import React from 'react';
import styles from './ChatPage.module.css'

function Message({ chat, classname }) {
    return (
        <div className={classname}>
            <b>{chat && chat.sender && chat.sender.full_name}<strong>:</strong></b>
            <h6 className={`${styles.messagetext}`}>{chat && chat.body}</h6>
        </div>
    );
}

export default Message;
