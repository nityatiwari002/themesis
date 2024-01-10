import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout";
import Pastcases from "../pages/Pastcases";
import Efiling from "../pages/Efiling";
import FindLawyer from "../pages/FindLawyer";
import LegalGuide from "../pages/LegalGuide";
import PrepAndPitch from "../pages/PrepAndPitch";
import Peerconnect from "../pages/Peerconnect";
import TrialDetainees from "../pages/TrialDetainees";
const routes = [
	{
		path: "/dashboard",
		component: <Dashboard />,
		name: "Dashboard",
	},
	{
		path: "/guide",
		component: <LegalGuide />,
		name: "Legal Guide",
	},

	{
		path: "/find-lawyer",
		component: <FindLawyer />,
		name: "Find Lawyer",
	},
	{
		path: "/prep-and-pitch",
		component: <PrepAndPitch />,
		name: "Prep & Pitch",
	},
	{
		path: "/efilling",
		component: <Efiling />,
		name: "E-Filing",
	},
	{
		path: "/peer-connect",
		component: <Peerconnect />,
		name: "Peer Connect",
	},
	{
		path: "/trial-detainees",
		component: <TrialDetainees />,
		name: "Trial Detainees",
	},
	{
		path: "/pastcases",
		component: <Pastcases />,
		name: "Past Cases",
	},
	{
		path: "/logout",
		component: <Logout />,
		name: "Logout",
	},
];

export default routes;
