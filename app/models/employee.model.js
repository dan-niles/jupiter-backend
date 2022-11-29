import connection from "../config/db.js";

// Constructor for Employee object
const Employee = function (employee) {
	this.emp_id = employee.emp_id;
	this.role = employee.role;
	this.username = employee.username;
	this.password = employee.password;
};

// Insert new employee into the database
Employee.create = (newUser, result) => {
	connection.query("INSERT INTO employee SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created employee: ", { user_id: res.insertId, ...newUser });
		result(null, { user_id: res.insertId, ...newUser });
	});
};

// Retrieve employees from the database
Employee.getAll = (result) => {
	const query = "SELECT * FROM employee";

	connection.query(query, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("employees: ", res);
		result(null, res);
	});
};

// Find employee by user_id
Employee.findById = (user_id, result) => {
	connection.query(
		"SELECT * FROM employee WHERE user_id = ?",
		[user_id],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("Found employee: ", res[0]);
				result(null, res[0]);
				return;
			}

			// no employee found
			result({ kind: "not_found" }, null);
		}
	);
};

// Find employee by username and password
Employee.findByCredentials = (username, result) => {
	connection.query(
		"SELECT * FROM employee WHERE username = ?",
		username,
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				result(null, res[0]);
				return;
			}

			// not found employee with the user_id
			result({ kind: "not_found" }, null);
		}
	);
};

// Update employee in the database
Employee.updateById = (user_id, employee, result) => {
	connection.query(
		"UPDATE employee SET role = ?, username = ?, password = ? WHERE user_id = ?",
		[employee.role, employee.username, employee.password, user_id],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found employee with the user_id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("Updated employee: ", { user_id: user_id, ...employee });
			result(null, { user_id: user_id, ...employee });
		}
	);
};

// Delete employee from the database
Employee.remove = (user_id, result) => {
	connection.query(
		"DELETE FROM employee WHERE user_id = ?",
		user_id,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found employee with the user_id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("Deleted employee with user_id: ", user_id);
			result(null, res);
		}
	);
};

export default Employee;
