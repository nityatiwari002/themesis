import React, { useContext } from "react";
import { AuthData } from "../services/AuthService";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import routes from "../routes/Routes";

function Sidebar() {
	const { showSidebar } = AuthData();
    const { user } = AuthData();
	if (!showSidebar) return null;
	return (
		<div>
			<div className="side-bar">
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
										{/* <button>{route.name}</button> */}
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
		</div>
	);
}

export default Sidebar;
