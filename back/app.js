const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const responseTime = require("response-time");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const problemRouter = require("./routes/problem");
const loginRouter = require("./routes/login");
const dbRouter = require("./routes/db").router;
const registerRouter = require("./routes/register");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	responseTime((req, res, time) => {
		console.log(`----------------------------------------`);
		console.log(`new request: ${req.originalUrl}`);
		console.log(`${req.method} ${req.url} ${time}ms`);
		console.log(`headers: ${JSON.stringify(req.headers)}`);
		console.log(`body: ${JSON.stringify(req.body)}`);
		console.log(`query: ${JSON.stringify(req.query)}`);
		console.log(`params: ${JSON.stringify(req.params)}`);
		console.log(`----------------------------------------`);
	})
);
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/problems", problemRouter);
app.use("/api/login", loginRouter);
app.use("/api/db", dbRouter);
app.use("/api/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

