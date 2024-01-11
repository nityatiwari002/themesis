import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { AuthData } from "../services/AuthService";
import routes from "../routes/Routes";
function Navbar() {
	const [visible, setVisible] = useState(false);
	const toggleMenu = () => {
		setVisible(!visible);
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
							route.isMenu
						) {
							return (
								<li key={index}>
									<Link
										to={route.path}
										className="menu-links"
										onClick={toggleMenu}
									>
										{route.name}
									</Link>
								</li>
							);
						} else if (
							user.isAuthenticated &&
							route.isPrivate &&
							route.isMenu
						) {
							return (
								<li key={index}>
									<Link
										to={route.path}
										className="menu-links"
										onClick={toggleMenu}
									>
										{route.name}
									</Link>
								</li>
							);
						} else return false;
					})}
				</ul>
			</div>
			{user.isAuthenticated ? (
				<>
					<div className="title">Themesis Guardian</div>
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
			)}
		</div>
	);
}

export default Navbar;
