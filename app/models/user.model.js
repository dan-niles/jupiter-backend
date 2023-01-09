import connection from "../config/db.js";

class User {
	constructor({ user_id, emp_id, role, username, password }) {
		this.user_id = user_id;
		this.emp_id = emp_id;
		this.role = role;
		this.username = username;
		this.password = password;
	}

	toJSON() {
		return {
			user_id: this.user_id,
			emp_id: this.emp_id,
			role: this.role,
			username: this.username,
		};
	}

	create(result) {
		connection.query(
			`
			INSERT INTO user(
			emp_id,
			role,
			username,
			password
			)
			VALUES(?, ?, ?, ?)`,
			[this.emp_id, this.role, this.username, this.password],
			(err, res) => {
				if (err) {
					console.log(err);
					return result(err, null);
				}

				this.user_id = res.insertId;

				result(null, this.toJSON());
			}
		);
	}

	// Retrieve users from the database
	static getAll(user_id, handleDBResponse) {
		connection.query(
			`SELECT user.user_id, user.emp_id, user.role, user.username, user.is_active, employee.first_name, employee.last_name
			FROM user INNER JOIN employee ON user.emp_id = employee.emp_id`,
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(null, err);
				}

				console.log("users: ", res);
				result(null, res);
			}
		);
	}

	static findById(user_id, result) {
		connection.query(
			`SELECT user.user_id, user.emp_id, user.role, user.username, user.password, user.is_active, employee.first_name, employee.last_name, department.dept_name FROM user 
			INNER JOIN employee ON user.emp_id = employee.emp_id
			INNER JOIN department ON employee.dept_id = department.dept_id 
			WHERE user_id = ?`,
			[user_id],
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

				// no user found
				result({ kind: "not_found" }, null);
			}
		);
	}

	static findByUsername(username, result) {
		connection.query(
			`SELECT
				e.emp_id,
				e.full_name,
				e.first_name,
				e.last_name,
				e.birthdate,
				e.email,
				e.nic,
				e.marital_status,
				e.dept_id,
				e.contract_id,
				e.status_id,
				e.title_id,
				d.dept_name,
				u.user_id,
				u.username,
				u.password,
				u.role,
				t.job_title,
				c.type contract_type,
				s.type status_type,
				e1.emp_id supervisor_id,
				e1.full_name supervisor,
				p.paygrade_id,
				p.level paygrade
				FROM user u
			INNER JOIN employee e ON e.emp_id = u.emp_id
			INNER JOIN title t ON e.title_id = t.title_id
			INNER JOIN department d ON e.dept_id = d.dept_id
			INNER JOIN contract c ON c.contract_id = e.contract_id
			INNER JOIN status s ON s.status_id = e.status_id
			INNER JOIN paygrade p ON p.paygrade_id = e.paygrade_id
			LEFT OUTER JOIN employee e1 ON e.supervisor_id = e1.emp_id
			WHERE u.username = ?`,
			[username],
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
				// not found user with the user_id
				result({ kind: "not_found" }, null);
			}
		);
	}

	updateById(result) {
		connection.query(
			`UPDATE user 
			SET username = ?, password = ?, role = ? 
			WHERE user_id = ?`,
			[this.username, this.password, this.role, this.user_id],
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

				console.log("Updated user: ", this.toJSON());
				result(null, this.toJSON());
			}
		);
	}

	updatePassword(result) {
		connection.query(
			`UPDATE user SET password = ? WHERE user_id = ?`,
			[this.password, this.user_id],
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

				console.log("Updated user: ", this.toJSON());
				result(null, this.toJSON());
			}
		);
	}

	// Delete user from the database
	static remove(user_id, result) {
		connection.query(
			`DELETE FROM user WHERE user_id = ?`,
			[user_id],
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
	}
}

export default User;
