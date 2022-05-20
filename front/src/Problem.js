import "./Problem.css";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Error } from ".";
import axios from "axios";
function Problem() {
	const { problemNumber } = useParams();
	const [problemTitle, setProblemTitle] = useState("");
	useEffect(() => {
		axios.get("/api/problems/title/" + problemNumber).then((res) => {
			setProblemTitle(res.data);
		});
	}, [problemNumber]);

	return isNaN(problemNumber) ? (
		<Error code={404} message="Page not found" />
	) : (
		<div className="Problem">
			<div className="Problem-title">{problemTitle}</div>
		</div>
	);
}
export default Problem;
