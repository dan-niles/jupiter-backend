import connection from "./db.js";

// Constructor for User object
const User = function (user) {
	this.emp_id = user.emp_id;
	this.role = user.role;
	this.username = user.username;
	this.password = user.password;
};

// Insert new user into the database
User.create = (newUser, result) => {
	connection.query("INSERT INTO user SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created user: ", { id: res.insertId, ...newUser });
		result(null, { id: res.insertId, ...newUser });
	});
};

// Retrieve users from the database
User.getAll = (emp_id, result) => {
	let query = "SELECT * FROM user";

	if (emp_id) {
		query += ` WHERE emp_id LIKE '%${emp_id}%'`;
	}

	connection.query(query, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("users: ", res);
		result(null, res);
	});
};

export default User;
