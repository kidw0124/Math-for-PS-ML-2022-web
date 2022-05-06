function Error({ code, message }) {
	return (
		<div className="error">
			<h1>{code}</h1>
			<h2>{message}</h2>
		</div>
	);
}
export default Error;
