require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;
const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "cinema_user";
const dbPassword = process.env.DB_PASSWORD || "cinema123";
const dbName = process.env.DB_NAME || "cinemaExp";
const defaultImagepath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.png";
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "asdfg_lkjh";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "asdfg_lkjh";
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientURL = process.env.CLIENT_URL || "";

module.exports = {
  serverPort,
  defaultImagepath,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientURL,
  jwtAccessKey,
  serverPort,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
};
