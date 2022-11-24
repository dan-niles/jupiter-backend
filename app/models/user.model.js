import connection from "../config/db.js";

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

		console.log("created user: ", { user_id: res.insertId, ...newUser });
		result(null, { user_id: res.insertId, ...newUser });
	});
};

// Find user by user_id
User.findById = (user_id, result) => {
	connection.query(
		`SELECT * FROM user WHERE user_id = ${user_id}`,
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("Found user: ", res[0]);
				result(null, res[0]);
				return;
			}

			// not found user with the user_id
			result({ kind: "not_found" }, null);
		}
	);
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

// Update user in the database
User.updateById = (user_id, user, result) => {
	connection.query(
		"UPDATE user SET role = ?, username = ?, password = ? WHERE user_id = ?",
		[user.role, user.username, user.password, user_id],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found user with the user_id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("Updated user: ", { user_id: user_id, ...user });
			result(null, { user_id: user_id, ...user });
		}
	);
};

// Delete user from the database
User.remove = (user_id, result) => {
	connection.query(
		"DELETE FROM user WHERE user_id = ?",
		user_id,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found user with the user_id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("Deleted user with user_id: ", user_id);
			result(null, res);
		}
	);
};

export default User;
