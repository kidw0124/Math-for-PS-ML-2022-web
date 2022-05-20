import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ user }) {
	const [lecture, setLecture] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const iconMap = {
		pdf: "/pdf.png",
	};
	const dateOptions = {
		hour12: true,
		timeZone: "Asia/Seoul",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	};

	const getData = () => {
		setLecture([
			{
				id: 1,
				date: new Date("2022-05-02 19:00").toLocaleString("ko-KR", dateOptions),
				title: "nCr 구하기",
				content: "수학기호, 군체론, FLT, 윌슨정리, Combination",
				data: [
					{
						id: 1,
						title: "김예훈 필기",
						type: "pdf",
						link: "/김예훈0502.pdf",
					},
				],
			},
			{
				id: 2,
				date: new Date("2022-05-20 17:00").toLocaleString("ko-KR", dateOptions),
				title: "여러 수열과 구현",
				content: "Catalan, Derangement, ML, AI",
				data: [],
			},
			{
				id: 3,
				date: new Date("2022-06-03 17:00").toLocaleString("ko-KR", dateOptions),
				title: "게임이론",
				content: "게임이론 개론, Sprague-Grundy Theorem, DP in GT",
				data: [],
			},
		]);
		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);
	const HomeTitle = ({ title }) => {
		return (
			<div className="Home-title">
				<h2>{title}</h2>
			</div>
		);
	};

	return (
		<div className="Home">
			<div className="Home-container">
				{user.name ? (
					<div
						style={{
							textAlign: "left",
							width: "100%",
							fontSize: "1.5rem",
							fontWeight: "bold",
							color: "#999999",
							height: "2rem",
						}}
					>
						{user.name}님 반갑습니다.
					</div>
				) : (
					<div
						style={{
							textAlign: "left",
							width: "100%",
							fontSize: "1.5rem",
							fontWeight: "bold",
							color: "#999999",
							height: "2rem",
						}}
					>
						...
					</div>
				)}
			</div>
			<div className="Home-container">
				<HomeTitle title="수업 목록" />
				<div className="Home-list">
					{isLoading ? (
						<div>로딩중...</div>
					) : isError ? (
						<div>에러 발생</div>
					) : (
						<table className="Home-lecture-table">
							<thead>
								<tr>
									<th style={{ width: "20%" }}>날짜</th>
									<th style={{ width: "15%" }}>제목</th>
									<th style={{ width: "55%" }}>내용</th>
									<th style={{ width: "10%" }}>자료</th>
								</tr>
							</thead>
							<tbody>
								{lecture.map((lecture) => (
									<tr key={lecture.id}>
										<td>{lecture.date}</td>
										<td>{lecture.title}</td>
										<td>{lecture.content}</td>
										<td className="Home-lecture-table-data">
											{lecture.data.map((data) => (
												<div key={data.id}>
													<Link to={data.link} target="_blank">
														<img
															className="Home-lecture-table-data-icon"
															src={iconMap[data.type]}
															alt={data.title}
														/>
													</Link>
												</div>
											))}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
