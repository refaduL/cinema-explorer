const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const movieRouter = require("./routers/movieRouter");
const dashboardRouter = require("./routers/dashboardRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500,
  message: "Too many request from this IP. Please try again later",
});

app.use(morgan("dev"));
app.use(rateLimiter);
app.use(xssClean());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDir = path.resolve(__dirname, "../public/images/movie_posters/");
app.use("/movie_posters", express.static(publicDir));

app.get("/test", (req, res) => {
  console.log(publicDir);
  res.status(200).send({ message: "get: api is working fine" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/dashboard", dashboardRouter);

// client error handle
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

// server error handling -> all the errors from any routes will go through the this handler
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
