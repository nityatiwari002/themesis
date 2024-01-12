import Dashboard from "../pages/Dashboard";
import Logout from "../services/Logout";
import Pastcases from "../pages/Pastcases";
import Efiling from "../pages/Efiling";
import FindLawyer from "../pages/FindLawyer";
import LegalGuide from "../pages/LegalGuide";
import PrepAndPitch from "../pages/PrepAndPitch";
import Peerconnect from "../pages/Peerconnect";
import TrialDetainees from "../pages/TrialDetainees";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ChatBot from "../pages/ChatBot";
const routes = [
	{
		path: "/dashboard",
		component: <Dashboard />,
		name: "Dashboard",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/guide",
		component: <LegalGuide />,
		name: "Legal Guide",
		isPrivate: true,
		isMenu: true,
	},

	{
		path: "/find-lawyer",
		component: <FindLawyer />,
		name: "Find Lawyer",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/prep-and-pitch",
		component: <PrepAndPitch />,
		name: "Prep & Pitch",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/efilling",
		component: <Efiling />,
		name: "E-Filing",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/peer-connect",
		component: <Peerconnect />,
		name: "Peer Connect",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/trial-detainees",
		component: <TrialDetainees />,
		name: "Trial Detainees",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/pastcases",
		component: <Pastcases />,
		name: "Past Cases",
		isPrivate: true,
		isMenu: true,
	},
	{
		path: "/logout",
		component: <Logout token={localStorage.getItem("token")} />,
		name: "Logout",
		isPrivate: true,
		isMenu: false,
	},

	{
		path: "/home",
		component: <Home />,
		name: "Home",
		isPrivate: false,
		isMenu: true,
	},
	{
		path: "/login",
		component: <Login />,
		name: "Login",
		isPrivate: false,
		isMenu: true,
	},
	{
		path: "/sign-up",
		component: <Register />,
		name: "Sign Up",
		isPrivate: false,
		isMenu: true,
	},
	{
		path: "/chat-bot",
		component: <ChatBot />,
		name: "Chat Bot",
		isPrivate: false,
		isMenu: false,
	},
	{
		path: "*",
		component: <NotFound />,
		name: "Not Found",
		isPrivate: false,
		isMenu: false,
	},
];

export default routes;
