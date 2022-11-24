import mysql from "mysql2";
import dbConfig from "./db.config.js";

// Create a connection to the database
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	port: dbConfig.PORT,
});

// Open the MySQL connection
connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

export default connection;
