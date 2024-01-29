import React from 'react'
import { AuthData } from '../../services/AuthService';
import SingleChat from '../SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat} = AuthData();
  return (
    <div className = "bg-secondary">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}

export default ChatBox
