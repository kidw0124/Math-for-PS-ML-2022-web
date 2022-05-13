import "./Login.css";
import axios from "axios";
import { useEffect, useState } from "react";
function InputComponent({ msg, id, type, onChange, value, maxLength }) {
	return (
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
	);
}
function ButtonComponent({ msg, onClick, id }) {
	return (
		<div className="button-component">
			<div
				className="button-component-button"
				onClick={onClick}
				id={"button-component-button-" + id}
			>
				{msg}
			</div>
		</div>
	);
}

function Login() {
	const [ID, setID] = useState("");
	const [PW, setPW] = useState("");
	const [ip, setIP] = useState("");
	const getData = async () => {
		const res = await axios.get("https://geolocation-db.com/json/");
		setIP(res.data.IPv4);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="Login">
			<h1 className="login-title">Login</h1>
			<div className="login-input-container">
				<InputComponent
					msg="ID"
					id="id"
					type="text"
					onChange={(e) => {
						setID(e.target.value);
					}}
					value=""
					maxLength={20}
				/>
				<InputComponent
					msg="PW"
					id="password"
					type="password"
					onChange={(e) => {
						setPW(e.target.value);
					}}
					value=""
					maxLength={20}
				/>
			</div>
			<div className="login-button-container">
				<ButtonComponent
					msg="Register"
					onClick={() => {
						console.log("Register");
					}}
				/>
				<ButtonComponent
					msg="Login"
					onClick={() => {
						axios
							.post(
								"/api/login",
								{
									ip: ip,
								},
								{
									params: {
										id: ID,
										password: PW,
									},
								}
							)
							.then((result) => {
								alert(result.data.message);
							})
							.catch((err) => {
								alert(err.response.data.message);
							});
					}}
					id="id"
				/>
			</div>
		</div>
	);
}
export default Login;
