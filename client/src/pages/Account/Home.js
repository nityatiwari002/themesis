import React from "react";
import "../../styles/Home.css";
import description from "../../assets/desc";
import Navbar from "../../components/Navbar";
import { AuthData } from "../../services/AuthService";

function Home() {
	const { user } = AuthData();

	return (
		<>
			{!user.isAuthenticated && <Navbar />}

			<div className="home-card">
				<div className="home-cards-wrapper">
					{description.map((desc, index) => {
						// console.log(desc);
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
		</>
	);
}

export default Home;
