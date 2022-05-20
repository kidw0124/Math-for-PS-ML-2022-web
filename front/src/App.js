import "./App.css";
import { Route, Navigate, Routes, useParams } from "react-router-dom";
import {
	Home,
	Error,
	Login,
	Problem,
	Register,
	Navbar,
	Problems,
	Contests,
	Rank,
} from ".";
import { useState, useEffect } from "react";
import axios from "axios";
const RedirectNumberToProbnum = () => {
	const { problemNumber } = useParams();
	if (isNaN(problemNumber))
		return <Error code={404} message="Page not found" />;
	else return <Navigate replace to={`/problem/${problemNumber}`} />;
};
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem("session") !== null
	);
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
	});
	const [ip, setIP] = useState("");
	const getData = async () => {
		const res = await axios.get("https://geolocation-db.com/json/");
		setIP(res.data.IPv4);
		if (localStorage.getItem("session")) {
			const session = localStorage.getItem("session");
			axios
				.post("/api/login/user-info", {
					sessionKey: session,
					ip: res.data.IPv4,
				})
				.then((res) => {
					if (res.data.success) {
						setIsLoggedIn(true);
						setUser({
							id: res.data.user.id,
							name: res.data.user.name,
							email: res.data.user.email,
						});
					} else {
						localStorage.removeItem("session");
						alert(res.data.message);
						setIsLoggedIn(false);
						setUser({
							id: "",
							name: "",
							email: "",
						});
					}
				})
				.catch((err) => {
					if (localStorage.getItem("session")) alert(err.response.data.message);
					localStorage.removeItem("session");
					setIsLoggedIn(false);
					setUser({
						id: "",
						name: "",
						email: "",
					});
				});
		}
	};
	useEffect(() => {
		getData();
	}, []);

	const logout = () => {
		localStorage.removeItem("session");
		setIsLoggedIn(false);
		setUser({
			id: "",
			name: "",
			email: "",
		});
	};

	return (
		<div className="App">
			{isLoggedIn ? (
				<div id="navbar">
					<Navbar user={user} logout={logout} />
				</div>
			) : null}

			<div id="page">
				{isLoggedIn ? (
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/home" element={<Home user={user} />} />
						<Route path="login" element={<Navigate to="/home" />} />
						<Route path="/register" element={<Navigate to="/home" />} />
						<Route path="/error" element={<Error />} />
						<Route path="/problem/:problemNumber" element={<Problem />} />
						<Route path="/problems/:page" element={<Problems />} />
						<Route path="/problems" element={<Navigate to="/problems/1" />} />
						<Route path="/contests/:page" element={<Contests />} />
						<Route path="/contests" element={<Navigate to="/contests/1" />} />
						<Route path="/rank/:page" element={<Rank />} />
						<Route path="/rank" element={<Navigate to="/rank/1" />} />
						<Route
							path="/:problemNumber"
							element={<RedirectNumberToProbnum />}
						/>
						<Route
							path="*"
							element={<Error code={404} message="Page not found" />}
						/>
					</Routes>
				) : (
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</Routes>
				)}
			</div>
		</div>
	);
}

export default App;

