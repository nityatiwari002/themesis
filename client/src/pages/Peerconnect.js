import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import usersChats from "../utilities/GroupChats";
import { AuthData } from "../services/AuthService";

function Peerconnect() {
	const dummy = useRef(null);
	const { user } = AuthData();
	const [message, setMessage] = useState("");
	const [pickerVisible, setPickerVisible] = useState(false);
	useEffect(() => {
		dummy.current.scrollIntoView();
	}, [usersChats, message]);

	function submitForm() {
		console.log("submit");
		console.log(message);
		const newChat = {
			id: usersChats.length + 1,
			name: user.name,
			img: "https://www.w3schools.com/howto/img_avatar.png",
			message: message,
			time: new Date().toLocaleTimeString([], { hour12: true }).toUpperCase(),
		};
		usersChats.push(newChat);
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

	const chat = (index) => {
		return (
			<div className={"bot-message---"}>
				<div className="bot-icon-container">
					<img
						src={usersChats[index].img}
						alt="bot-icon"
						className="bot-icon--"
					/>
				</div>

				<div className="bot-message message-txt--">
					<div className="message-details">
						<div className="message-details-name">
							{usersChats[index].name}
						</div>
						<div className="message-details-time">
							{usersChats[index].time}
						</div>
					</div>
					<p className="msg">{usersChats[index].message}</p>
				</div>
			</div>
		);
	};

	const chats = () => {
		var html = [];
		for (let i = 0; i < usersChats.length; i++) {
			html.push(chat(i));
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

export default Peerconnect;
