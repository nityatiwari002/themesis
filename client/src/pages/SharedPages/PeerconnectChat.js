import React, { useState, useEffect, useRef } from "react";
import "../../styles/ChatBot.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import usersChats from "../../utilities/GroupChats";
import { AuthData } from "../../services/AuthService";
import Navbar from "../../components/Navbar";
import getCookies from "../../hooks/getCookies";
import { getUser } from "../../utilities/getUser";

function PeerconnectChat() {
	const dummy = useRef(null);
	const { user } = AuthData();
	const [message, setMessage] = useState("");
	const [pickerVisible, setPickerVisible] = useState(false);
	const [usersChats, setUsersChats] = useState([]);
	useEffect(() => {
		dummy.current.scrollIntoView();
	}, [usersChats, message]);
	const getMsgs = async () => {
		fetch("http://localhost:5001/api/v1/discord/getMessages", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookies("jwt")}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setUsersChats(data);
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});
	};
	useEffect(() => {
		getMsgs();
	}, []);

	const submitForm = async () => {
		await fetch("http://localhost:5001/api/v1/discord/sendMessage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookies("jwt")}`,
			},
			body: JSON.stringify({
				message: message,
				userId: JSON.parse(user.user)._id,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				getMsgs();
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});

		setMessage("");
	};

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

	const getInfo = async (index) => {
		const user = await getUser(usersChats[index].sender);
		const usname = user.name;
		const img = user.pic;
		const time = usersChats[index].createdAt;
		return { usname, img, time };
	};

	const chat = (index) => {
		// const { usname, img, time } = getInfo(index);
		// const usname = "User";
		// const img = "https://via.placeholder.com/150";
		// const time = "time";
        console.log(usersChats[index]);
		return (
			<div className={"bot-message---"}>
				<div className="bot-icon-container">
					<img
						src={"https://via.placeholder.com/150"}
						alt="bot-icon"
						className="bot-icon--"
					/>
				</div>

				<div className="bot-message message-txt--">
					<div className="message-details">
						<div className="message-details-name">{usersChats[index].sender.name}</div>
						<div className="message-details-time">{usersChats[index].createdAt}</div>
					</div>
					<p className="msg">{usersChats[index].content}</p>
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

export default PeerconnectChat;
