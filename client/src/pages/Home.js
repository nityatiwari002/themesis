import React from "react";
import "../styles/Home.css";
import description from "../assets/desc";

function Home() {
	return (
		<div className="home-card">
			<div className="home-title-wrapper">
				<div className="home-title-subwrapper">
					<div className="home-tile">
						<span className="initial styled-text home-txt">T</span>
						<span className="home-txt2">hemesis</span>
					</div>
					<div className="home-tile">
						<span className="initial styled-text home-txt">G</span>
						<span className="home-txt2">uardian</span>
					</div>
				</div>
			</div>
			<div className="home-cards-wrapper">
				{description.map((desc, index) => {
					console.log(desc);
					return (
						<div className="home--card" key={index}>
							{index % 2 !== 0 && (
								<div className="home-card-img">hello</div>
							)}
							<div className="home-card-txt">
								<div className="home-card-title">
									{desc.title}
								</div>
								<div className="home-card-content">
									{desc.content}
								</div>
							</div>
							{index % 2 === 0 && (
								<div className="home-card-img">
									<img
										src={desc.img ? desc.img : ""}
										alt="home-card-img"
										className="home-card-img--"
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Home;
