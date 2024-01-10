import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
const nativeRoutes = [
	{
		path: "/",
		component: <Home />,
		name: "Home",
	},
	{
		path: "/login",
		component: <Login />,
		name: "Login",
	},
	{
		path: "/sign-up",
		component: <Register />,
		name: "Sign Up",
	},
];

export default nativeRoutes;
