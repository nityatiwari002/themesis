import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
	faCaretDown,
	faFilter,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/FindLawyer.css";
import { AuthData } from "../services/AuthService";
import Navbar from "../components/Navbar";
// import requests from "../assets/requests";
function FindLawyer() {
	const [lawyers, setLawyers] = useState([]);
	const [numLawyers, setNumLawyers] = useState(-1);
	useEffect(() => {
		const fetchLawyers = async () => {
			const response = await fetch(
				"http://127.0.0.1:5001/api/v1/users/getLawyers",
				{
					method: "get",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setLawyers(data);
					setNumLawyers(data.length);
				});
		};
		fetchLawyers();
	}, []);

	const { user } = AuthData();
	const [searchInput, setSearchInput] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const handleSearch = (e) => {
		setSearchInput(e.target.value);
	};

	const submitForm = () => {
		console.log(searchInput);
		//handle search
		setSearchInput("");
	};

	const [requests, setRequests] = useState([]);

	const getAllRequests = async () => {
		console.log(user.user);
		console.log("calling", JSON.parse(user.user)._id);
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/userRequests/" +
				JSON.parse(user.user)._id,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log("response", response);
		if (response.ok) {
			const data = await response.json();
			console.log("Requests:", data);
			setRequests(data);
		}
	};

	useEffect(() => {
		getAllRequests();
	}, []);

	const sendRequest = async (index, type) => {
		const lawyer = lawyers[index];
		console.log("ids", JSON.parse(user.user)._id, lawyer._id);
		let requestData = {
			userId: JSON.parse(user.user)._id,
			lawyerId: lawyer._id,
			requestType: type,
		};
		try {
			const response = await fetch(
				"http://127.0.0.1:5001/api/v1/requests/createRequest",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestData),
				}
			);
			if (!response.ok) {
				console.log(response.message);
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("Request sent:", data);
		} catch (error) {
			console.error("Error:", error);
		}
		getAllRequests();
	};

	const sendChatRequest = async (index) => {
		sendRequest(index, "Chat");
	};
	const sendHireRequest = async (index) => {
		sendRequest(index, "Hire");
	};

	const handleDeleteRequest = async (index, type) => {
		const lawyer = lawyers[index];
		const request = requests.filter(
			(request) =>
				request.user_id === JSON.parse(user.user)._id &&
				request.lawyer_id === lawyer._id &&
				request.request_type === type &&
				request.pending === true
		)[0];
		try {
			const response = await fetch(
				`http://127.0.0.1:5001/api/v1/requests/deleteRequest/${request._id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			console.log("Request deleted:", request._id);
		} catch (error) {
			console.error("Error:", error);
		}
		getAllRequests();
	};
	const deleteChatRequest = async (index) => {
		handleDeleteRequest(index, "Chat");
	};
	const deleteHireRequest = async (index) => {
		handleDeleteRequest(index, "Hire");
	};
	return (
		<>
			<Navbar />
			<div className="find-lawyer-body">
				<div className="search-section">
					{/* <div className="filter-text"></div> */}
					<div className="filter">
						<FontAwesomeIcon
							icon={faFilter}
							className="filter-icon"
							onClick={() => setFormVisible(!formVisible)}
						/>
						<div
							className={
								formVisible ? "filter-form" : "hide-element"
							}
						></div>
					</div>
				</div>

				<div className="search-results">
					{numLawyers === -1 && (
						<div className="Loading-container">Loading...</div>
					)}
					{numLawyers === 0 ? (
						<h1>No lawyers found</h1>
					) : (
						lawyers.map((lawyer, index) => {
							return (
								<div className="lawyer-card" key={index}>
									<div className="lawyer-img-container">
										<img
											src={lawyer.image}
											className="lawyer-image"
										></img>
									</div>
									<div className="lawyer-info">
										<div className="lawyer-details-wrapper">
											<div className="lawyer-details">
												<div className="lawyer-det">
													<span className="det">
														{" "}
														Name:{" "}
													</span>
													{lawyer.name}
												</div>
												<div className="lawyer-det">
													<span className="det">
														{" "}
														Type:{" "}
													</span>
													{lawyer.tag}
												</div>
												<div className="lawyer-det">
													<span className="det">
														Number of cases won:{" "}
													</span>
													{lawyer.countWonCases}
												</div>
												<div className="lawyer-det">
													<span className="det">
														About:{" "}
													</span>
													{lawyer.description}
													Lorem ipsum dolor sit amet.
													Id perspiciatis repellat et
													amet magnam qui libero
													voluptatem ut provident illo
													et reiciendis ratione aut
													ipsam necessitatibus est
													odio autem! Est aspernatur
													galisum et nisi dolorum cum
													tempore deleniti.
												</div>
											</div>
											<div className="lawyer-details">
												<div className="lawyer-det">
													<span className="det">
														Age:{" "}
													</span>
													{lawyer.age}
												</div>
												<div className="lawyer-det">
													<span className="det">
														No. of cases:{" "}
													</span>
													{lawyer.countPastCases}
												</div>
												<div className="lawyer-det">
													<span className="det">
														Experience:{" "}
													</span>
													{lawyer.experience}
												</div>
												<div className="lawyer-det">
													{lawyer.city}
													{lawyer.city ? ", " : " "}
													{lawyer.state}
													{lawyer.state ? "," : " "}
													{lawyer.country}
												</div>
											</div>
										</div>
										<div className="lawyer-buttons">
											{requests &&
											requests.filter(
												(request) =>
													request.lawyer_id ===
														lawyer._id &&
													request.request_type ===
														"Chat" &&
													request.pending === true
											).length > 0 ? (
												<button
													className="btn-cancel"
													onClick={() =>
														deleteChatRequest(index)
													}
												>
													Cancel Chat Request
												</button>
											) : (
												<button
													className="btn-apply"
													onClick={() =>
														sendChatRequest(index)
													}
												>
													Send Chat Request
												</button>
											)}

											{requests &&
											requests.filter(
												(request) =>
													request.lawyer_id ===
														lawyer._id &&
													request.request_type ===
														"Hire" &&
													request.pending === true
											).length > 0 ? (
												<button
													className="btn-cancel"
													onClick={() =>
														deleteHireRequest(index)
													}
												>
													Cancel Hire Request
												</button>
											) : (
												<button
													className="btn-apply"
													onClick={() =>
														sendHireRequest(index)
													}
												>
													Send Hire Request
												</button>
											)}
										</div>
									</div>
									{lawyer.takesProBono && (
										<div className="free-tag">Pro Bono</div>
									)}
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
}

export default FindLawyer;
