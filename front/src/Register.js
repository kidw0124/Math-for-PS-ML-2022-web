import "./Register.css";
import axios from "axios";
import { useEffect, useState } from "react";

function InputComponent({
	msg,
	id,
	type,
	onChange,
	value,
	maxLength,
	additional,
}) {
	return (
		<div className="input-container">
			<div className="input-component">
				<div className="input-component-msg">{msg}</div>
				<input
					className="input-component-input"
					id={"input-component-input-" + id}
					type={type}
					onChange={onChange}
					defaultValue={value}
					maxLength={maxLength}
				/>
			</div>
			<div className="input-component-additional">{additional}</div>
		</div>
	);
}
function ButtonComponent({ msg, onClick, id }) {
	return (
		<div className="button-component">
			<div
				className="button-component-button"
				id={"button-component-button-" + id}
				onClick={onClick}
			>
				{msg}
			</div>
		</div>
	);
}

function register_send(id, pw, pwCheck, name, email) {
	axios
		.post("/api/register", {
			id: id,
			password: pw,
			passwordCheck: pwCheck,
			name: name,
			email: email,
		})
		.then((result) => {
			alert(result.data.message);
		});
}

function Register() {
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [pwCheck, setPwCheck] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	return (
		<div className="register-container">
			<div className="register-title">회원가입</div>
			<div className="register-input-container">
				<InputComponent
					msg="ID"
					id="id"
					type="text"
					onChange={(e) => setId(e.target.value)}
					value={id}
					maxLength="20"
					additional={
						<div
							id="id-duplicate-check"
							onClick={() => {
								axios
									.post("/api/register/id-duplicate-check", {
										id: id,
									})
									.then((result) => {
										alert(result.data.message);
										if (result.data.success) {
											document.getElementById("id-duplicate-check").innerHTML =
												"사용가능";
											document.getElementById(
												"id-duplicate-check"
											).style.color = "green";
											document.getElementById(
												"id-duplicate-check"
											).style.cursor = "default";
											document.getElementById(
												"id-duplicate-check"
											).style.pointerEvents = "none";
											document.getElementById(
												"id-duplicate-check"
											).disabled = true;
											document.getElementById(
												"id-duplicate-check"
											).style.backgroundColor = "transparent";
											document.getElementById(
												"input-component-input-id"
											).disabled = true;
										}
									});
							}}
						>
							중복확인
						</div>
					}
				/>
				<InputComponent
					msg="비밀번호"
					id="password"
					type="password"
					onChange={(e) => setPw(e.target.value)}
					value={pw}
					maxLength="20"
				/>
				<InputComponent
					msg="비밀번호확인"
					id="passwordCheck"
					type="password"
					onChange={(e) => setPwCheck(e.target.value)}
					value={pwCheck}
					maxLength="20"
				/>
				<InputComponent
					msg="이름"
					id="name"
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<InputComponent
					msg="이메일"
					id="email"
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</div>
			<div className="register-button-container">
				<ButtonComponent
					msg="회원가입"
					onClick={() => register_send(id, pw, pwCheck, name, email)}
					id="register"
				/>
			</div>
		</div>
	);
}

export default Register;
