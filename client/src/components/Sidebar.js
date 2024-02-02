import React, { useContext } from "react";
import { AuthData } from "../services/AuthService";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import routes from "../routes/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
	const { showSidebar } = AuthData();
	const { user } = AuthData();
	if (!showSidebar) return null;
	return (
		<div className="side-bar-parent">
			<div className={`side-bar ${showSidebar ? "open" : "close"}`}>
				{showSidebar && (
					<>
						<ul>
							{routes.map((route, index) => {
								if (
									!user.isAuthenticated &&
									!route.isPrivate &&
									!route.isUtility
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
												<button className="side-bar-buttons">
													<span className="side-bar-icon">
														{route.icon}{" "}
													</span>
													{route.name}
												</button>
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
														className={({
															isActive,
														}) => {
															return isActive
																? "menu-links active"
																: "menu-links inactive";
														}}
													>
														<button className="side-bar-buttons">
															<span className="side-bar-icon">
																{route.icon}{" "}
															</span>
															{route.name}
														</button>
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
														className={({
															isActive,
														}) => {
															return isActive
																? "menu-links active"
																: "menu-links inactive";
														}}
													>
														<button className="side-bar-buttons">
															<span className="side-bar-icon">
																{route.icon}{" "}
															</span>
															{route.name}
														</button>
													</NavLink>
												</li>
											);
										}
									}
								} else return false;
							})}
						</ul>
						{user.isAuthenticated && <div className="side-bar-logout">
							<NavLink to="/logout" className="side-bar-logout">
								<button className="side-bar-buttons">
									<span className="side-bar-icon">
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
										/>
									</span>
									Logout
								</button>
							</NavLink>
						</div>}
					</>
				)}
			</div>
		</div>
	);
}

export default Sidebar;
