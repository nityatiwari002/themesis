import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { AuthData } from "../services/AuthService";
import routes from "../routes/Routes";


function Navbar() {
	const [visible, setVisible] = useState(false);
	const [profileSec, setProfileSec] = useState(false);
	const toggleMenu = () => {
		setVisible(!visible);
	};

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

	const { user } = AuthData();
	return (
		<div className="Navbar">
			<div className="menu-toggler" onClick={toggleMenu}>
				<div className="menu-bars">
					<FontAwesomeIcon
						icon={faX}
						className={visible ? `menu-icon` : `hide-element`}
					/>
					<FontAwesomeIcon
						icon={faBars}
						className={visible ? `hide-element` : `menu-icon`}
					/>
				</div>
			</div>
			<div className={visible ? `menu` : `hide-element`}>
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
										onClick={toggleMenu}
									>
										{/* <div className="activeBlock">
											{route.name}
										</div> */}
										{route.name}
									</NavLink>
								</li>
							);
						} 
						else if(user.isAuthenticated){
							if(user.role == 'user'){
                                if (
									user.isAuthenticated &&
									route.isPrivate &&
									route.isMenuUser
								)   {
									return (
										<li key={index}>
											<NavLink
												to={route.path}
												className={({ isActive }) => {
													return isActive
														? "menu-links active"
														: "menu-links inactive";
												}}
												onClick={toggleMenu}
											>
												{/* <div className="activeBlock">
													{route.name}
												</div> */}
												{route.name}
											</NavLink>
										</li>
									);
								}

							}

							if(user.role == 'lawyer'){
                                if (
									user.isAuthenticated &&
									route.isPrivate &&
									route.isMenuLawyer
								)   {
									return (
										<li key={index}>
											<NavLink
												to={route.path}
												className={({ isActive }) => {
													return isActive
														? "menu-links active"
														: "menu-links inactive";
												}}
												onClick={toggleMenu}
											>
												{/* <div className="activeBlock">
													{route.name}
												</div> */}
												{route.name}
											</NavLink>
										</li>
									);
								}

							}



						}
						 else return false;
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
						<div className="profile_div">
						<Link to = "/me">
						<div className = "profile_picture_holder">
								<img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwaLDKaK49tsHmdMGOrmTdns5qiw080F2Yw&usqp=CAU" alt = "picture" className="profile_picture"/>
							</div>
							</Link> 
						</div> 
					
						{/* <button className="nav-btn">
							<Link to="/logout" className="nav-link links">
								Logout
							</Link>
						</button> */}
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
			)}
		</div>
	);
}

export default Navbar;
