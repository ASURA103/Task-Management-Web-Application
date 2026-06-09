import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL || "",
  JWT_KEY: process.env.JWT_KEY || "",
};
export default env;
