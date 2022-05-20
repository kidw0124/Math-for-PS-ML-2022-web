import "./Contests.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Contests() {
	const { page } = useParams();

	const [contestList, setContestList] = useState([
		{
			number: 1,
			title: "5/2 1강 내용",
			startTime: "2020-01-01",
			endTime: "2020-01-01",
		},
	]);
	const [numberEachPage, setNumberEachPage] = useState(100);

	const TableForContests = ({ st, en }) => {
		return (
			<table className="table-contest">
				<thead>
					<tr>
						<th style={{ width: "10%" }}>#</th>
						<th style={{ width: "15%" }}>대회번호</th>
						<th style={{ width: "15%" }}>시작날짜</th>
						<th style={{ width: "15%" }}>종료날짜</th>
						<th style={{ width: "50%" }}>대회제목</th>
					</tr>
				</thead>
				<tbody>
					{contestList.slice(st, en).map((contest, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									<Link
										to={`/contest/${contest.number}`}
										className="link-contest-number"
									>
										{contest.number}
									</Link>
								</td>
								<td>{contest.startTime}</td>
								<td>{contest.endTime}</td>
								<td>
									<Link
										to={`/contest/${contest.number}`}
										className="link-contest-title"
									>
										{contest.title}
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};
	return (
		<div className="contests-page">
			<TableForContests
				st={(parseInt(page) - 1) * numberEachPage}
				en={parseInt(page) * numberEachPage}
			/>
			<div className="pagination">
				<Link to={`/contests/${parseInt(page) - 1}`}>
					{page > 1 && <div>&lt;</div>}
				</Link>

				<div>
					{page}/{Math.ceil(contestList.length / numberEachPage)}
				</div>

				<Link to={`/contests/${parseInt(page) + 1}`}>
					{page < Math.ceil(contestList.length / numberEachPage) && (
						<div>&gt;</div>
					)}
				</Link>
			</div>
		</div>
	);
}

export default Contests;
