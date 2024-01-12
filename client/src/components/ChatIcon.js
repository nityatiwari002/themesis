import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ChatIcon() {
	return (
		<div className="chat-bot-icon-container">
			<FontAwesomeIcon icon={faBars} className="chat-icon"/>
		</div>
	);
}

export default ChatIcon;
