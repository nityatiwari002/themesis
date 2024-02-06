import React, { useState, useEffect, useRef } from "react";
import "../../styles/ChatBot.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import botChats from "../../utilities/BotChats";
import MarkdownIt from "markdown-it";
import Navbar from "../../components/Navbar";
// import Markdown from "markdown-to-jsx";
import Markdown from "react-markdown";
const md = new MarkdownIt();
function ChatBot() {
	const dummy = useRef(null);
	const [message, setMessage] = useState("");
	const [isInputDisabled, setIsInputDisabled] = useState(false);
	const [pickerVisible, setPickerVisible] = useState(false);
	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [botChats, message]);

	async function submitForm() {
		botChats.user.messages.push(message);
		setIsInputDisabled(true);

		setMessage("...");

		let userMessage = {
			userInput: message,
		};

		const response = await fetch("http://localhost:5500/user-input", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userMessage),
		})
			.then((response) => response.json())
			.then((data) => {
				const formattedResponse = md.render(data.response);
				console.log("response" + data.response);
				console.log("formattedResponse" + formattedResponse);
				botChats.bot.messages.push(data.response);
				// botChats.bot.messages.push(data.response);
			});

		setMessage("");
		setIsInputDisabled(false);
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

	const renderContent = (index) => {
		const content = botChats.bot.messages[index];
		return content;
	};
	const chat = (entity, index) => {
		return (
			<div>
				<div className={entity + "-message---"}>
					{entity === "user" && (
						<div className="bot-message message-txt">
							<p>{botChats[entity].messages[index]}</p>
						</div>
					)}
					<div className="bot-icon-container">
						<img
							src={botChats[entity].icon}
							alt="bot-icon"
							className="bot-icon--"
						/>
					</div>
					{entity === "bot" && (
						<div className="bot-message message-txt--">
							<Markdown>
								{botChats[entity].messages[index]}
							</Markdown>
						</div>
					)}
				</div>
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

	const [landing, setLanding] = useState(true);

	return (
		<div className="chat-bot-wrapper">
			<Navbar />
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
							disabled={isInputDisabled}
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
