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

function ChatPage() {
	const { user } = AuthData();
	const [fetchAgain, setFetchAgain] = useState();

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(255, 255, 255, 0.3)",
				padding: "2rem",
			}}
		>
			<Container style={{ width: "100%", height: "100%" }}>
				<Row>
					<Col
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "rgba(255, 255, 255, 0.3)",
						}}
					>
						{" "}
						<Row>{user.isAuthenticated && <SideDrawer />}</Row>
						<Row>
							{user.isAuthenticated && (
								<MyChats fetchAgain={fetchAgain} />
							)}
						</Row>
					</Col>
					<Col style={{ width: "100%", height: "100%" }}>
						{" "}
						{user.isAuthenticated && (
							<ChatBox
								fetchAgain={fetchAgain}
								setFetchAgain={setFetchAgain}
							/>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default ChatPage;
