import dotenv from "dotenv";

dotenv.config();

const db = process.env.DATABASE_NAME || "hrm";

const dbConfig = {
	HOST: process.env.MYSQL_HOST,
	USER: process.env.MYSQL_USERNAME,
	PASSWORD: process.env.MYSQL_PASSWORD,
	DB: db,
	PORT: process.env.MYSQL_PORT,
};

export default dbConfig;
