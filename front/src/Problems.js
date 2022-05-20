import "./Problems.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Problems() {
	const { page } = useParams();

	const [problemList, setProblemList] = useState([
		{ number: 1000, title: "Hello, World!" },
	]);
	const [numberEachPage, setNumberEachPage] = useState(100);

	const TableForProblems = ({ st, en }) => {
		return (
			<table className="table-problem">
				<thead>
					<tr>
						<th style={{ width: "10%" }}>#</th>
						<th style={{ width: "20%" }}>문제번호</th>
						<th style={{ width: "70%" }}>문제제목</th>
					</tr>
				</thead>
				<tbody>
					{problemList.slice(st, en).map((problem, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									<Link
										to={`/problem/${problem.number}`}
										className="link-problem-number"
									>
										{problem.number}
									</Link>
								</td>
								<td>
									<Link
										to={`/problem/${problem.number}`}
										className="link-problem-title"
									>
										{problem.title}
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	useEffect(() => {
		axios
			.get("/api/problems/list")
			.then((res) => {
				setProblemList(res.data);
			})
			.catch((err) => {});
	}, []);

	return (
		<div className="problems-page">
			<TableForProblems
				st={(parseInt(page) - 1) * numberEachPage}
				en={parseInt(page) * numberEachPage}
			/>
			<div className="pagination">
				<Link to={`/problems/${parseInt(page) - 1}`} id="prev-page-button">
					{page > 1 && <div>&lt;</div>}
				</Link>
				<div>
					{page}/{Math.ceil(problemList.length / numberEachPage)}
				</div>

				<Link to={`/problems/${parseInt(page) + 1}`} id="next-page-button">
					{page < Math.ceil(problemList.length / numberEachPage) && (
						<div>&gt;</div>
					)}
				</Link>
			</div>
		</div>
	);
}

export default Problems;
