import "./App.css";
import { Route, Navigate, Routes, Router } from "react-router-dom";
import { Home, Error, Login } from ".";

function App() {
	return (
		<div className="App">
			<div id="page">
				<Routes>
					<Route exact path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
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

