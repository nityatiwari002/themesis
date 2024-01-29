import React from 'react';
import { AuthData } from './../services/AuthService';
import bootstrap from 'bootstrap';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/miscellaneous/MyChats';
import ChatBox from '../components/miscellaneous/ChatBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';




function ChatPage() {
  const { user } = AuthData();
  const [fetchAgain, setFetchAgain] = useState();


  return (
    <div style = {{width: "100%"}}>
      <Container>
      <Row>
        <Col>{user.isAuthenticated && <SideDrawer/>}
</Col>
      </Row>
      <Row>
        <Col> {user.isAuthenticated && <MyChats fetchAgain = {fetchAgain}/>}</Col>
        <Col> {user.isAuthenticated && <ChatBox fetchAgain = {fetchAgain} setFetchAgain={setFetchAgain}/>}</Col>
      </Row>
    </Container>
    </div>
  )
}

export default ChatPage
