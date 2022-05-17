import "./App.css";
import { Route, Navigate, Routes, useParams } from "react-router-dom";
import { Home, Error, Login, Problem, Register } from ".";
import { useState, useEffect } from "react";
import axios from "axios";
const RedirectNumberToProbnum = () => {
	const { problemNumber } = useParams();
	return <Navigate replace to={`/problem/${problemNumber}`} />;
};
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
	});
	const [ip, setIP] = useState("");
	const getData = async () => {
		const res = await axios.get("https://geolocation-db.com/json/");
		setIP(res.data.IPv4);
	};
	useEffect(() => {
		getData();
	}, []);
	useEffect(() => {
		if (localStorage.getItem("session")) {
			const session = localStorage.getItem("session");
			const now = new Date();
			axios
				.post("/api/login/user-info", {
					sessionKey: session,
					ip: ip,
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
					localStorage.removeItem("session");
					alert(err.response.data.message);
					setIsLoggedIn(false);
					setUser({
						id: "",
						name: "",
						email: "",
					});
				});
		}
		console.log(isLoggedIn);
	}, [isLoggedIn, ip]);

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
			<div id="page">
				{isLoggedIn ? (
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/home" element={<Home />} />
						<Route path="/problem/:problemNumber" element={<Problem />} />
						<Route
							path="/:problemNumber"
							element={<RedirectNumberToProbnum />}
						/>
						<Route path="/error" element={<Error />} />
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

