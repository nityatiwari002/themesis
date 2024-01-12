import { useEffect, useState } from "react";
import { AuthData } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const { user } = AuthData();
	const navigate = useNavigate();
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [timer, setTimer] = useState(5);
	useEffect(() => {
		const timer = setInterval(() => {
			setTimer((timer) => timer - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	useEffect(() => {
		setTimeout(function () {
			if (user.isAuthenticated) {
				navigate("/dashboard");
			} else {
				navigate("/home");
			}
		}, 5000);
	}, [user, navigate]);
	return (
		<div className="not-found-container">
			<h1 className="not-found-title">404</h1>
			<h2 className="not-found-subtitle">Page Not Found</h2>
			<p className="not-found-text">
				Redirecting you to the home page in {timer} seconds...
			</p>
		</div>
	);
}

export default NotFound;
