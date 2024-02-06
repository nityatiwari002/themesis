import { useEffect, useState } from "react";
import { AuthData } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/Routes";
import getCookies from "../../hooks/getCookies";
import removeCookies from "../../hooks/removeCookies";
import setCookies from "../../hooks/setCookies";

function NotFound() {
	const privateRoutes = [];
	routes.map((route, index) => {
		if (route.isPrivate) {
			privateRoutes.push(route.path);
		}
		return null;
	});

	const [errorMsg, setErrorMsg] = useState("");
	const [redirectMsg, setRedirectMsg] = useState("");
	const { user } = AuthData();
	const navigate = useNavigate();
	const [timer, setTimer] = useState(3);
	useEffect(() => {
		if (
			privateRoutes.includes(window.location.pathname) &&
			!user.isAuthenticated
		) {
			setErrorMsg("You are not authorized to view this page");
			setRedirectMsg(
				`Redirecting you to the login page in ${timer} seconds...`
			);
		} else {
			setErrorMsg("The page you are looking for does not exist");
			setRedirectMsg(
				`Redirecting you to the home page in ${timer} seconds...`
			);
		}
	});
	useEffect(() => {
		const timer = setInterval(() => {
			setTimer((timer) => timer - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		setTimeout(function () {
			// console.log("user", isprotected);
			if (user.isAuthenticated) {
				navigate("/dashboard");
			} else {
				if (privateRoutes.includes(window.location.pathname)) {
					navigate("/login");
				} else navigate("/home");
			}
		}, 3000);
	}, [user, navigate]);

	return (
		<div className="not-found-container">
			<h2 className="not-found-subtitle">{errorMsg}</h2>
			<p className="not-found-text">{redirectMsg}</p>
		</div>
	);
}

export default NotFound;
