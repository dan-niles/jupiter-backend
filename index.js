import app from "./server.js";

import UserDAO from "./DAO/UserDAO.js";

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const db = process.env.DATABASE_NAME || "hrm";

var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: db,
	port: process.env.MYSQL_PORT,
});

connection.connect((err) => {
	if (err) {
		return console.error(err);
	}

	console.log("Connected to the mysql server.");
});

connection.execute("CREATE DATABASE IF NOT EXISTS " + db);

UserDAO.injectDB(connection);

UserDAO.getEmployees();

app.listen(port, () => console.log(`listening on port ${port}`));
