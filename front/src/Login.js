import "./Login.css";
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
	return (
		<div className="Login">
			<h1 className="login-title">Login</h1>
			<div className="login-input-container">
				<InputComponent
					msg="ID"
					id="id"
					type="text"
					onChange={(e) => {
						console.log(e.target.value);
					}}
					value=""
					maxLength={20}
				/>
				<InputComponent
					msg="PW"
					id="password"
					type="password"
					onChange={(e) => {
						console.log(e.target.value);
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
						console.log("Login");
					}}
					id="id"
				/>
			</div>
		</div>
	);
}
export default Login;
