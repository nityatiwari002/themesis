import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
	console.log(props.routing);
	const [visible, setVisible] = useState(false);
	const toggleMenu = () => {
		setVisible(!visible);
	};
	console.log(props.loggedin);
	const [loggedin, setLoggedin] = useState(props.loggedin);
	useEffect(() => {
		setLoggedin(props.loggedin);
	}, [props.loggedin]);
	const routings = props.routing;
	useEffect(() => {
		console.log(routings);
	}, [routings]);
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
					{routings.map((route, index) => {
						return (
							<li key={index}>
								<Link to={route.path} className="menu-links">
									{route.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			{loggedin && <div className="title">Themesis Guardian</div>}
			{!loggedin && (
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
