import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import botChats from "../utilities/BotChats";

function ChatBot() {
	const dummy = useRef(null);
	
	const [message, setMessage] = useState("");
	const [pickerVisible, setPickerVisible] = useState(false);
    useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [botChats, message]);

	function submitForm() {
		console.log("submit");
		console.log(message);
		botChats.user.messages.push(message);
		console.log(botChats.user.messages);
		setMessage("");
	}
	function press(event) {
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			submitForm();
		}
	}

	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setMessage(message + emoji);
	};

	const chat = (entity, index) => {
		return (
			<div className={entity + "-message"}>
				{entity === "user" && (
					<div className="bot-message message-txt">
						<p>{botChats[entity].messages[index]}</p>
					</div>
				)}
				<div className="bot-icon-container">
					<img
						src={botChats[entity].icon}
						alt="bot-icon"
						className="bot-icon"
					/>
				</div>
				{entity === "bot" && (
					<div className="bot-message message-txt--">
						<p>{botChats[entity].messages[index]}</p>
					</div>
				)}
			</div>
		);
	};

	const chats = () => {
		var html = [];
		for (let i = 0; i < botChats.user.messages.length; i++) {
			html.push(chat("user", i));
			html.push(chat("bot", i));
			html.push(<br />);
			// html.push(<hr/>);
		}
		return html;
	};

	return (
		<div>
			{pickerVisible && (
				<div className="emoji-picker-dialog">
					<Picker data={data} onEmojiSelect={addEmoji} />
				</div>
			)}
			<div className="bot-container">
				<div className="bot-message-container">
					{chats()}
					<div ref={dummy} />
				</div>
			</div>
			<div className="chat-text-box">
				<div className="emoji-icon">
					<FontAwesomeIcon
						icon={faSmile}
						className="emoji-icon-icon"
						onClick={() => setPickerVisible(!pickerVisible)}
					/>
				</div>
				<div className="chat-text-box-input-container">
					<div className="chat-input-box">
						<textarea
							id="chat-input-text"
							className="chat-input"
							rows="2"
							placeholder="Type here"
							onKeyDown={(e) => press(e)}
							onChange={(e) => setMessage(e.target.value)}
							value={message}
						></textarea>
					</div>
				</div>
				<div className="emoji-icon" onClick={() => submitForm()}>
					<FontAwesomeIcon icon={faArrowRight} />
				</div>
			</div>
		</div>
	);
}

export default ChatBot;
