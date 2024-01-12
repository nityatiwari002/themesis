import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function ChatIcon() {
    const navigate = useNavigate();
    const navigateToChat = () => {
        navigate("/chat-bot");
    };
	return (
		<div className="chat-bot-icon-container" onClick={navigateToChat}>
			<FontAwesomeIcon icon={faBars} className="chat-icon" onClick={navigateToChat} />
		</div>
	);
}

export default ChatIcon;
