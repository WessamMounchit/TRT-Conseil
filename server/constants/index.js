const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_URL:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://127.0.0.1:5173",
  SECRET: process.env.SECRET,
  TRT_EMAIL: process.env.TRT_EMAIL,
  TRT_PASSWORD: process.env.TRT_PASSWORD,
};
