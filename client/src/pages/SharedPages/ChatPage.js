import React from "react";
import { AuthData } from "../../services/AuthService";
import bootstrap from "bootstrap";
import SideDrawer from "../../components/miscellaneous/SideDrawer";
import MyChats from "../../components/miscellaneous/MyChats";
import ChatBox from "../../components/miscellaneous/ChatBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileNavbar from "../../components/ProfileNavbar";

function ChatPage() {
  const { user } = AuthData();
  const [fetchAgain, setFetchAgain] = useState();

  return (
	<>
	<Navbar/>
	{/* <ProfileNavbar/> */}
    <div
      style={{
        width: "100%",
        height: "100%",
		backgroundColor : "rgb(63, 61, 61, 0.8)",
        // backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: "1.5rem",
		// paddingTop : "0px",
      }}
    >
      <Container style={{ width: "100%", height: "100%" }}>
        <Row style ={{display : "flex" }} >
          <Col
            style={{
              width: "100%",
              height: "100vh",
			//   backgroundColor:"red",
			  flex : 2,
			//   borderRadius:"2rem"
            }}
          >
            {" "}
              {user.isAuthenticated && <MyChats fetchAgain={fetchAgain} />}
          </Col>
          <Col style={{ width: "100%", height: "100vh", flex : 5, backgroundColor:"black" }}>
            {" "}
            {user.isAuthenticated && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
	</>
  );
}

export default ChatPage;
