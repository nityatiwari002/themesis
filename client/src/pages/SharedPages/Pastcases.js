import React, { useState, useEffect } from "react";
import "../../styles/pastcases.css";
import sample from "../../assets/pastcase.json";
import Navbar from "../../components/Navbar";
// const sample = require("../../assets/pastcase.json");

function FilterBar() {
	const [year, setYear] = useState("");
	const [caseTypes, setCaseTypes] = useState({
		criminal: false,
		civil: false,
		whiteCollar: false,
		Homicide: false,
		Assault: false,
		Robbery: false,
		Burglary: false,
		Larceny: false,
	});
	const [cases, setCases] = useState([]);

	const [courts, setCourts] = useState({
		supreme: false,
		high: false,
		district: false,
	});
	const [article, setArticle] = useState("");

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const handleCaseTypeChange = (event) => {
		setCaseTypes({
			...caseTypes,
			[event.target.name]: event.target.checked,
		});
	};

	const handleCourtChange = (event) => {
		setCourts({
			...courts,
			[event.target.name]: event.target.checked,
		});
	};

	const handleArticleChange = (event) => {
		setArticle(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const filteredCases = sample.filter((caseData) => {
			const yearMatch = year ? caseData.year.toString() === year : false;
			const caseTypeMatch = Object.keys(caseTypes).some(
				(type) =>
					caseTypes[type] &&
					caseData.case_type
						.toLowerCase()
						.includes(type.toLowerCase())
			);
			const courtMatch = Object.keys(courts).some(
				(court) =>
					courts[court] &&
					caseData.court.toLowerCase().includes(court.toLowerCase())
			);
			const articleMatch = article
				? caseData.article_number
						.toLowerCase()
						.includes(article.toLowerCase())
				: false;
			return yearMatch || caseTypeMatch || courtMatch || articleMatch;
		});

		setCases(filteredCases.length > 0 ? filteredCases : []);
	};

	// const handleSubmit = async (e) => {
	//   // e.preventDefault();
	//   const filteredCases = await filteredCases(year, caseTypes, courts, article);
	//   setCases(filteredCases);
	// };

	useEffect(() => {
		setCases(JSON.parse(JSON.stringify(sample)));
	}, []);
	// useEffect(() => {

	//   handleSubmit();
	// }, [year, caseTypes, courts, article]);

	return (
		<>
			<Navbar />
			<div
				className="container"
				style={{
					// backgroundColor: "pink",
					// overflow: "scroll",
					height: "100%",
					width: "100%",
				}}
			>
				<div className="filter-bar ">
					<div>
						<div className="filter-group">
							<label htmlFor="year">
								<h4>Year:</h4>
							</label>
							<br />
							<select
								id="year"
								value={year}
								onChange={handleYearChange}
							>
								<option value="">Select Year</option>
								<option value="2023">2023</option>
								<option value="2022">2022</option>
								<option value="2021">2021</option>
								<option value="2020">2020</option>
								<option value="2019">2019</option>
								<option value="2018">2018</option>min-height:
								300px; /* Adjust as needed */
								<option value="2017">2017</option>
								<option value="2016">2016</option>
								<option value="2015">2015</option>
							</select>
						</div>
						<div className="filter-group">
							<h4>Case Type:</h4>
							<label>
								<input
									type="checkbox"
									name="criminal"
									checked={caseTypes.criminal}
									onChange={handleCaseTypeChange}
								/>
								Criminal Cases
							</label>
							<label>
								<input
									type="checkbox"
									name="civil"
									checked={caseTypes.civil}
									onChange={handleCaseTypeChange}
								/>
								Civil Cases
							</label>
							<label>
								<input
									type="checkbox"
									name="whiteCollar"
									checked={caseTypes.whiteCollar}
									onChange={handleCaseTypeChange}
								/>
								White Collar Cases
							</label>
							<label>
								<input
									type="checkbox"
									name="Homicide"
									checked={caseTypes.Homicide}
									onChange={handleCaseTypeChange}
								/>
								Homicide cases
							</label>
							<label>
								<input
									type="checkbox"
									name="Assault"
									checked={caseTypes.Assault}
									onChange={handleCaseTypeChange}
								/>
								Assault
							</label>
							<label>
								<input
									type="checkbox"
									name="Robbery"
									checked={caseTypes.Robbery}
									onChange={handleCaseTypeChange}
								/>
								Robbery
							</label>
							<label>
								<input
									type="checkbox"
									name="Burglary"
									checked={caseTypes.Burglary}
									onChange={handleCaseTypeChange}
								/>
								Burglary
							</label>
							<label>
								<input
									type="checkbox"
									name="Larency"
									checked={caseTypes.Larecny}
									onChange={handleCaseTypeChange}
								/>
								Larceny
							</label>
						</div>
						<div className="filter-group">
							<h4>Court:</h4>
							<label>
								<input
									type="checkbox"
									name="supreme"
									checked={courts.supreme}
									onChange={handleCourtChange}
								/>
								Supreme Court
							</label>
							<label>
								<input
									type="checkbox"
									name="high"
									checked={courts.high}
									onChange={handleCourtChange}
								/>
								High Court
							</label>
							<label>
								<input
									type="checkbox"
									name="district"
									checked={courts.district}
									onChange={handleCourtChange}
								/>
								District Court
							</label>
						</div>
						<div className="filter-group" id="articlee">
							<label htmlFor="article">
								<h4>Article No. :</h4>
							</label>
							<input
								type="text"
								id="article"
								value={article}
								onChange={handleArticleChange}
								style={{
									width: "150px",
									height: "20px",
									color: "white",
								}}
							/>
						</div>
						<button
							className="submit-button"
							onClick={(e) => handleSubmit(e)}
						>
							Apply Filters
						</button>
					</div>
				</div>
				<br />
				<div
					style={{
						height: "100%",
					}}
				>
					<div className="search-bar">
						<input
							type="text"
							placeholder="Search for related past cases"
							style={{
								width: "450px",
								height: "20px",
								color: "white",
							}}
						/>
						<button type="button">
							<i className="fas fa-search"></i>
						</button>
						<br />
					</div>
					<div
						className="filtered-cases"
						style={{
							position: "relative",
							height: "90%",
							// backgroundColor: "pink",
							overflow: "scroll",
						}}
					>
						{cases.map((item, index) => (
							<div key={index} className="case-details">
								<div className="pastt">
									<h3>{item.case_title}</h3>
									<p>
										<strong>Advocate Name:</strong>{" "}
										{item.advocate_name}
									</p>
									<p>
										<strong>Party A Name:</strong>{" "}
										{item.party_a_name}
									</p>
									<p>
										<strong>Party B Name:</strong>{" "}
										{item.party_b_name}
									</p>
									<p>
										<strong>Article Number:</strong>{" "}
										{item.article_number}
									</p>
									<p>
										<strong>Article Name:</strong>{" "}
										{item.article_name}
									</p>
									<p>
										<strong>Case Type:</strong>{" "}
										{item.case_type}
									</p>
									<p>
										<strong>Court:</strong> {item.court}
									</p>
									<p>
										<strong>Year:</strong> {item.year}
									</p>
									<p>
										<strong>Judgement:</strong>{" "}
										{item.judgement}
									</p>
								</div>{" "}
							</div>
						))}
						;
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
}
export default FilterBar;
