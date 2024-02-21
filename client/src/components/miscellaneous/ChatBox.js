import React from 'react'
import { AuthData } from '../../services/AuthService';
import SingleChat from '../SingleChat';
import "./../../styles/ChatBox.css";

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat} = AuthData();
  return (
    <div className = "chatbox" >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}

export default ChatBox
