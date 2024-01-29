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


const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, selectedChat, setSelectedChat } = AuthData();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connection', () => setSocketConnected(true));
   }, []);


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
        console.log(data);
        setMessages([...messages, data]);
      } catch (err) {
        alert("Some error sending the message!! Please try again!");
        console.log("Error", err);
      }
    }
  };

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

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessages(e.target.value);

    //typing indicator logic
  };


   useEffect(() => {
    socket.on("Message Received", (newMessageReceived) => {
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
            //display notification
        }

        else{
            console.log("idhar");
            setMessages([...messages, newMessageReceived]);
        }
    });
   });

  return (
    <>
      {selectedChat ? (
        <>
          <h2>
            {!selectedChat.isGroupChat ? (
              <>{getSender(user.name, selectedChat.users)}</>
            ) : (
              selectedChat.chatName.toUpperCase()
            )}
          </h2>
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
        <div>Click on a User to Start Chatting!</div>
      )}
    </>
  );
};

export default SingleChat;
