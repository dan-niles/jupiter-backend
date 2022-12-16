import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const db = process.env.DATABASE_NAME || "hrm"

// Create a connection to the database
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: db,
	port: process.env.MYSQL_PORT,
})

// Open the MySQL connection
connection.connect((error) => {
	if (error) throw error
	console.log("Successfully connected to the database.")
})

export default connection
