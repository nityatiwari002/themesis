import React from "react";
import { AuthData } from "../../services/AuthService";
import bootstrap from "bootstrap";
import SideDrawer from "../../components/miscellaneous/SideDrawer";
import MyGroupChats from "../../components/miscellaneous/MyGroupChats";
import ChatBox from "../../components/miscellaneous/ChatBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileNavbar from "../../components/ProfileNavbar";

function QuickFixCourt() {
	const { user } = AuthData();
	const [fetchAgain, setFetchAgain] = useState();

	return (
		<div style ={{display : "flex", flexDirection: "column", height : "100%"}}>
		<div style ={{ paddingBottom : "0.5rem", position: "relative"}}>
		<Navbar/>

		</div>
		<div
		  style={{
			  width: "100%",
			  height: "100%",
			  backgroundColor : "rgb(63, 61, 61, 0.8)",
			  flex : "5"
			  // backgroundColor: "rgba(255, 255, 255, 0.5)",
			//   padding: "1.5rem",
			  // paddingTop : "0px",
			}}
			>
		  <Container 
		  style=
		  {{ marginTop : "1.5rem" }}
		  >
			<Row style ={{display : "flex" }} >
			  <Col
				style={{
				  width: "100%",
				//   height: "100vh",
				  flex : 2,
				  borderRadius:"2rem"
				
				}}
			  >
				{" "}
				  {user.isAuthenticated && <MyGroupChats fetchAgain={fetchAgain} />}
			  </Col>
			  <Col style={{ flex : 5, backgroundColor:"black", borderRadius : "1rem" }}>
				{" "}
				{user.isAuthenticated && (
				  <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			  </Col>
			</Row>
		  </Container>
		</div>
		</div>
	
	);
}

export default QuickFixCourt;
