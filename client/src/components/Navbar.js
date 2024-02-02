
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { AuthData } from "../services/AuthService";
import routes from "../routes/Routes";
import "../styles/Sidebar.css";
function Navbar() {
	const [profileSec, setProfileSec] = useState(false);
	const handleProfile = () => {
		if (profileSec == false) {
			setProfileSec(true);
		} else {
			setProfileSec(false);
		}

		if (setProfileSec == true) {
			return <div className="profile_div"></div>;
		}
	};
	const { showSidebar, toggleSidebar } = AuthData();
	const { user } = AuthData();
	console.log(showSidebar);
    

	return (
		<div className="Navbar">
			<div className={showSidebar ? "top-nav" : "top-nav"}>
				<div className="title">
					<span
						className={
							showSidebar ? `hide-element` : `menu-toggle-icon`
						}
						onClick={toggleSidebar}
					>
						<FontAwesomeIcon icon={faBars} />
					</span>
					<span
						className={
							showSidebar ? `menu-toggle-icon` : `hide-element`
						}
						onClick={toggleSidebar}
					>
						<FontAwesomeIcon icon={faX} />
					</span>
					<span className="initial login-txt">T</span>
					<span className="login-txt">hemesis </span>
					<span className="initial login-txt">G</span>
					<span className="login-txt">uardian</span>
				</div>
				{user.isAuthenticated && (
					<div className="nav-but">
						<button className="nav-btn">
							<Link to="/logout" className="nav-link links">
								Logout
							</Link>
						</button>
					</div>
				)}
				{!user.isAuthenticated && (
					<div className="nav-but">
						<button className="nav-btn">
							<Link to="/login" className="nav-link links">
								Login
							</Link>
						</button>
						<button className="nav-btn">
							<Link to="/sign-up" className="nav-link links">
								Sign Up
							</Link>
						</button>
					</div>
				)}
			</div>
			{/* <div className="menu-wrapper">
				<ul>
					{routes.map((route, index) => {
						if (
							!user.isAuthenticated &&
							!route.isPrivate &&
							route.isMenuUser
						) {
							return (
								<li key={index}>
									<NavLink
										to={route.path}
										className={({ isActive }) => {
											return isActive
												? "menu-links active"
												: "menu-links inactive";
										}}
									>
										{route.name}
									</NavLink>
								</li>
							);
						} else if (user.isAuthenticated) {
							if (user.role == "user") {
								if (
									user.isAuthenticated &&
									route.isPrivate &&
									route.isMenuUser
								) {
									return (
										<li key={index}>
											<NavLink
												to={route.path}
												className={({ isActive }) => {
													return isActive
														? "menu-links active"
														: "menu-links inactive";
												}}
											>
												{route.name}
											</NavLink>
										</li>
									);
								}
							}

							if (user.role == "lawyer") {
								if (
									user.isAuthenticated &&
									route.isPrivate &&
									route.isMenuLawyer
								) {
									return (
										<li key={index}>
											<NavLink
												to={route.path}
												className={({ isActive }) => {
													return isActive
														? "menu-links active"
														: "menu-links inactive";
												}}
											>
												{route.name}
											</NavLink>
										</li>
									);
								}
							}
						} else return false;
					})}
				</ul>
			</div>
			{user.isAuthenticated ? (
				<>
					<div className="title">
						<span className="initial login-txt">T</span>
						<span className="login-txt">hemesis </span>
						<span className="initial login-txt">G</span>
						<span className="login-txt">uardian</span>
					</div>
					<div className="nav-but">
						<button className="nav-btn">
							<Link to="/logout" className="nav-link links">
								Logout
							</Link>
						</button>
					</div>
				</>
			) : (
				<div className="nav-but">
					<button className="nav-btn">
						<Link to="/login" className="nav-link links">
							Login
						</Link>
					</button>
					<button className="nav-btn">
						<Link to="/sign-up" className="nav-link links">
							Sign Up
						</Link>
					</button>
				</div>
			)}*/}
		</div>
	);
}

export default Navbar;
