import React from "react";
import { AuthData } from "../../services/AuthService";
import Card from "react-bootstrap/Card";
import UserStackItem from "./UserStackItem";

const ChatListItem = ({ chat }) => {

  return (
    
    <Card style ={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginBottom : "1rem"}}>
       {/* <Card.Img variant="left" src={user.image} /> */}
      <Card.Body>
        <div></div>
        <div>{chat.chatName}</div>
        </Card.Body>
    </Card>
    // <>
    
    // <UserStackItem setSelectedChat={setSelectedChat} chat={chati} selectedChat={selectedChat}/>
    // </>
  );
};

export default ChatListItem;
