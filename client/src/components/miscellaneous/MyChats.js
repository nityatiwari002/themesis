import React from "react";
import { useState } from "react";
import { AuthData } from "../../services/AuthService";
import getCookies from "../../hooks/getCookies";
import axios from "axios";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ChatLoading from "./ChatLoading";
import Stack from "react-bootstrap/Stack";
import { getSender } from "../../services/ChatLogics";
import GroupChatModel from "./GroupChatModel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserStackItem from "../userAvator/UserStackItem";
import "../../styles/Mychats.css";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = AuthData();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${getCookies("jwt")}`,
        },
      };

      const { data } = await axios.get(
        "http://127.0.0.1:5001/api/v1/chats",
        config
      );
      setChats(data);
      console.log(chats);
    } catch (err) {
      alert("Error loading chats!!");
      console.log("ERROR", err);
    }
  };

  useEffect(() => {
    setLoggedUser(user.user);
    fetchChats();
    setSelectedChat(false);
  }, [fetchAgain]);

  return (
    <div
      className="mainMyChats"
      style={{
        backgroundColor: "black",
        borderRadius: "1rem",
        overflowX: "hidden",
      }}
    >
      <Container className="p-3 mb-2 text-white">
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.8rem",
            paddingTop: "0.5rem",
          }}
        >
          <Col style={{}}>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  id="iconified"
                  className="fontAwesome"
                  placeholder="&#xF002; search chats"
                  style={{ fontFamily: "Arial, FontAwesome" }}
                  autoFocus
                  // onChange = {}
                />
              </Form.Group>
            </Form>{" "}
          </Col>

          <Col
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#c29879" }}
          >
            Chats
          </Col>
          {/* <Col> */}
          {/* <GroupChatModel>
        <Button variant="info"> + Create Group Chat</Button>
        </GroupChatModel> */}
          {/* </Col> */}
        </Row>
        <Row>
          <Col>
            {chats.length > 0 ? (
              <Stack direction="vertical" gap={3}>
                {chats.map((chat) =>
                  !chat.isGroupChat ? (
                    <UserStackItem
                      key={chat._id}
                      setSelectedChat={setSelectedChat}
                      chat={chat}
                      selectedChat={selectedChat}
                    />
                  ) : (
                    <> </>
                  )
                  // <div
                  //   className="p-2"
                  // onClick={() => setSelectedChat(chat)}
                  //   key={chat._id}
                  // >
                  //   {!chat.isGroupChat ? chat.users[1].name : chat.chatName}
                  // </div>
                )}
              </Stack>
            ) : (
              // <ChatLoading />
              <div style ={{backgroundColor : "rgba(63, 61, 61, 0.8)", padding: "1rem", display : "flex", justifyContent: "center", alignContent: "center", borderRadius : "1rem"}}>Oops!! No conversations to show..Do send connection requests to lawyers to start chatting.</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyChats;
