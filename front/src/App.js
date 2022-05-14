import "./App.css";
import { Route, Navigate, Routes, useParams } from "react-router-dom";
import { Home, Error, Login, Problem, Register } from ".";
const RedirectNumberToProbnum = () => {
	const { problemNumber } = useParams();
	return <Navigate replace to={`/problem/${problemNumber}`} />;
};
function App() {
	return (
		<div className="App">
			<div id="page">
				<Routes>
					<Route exact path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/problem/:problemNumber" element={<Problem />} />
					<Route path="/:problemNumber" element={<RedirectNumberToProbnum />} />
					<Route
						path="*"
						element={<Error code={404} message="Page not found" />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;

