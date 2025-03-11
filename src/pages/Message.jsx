import React from 'react';
import styles from './ChatPage.module.css'

function Message({ chat, classname }) {
    return (
        <div className={classname}>
            <div className={`${styles.message}`}>
                <h6 className={`${styles.messagetext}`}>{chat && chat.body}</h6>
                <p className={`${styles.messageemail}`}>{chat && chat.sender && chat.sender.full_name}</p>
            </div>
        </div>
    );
}

export default Message;
