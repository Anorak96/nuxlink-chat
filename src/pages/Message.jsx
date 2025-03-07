import React from 'react';
import styles from './ChatPage.module.css'

function Message({ mssage, classname }) {
    return (
        <div className={classname}>
            <b>{mssage.sender.username}<strong>:</strong></b>
            <h6 className={`${styles.messagetext}`}>{mssage.message}</h6>
        </div>
    );
}

export default Message;
