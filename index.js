import app from "./server.js";

import UserDAO from "./DAO/UserDAO.js";

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

let connection = mysql.createConnection(process.env.MYSQL_CONNECTION_URI);

connection.connect((err) => {
	if (err) {
		return console.error(err);
	}

	console.log("Connected to the mysql server.");
});

const db = process.env.DATABASE_NAME || "hrm";
connection.execute("CREATE DATABASE IF NOT EXISTS " + db);

UserDAO.injectDB(connection);

UserDAO.addUser();

app.listen(port, () => console.log(`listening on port ${port}`));
