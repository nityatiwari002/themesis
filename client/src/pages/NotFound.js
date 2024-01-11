import { AuthData } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const { user } = AuthData();
	const navigate = useNavigate();
	if (user.isAuthenticated) {
		navigate("/dashboard");
	} else {
		navigate("/home");
	}
}

export default NotFound;
