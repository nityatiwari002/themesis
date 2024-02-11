import React, { useEffect } from "react";
import { AuthData } from "../services/AuthService";
import { getSender } from "../services/ChatLogics";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import getCookies from "../hooks/getCookies";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from 'socket.io-client';
import "./../styles/SingleChat.css";
import Image from "react-bootstrap/Image";



const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, selectedChat, setSelectedChat } = AuthData();

  
    const fetchMessages = async () => {
      if (!selectedChat) return;
  
      try {
        const config = {
          headers: {
            authorization: `Bearer ${getCookies("jwt")}`,
          },
        };
  
        setLoading(true);
  
        const { data } = await axios.get(
          `http://127.0.0.1:5001/api/v1/messages/${selectedChat._id}`,
          config
        );
  
  
        setMessages(data);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
  
      } catch (error) {
        alert("Some Error fetching the messages for the selected chat!!");
        console.log("Error", error);
      }
    };

    const sendMessage = async (event) => {
      if (event.key === "Enter" && newMessages) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${getCookies("jwt")}`,
            },
          };
  
          setNewMessages("");
          const { data } = await axios.post(
            "http://127.0.0.1:5001/api/v1/messages",
            {
              content: newMessages,
              chatId: selectedChat._id,
            },
            config
          );
  
          socket.emit("new message", data);
          console.log("d",data);
          setMessages([...messages, data]);
        } catch (err) {
          alert("Some error sending the message!! Please try again!");
          console.log("Error", err);
        }
      }
    };


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", JSON.parse(user.user));
    socket.on('connected', () => setSocketConnected(true));
   }, []);



  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessages(e.target.value);

    //typing indicator logic
  };


   useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log(newMessageReceived.chat._id);
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
            //display notification
          }
          
          else{
          console.log("notify");
            setMessages([...messages, newMessageReceived]);
        }
    });
   });

   

  return (
    <>
      {selectedChat ? (
        <>
          <div className = "chat_user">
          <div className= "imageHolder">
          <Image
            style={{ height: "2.5rem", width: "2.5rem" }}
            // src= "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            src = {getSender(JSON.parse(user.user).name,selectedChat.users).image}
            src = 
            {
              selectedChat ? 
              getSender(JSON.parse(user.user).name,selectedChat.users).image ===
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                ? getSender(JSON.parse(user.user).name,selectedChat.users).image
                : `http://localhost:5001/uploads/${getSender(JSON.parse(user.user).name,selectedChat.users).image}`

                :  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

            }
            roundedCircle
          />
        </div>            
        <div className = "username">
            {selectedChat ? (
              <>{getSender(JSON.parse(user.user).name,selectedChat.users).name}</>
            ) : (
              "Select a chat"
            )}
            </div>
          </div>
          <div>
            {/* {" "} */}
            {loading ? (
              <Spinner
                className="mx-auto mb-9
"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="messages">
                {/* {" "} */}
                <ScrollableChat messages={messages} />
                {/* {" "} */}
              </div>
            )}
            <Form.Control
              type="text"
              placeholder="Enter a Message!"
              onKeyDown={sendMessage}
              onChange={typingHandler}
              value={newMessages}
              isRequired
              className="mt-10"
            />
          </div>
        </>
      ) : (
        <div style ={{display : "flex", padding : "2rem", justifyContent: "center", alignItems: "center"}}>Welcome Themesian....Select an User to Start Chatting!!</div>
      )}
    </>
  );
};

export default SingleChat;
