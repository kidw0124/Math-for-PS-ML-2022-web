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
	placeholder,
	required = true,
	minLength,
	pattern,
}) {
	return (
		<div className="input-container">
			<div className="input-component-regi">
				<div className="input-component-regi-msg">{msg}</div>
				<input
					className="input-component-regi-input"
					id={"input-component-input-" + id}
					type={type}
					onChange={onChange}
					defaultValue={value}
					maxLength={maxLength ? maxLength : null}
					minLength={minLength ? minLength : 0}
					placeholder={placeholder}
					required={required}
					pattern={pattern}
				/>
			</div>
			<div className="input-component-regi-additional">{additional}</div>
		</div>
	);
}
function ButtonComponent({ msg, onClick, id, disabled, visible }) {
	return (
		<div className="button-component">
			<button
				className="button-component-button"
				id={"button-component-button-" + id}
				onClick={onClick}
				disabled={disabled}
				type={visible ? "submit" : "none"}
				style={{ visibility: visible ? "visible" : "hidden" }}
			>
				{msg}
			</button>
		</div>
	);
}

function Register() {
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [pwCheck, setPwCheck] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [dup, setDup] = useState(false);
	const nameset = [
		"김동우",
		"김예훈",
		"김현준",
		"황대엽",
		"최창호",
		"박성현",
		"이유림",
	];
	const idDuplicateCheck = () => {
		axios
			.post("/api/register/id-duplicate-check", {
				id: id,
			})
			.then((result) => {
				alert(result.data.message);
				if (result.data.success) {
					document.getElementById("id-duplicate-check").innerHTML = "사용가능";
					document.getElementById("id-duplicate-check").style.color = "blue";
					document.getElementById("id-duplicate-check").style.cursor =
						"default";
					document.getElementById("id-duplicate-check").style.pointerEvents =
						"none";
					document.getElementById("id-duplicate-check").disabled = true;
					document.getElementById("id-duplicate-check").style.backgroundColor =
						"transparent";
					document.getElementById("input-component-input-id").disabled = true;
					setDup(true);
				}
			});
	};
	const register_send = async (id, pw, pwCheck, name, email) => {
		const idCheck = await axios.post("/api/register/id-duplicate-check", {
			id: id,
		});
		if (!idCheck.data.success) {
			alert(idCheck.data.message);
			return false;
		} else {
			const register = await axios.post("/api/register", {
				id: id,
				password: pw,
				passwordCheck: pwCheck,
				name: name,
				email: email,
			});
			if (register.data.success) {
				alert(register.data.message);
				return true;
			}
		}
	};
	return (
		<form
			className="register-container"
			onSubmit={async (e) => {
				e.preventDefault();
				if (
					id.length >= 4 &&
					id.length <= 20 &&
					pw.length >= 8 &&
					pw.length <= 20 &&
					pwCheck === pw &&
					name.length > 0 &&
					email.length > 0 &&
					nameset.includes(name) &&
					dup
				) {
					const regi_succ = await register_send(id, pw, pwCheck, name, email);
					console.log(regi_succ);
					if (regi_succ) {
						window.location.href = "/";
					}
				}
			}}
		>
			<div className="register-title">회원가입</div>
			<div className="register-input-container">
				<InputComponent
					msg="ID *"
					id="id"
					type="text"
					onChange={(e) => setId(e.target.value)}
					value={id}
					maxLength="20"
					minLength="4"
					placeholder="4~20글자의 ID를 입력해주세요"
					additional={
						id.length >= 4 && id.length <= 20 ? (
							<div id="id-duplicate-check" onClick={idDuplicateCheck}>
								중복확인
							</div>
						) : (
							""
						)
					}
				/>
				<InputComponent
					msg="비밀번호 *"
					id="password"
					type="password"
					onChange={(e) => setPw(e.target.value)}
					value={pw}
					placeholder="8~20글자의 비밀번호를 입력해주세요"
					minLength="8"
					maxLength="20"
				/>
				<InputComponent
					msg="비밀번호확인 *"
					id="passwordCheck"
					type="password"
					onChange={(e) => setPwCheck(e.target.value)}
					value={pwCheck}
					placeholder="비밀번호를 한번 더 입력해주세요"
					minLength="8"
					maxLength="20"
					additional={
						<div id="password-check">{pwCheck === pw ? "" : "불일치"}</div>
					}
				/>
				<InputComponent
					msg="이름 *"
					id="name"
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<InputComponent
					msg="이메일 *"
					id="email"
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
				/>
			</div>

			<div className="register-button-container">
				{id.length >= 4 &&
				id.length <= 20 &&
				pw.length >= 8 &&
				pw.length <= 20 &&
				pwCheck === pw &&
				name.length > 0 &&
				email.length > 0 &&
				nameset.includes(name) &&
				dup ? (
					<ButtonComponent
						msg="회원가입"
						id="register"
						disabled={false}
						visible={true}
					/>
				) : (
					<ButtonComponent
						msg="회원가입"
						id="register"
						disabled={true}
						visible={false}
					/>
				)}
			</div>
		</form>
	);
}

export default Register;
