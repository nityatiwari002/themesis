import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
	faCaretDown,
	faFilter,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/FindLawyer.css";
// import lawyers from "../utilities/LawyerDetails";
import { AuthData } from "../services/AuthService";
function FindLawyer() {
	const [lawyers, setLawyers] = useState([]);
	const [numLawyers, setNumLawyers] = useState(0);
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

	const sendChatRequest = async (index) => {
		const lawyer = lawyers[index];
		console.log(user._id, lawyer._id);
		let requestData = {
			userId: user._id,
			lawyerId: lawyer._id,
			requestType: "Chat",
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
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log("Chat request sent:", data);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	const sendHireRequest = (lawyer) => {
		// console.log("Hire request sent to " + lawyer.name);
	};
	return (
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
						className={formVisible ? "filter-form" : "hide-element"}
					></div>
				</div>
			</div>

			<div className="search-results">
				{numLawyers === 0 ? (
					<h1>No lawyers found</h1>
				) : (
					lawyers.map((lawyer, index) => {
						return (
							<div className="lawyer-card" key={index}>
								<div className="lawyer-img">
									<img
										src={lawyer.img}
										className="lawyer-image"
									></img>
								</div>
								<div className="lawyer-info">
									<div className="lawyer-details-wrapper">
										<div className="lawyer-details">
											<div className="lawyer-det">
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
												{lawyer.description}
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
												{lawyer.city}, {lawyer.state},{" "}
												{lawyer.country}
											</div>
										</div>
									</div>
									<div className="lawyer-buttons">
										<button
											className="btn btn-primary"
											onClick={() =>
												sendChatRequest(index)
											}
										>
											Chat
										</button>
										<button
											className="btn btn-primary"
											onClick={() =>
												sendHireRequest(index)
											}
										>
											Book
										</button>
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
	);
}

export default FindLawyer;
