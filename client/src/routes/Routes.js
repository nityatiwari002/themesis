import Dashboard from "../pages/Dashboard";
import DashboardLawyer from "../pages/DashboardLawyer";
import Logout from "../services/Logout";
import Pastcases from "../pages/Pastcases";
import Efiling from "../pages/Efiling";
import FindLawyer from "../pages/FindLawyer";
import LegalGuide from "../pages/LegalGuide";
import PrepAndPitch from "../pages/PrepAndPitch";
import Peerconnect from "../pages/Peerconnect";
import TrialDetainees from "../pages/TrialDetainees";
import QuickFixCourt from "../pages/QuickFixCourt";
import ChatPage from "../pages/ChatPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ChatBot from "../pages/ChatBot";
import ForgotPw from "../pages/ForgotPw";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faGavel,
	faChartPie,
	faHandHoldingHand,
	faPeopleGroup,
	faRightToBracket,
	faUserPlus,
	faComments,
	faIdCard,
	faRightFromBracket,
	faLandmarkDome,
	faBook,
	faClockRotateLeft,
	faScaleBalanced
} from "@fortawesome/free-solid-svg-icons";

const routes = [
	{
		path: "/dashboard",
		component: <Dashboard />,
		name: "Dashboard",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: false,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faChartPie} />,
	},
	{
		path: "/dashboardLawyer",
		component: <DashboardLawyer />,
		name: "Dashboard",
		isPrivate: true,
		isMenuUser: false,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faChartPie} />,
	},
	{
		path: "/guide",
		component: <LegalGuide />,
		name: "Legal Guide",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faHandHoldingHand} />,
	},
	{
		path: "/Quick-fix-court",
		component: <QuickFixCourt />,
		name: "Quick Fix Court",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faLandmarkDome} />,
	},
	{
		path: "/find-lawyer",
		component: <FindLawyer />,
		name: "Find Lawyer",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: false,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faGavel} />,
	},
	{
		path: "/prep-and-pitch",
		component: <PrepAndPitch />,
		name: "Prep & Pitch",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: false,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faBook} />,
	},

	{
		path: "/efilling",
		component: <Efiling />,
		name: "E-Filing",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faIdCard} />,
	},
	{
		path: "/peer-connect",
		component: <Peerconnect />,
		name: "Peer Connect",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faPeopleGroup} />,
	},
	{
		path: "/trial-detainees",
		component: <TrialDetainees />,
		name: "Trial Detainees",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: false,
		isUtility: false,
		icon:<FontAwesomeIcon icon={faScaleBalanced} />,
	},
	{
		path: "/pastcases",
		component: <Pastcases />,
		name: "Past Cases",
		isPrivate: true,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
	},

	{
		path: "/home",
		component: <Home />,
		name: "Home",
		isPrivate: false,
		isMenuUser: true,
		isMenuLawyer: false,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faHome} />,
	},

	{
		path: "/login",
		component: <Login />,
		name: "Login",
		isPrivate: false,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faRightToBracket} />,
	},
	{
		path: "/sign-up",
		component: <Register />,
		name: "Sign Up",
		isPrivate: false,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faUserPlus} />,
	},
	{
		path: "/chat-bot",
		component: <ChatBot />,
		name: "Chat Bot",
		isPrivate: true,
		isMenuUser: false,
		isMenuLawyer: false,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faGavel} />,
	},
	{
		path: "/forgotPassword",
		component: <ForgotPw />,
		name: "Forgot Password",
		isPrivate: false,
		isMenuUser: true,
		isMenuLawyer: true,
		isUtility: true,
		icon: <FontAwesomeIcon icon={faGavel} />,
	},
	{
		path: "*",
		component: <NotFound />,
		name: "Not Found",
		isPrivate: false,
		isMenuUser: false,
		isMenuLawyer: false,
		isUtility: true,
		icon: <FontAwesomeIcon icon={faGavel} />,
	},
	{
		path: "/chat",
		component: <ChatPage />,
		name: "Chat Page",
		isPrivate: true,
		isMenuLawyer: true,
		isMenuUser: true,
		isUtility: false,
		icon: <FontAwesomeIcon icon={faComments} />,
	},
	{
		path: "/logout",
		component: <Logout token={localStorage.getItem("token")} />,
		name: "Logout",
		isPrivate: true,
		isMenuUser: false,
		isMenuLawyer: false,
		isUtility: true,
		icon: <FontAwesomeIcon icon={faRightFromBracket} />,
	},
];

export default routes;
