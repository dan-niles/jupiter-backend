import connection from "../config/db.js"

class User {
	constructor({ user_id, emp_id, role, username, password }) {
		this.user_id = user_id
		this.emp_id = emp_id
		this.role = role
		this.username = username
		this.password = password
	}

	toJSON() {
		return {
			user_id: this.user_id,
			emp_id: this.emp_id,
			role: this.role,
			username: this.username
		}
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
			[
				this.emp_id,
				this.role,
				this.username,
				this.password
			],
			(err, res) => {
				if (err) {
					console.log(err)
					return result(err, null)
				}

				this.user_id = res.insertId

				result(null, this.toJSON())
			}
		)
	}

	// Retrieve users from the database
	static getAll(result) {

		connection.query(
			`SELECT 
			user_id,
			emp_id,
			role,
			username 
			FROM user`,
			(err, res) => {
				if (err) {
					console.log("error: ", err)
					return result(null, err)
				}

				console.log("users: ", res)
				result(null, res)
			})
	}

	static findById(user_id, result) {
		connection.query(
			`SELECT user_id, emp_id, role, username FROM user WHERE user_id = ?`,
			[user_id],
			(err, res) => {
				if (err) {
					console.log("Error: ", err)
					result(err, null)
					return
				}

				if (res.length) {
					console.log("Found user: ", res[0])
					result(null, res[0])
					return
				}

				// no user found
				result({ kind: "not_found" }, null)
			}
		)
	}

	static findByUsername(username, result) {
		connection.query(
			`SELECT * FROM user
			INNER JOIN employee ON employee.emp_id = user.emp_id 
			INNER JOIN title ON employee.title_id = title.title_id 
			WHERE username = ?`,
			[username],
			(err, res) => {
				if (err) {
					console.log("Error: ", err)
					result(err, null)
					return
				}

				if (res.length) {
					console.log(res)
					result(null, res[0])
					return
				}

				// not found user with the user_id
				result({ kind: "not_found" }, null)
			}
		)
	}

	updateById(result) {
		connection.query(
			`UPDATE user SET
				role = ?'
			WHERE
				user_id = ?
			`,
			[this.role, this.user_id],
			(err, res) => {
				if (err) {
					console.log("Error: ", err)
					result(null, err)
					return
				}

				if (res.affectedRows == 0) {
					// not found user with the user_id
					result({ kind: "not_found" }, null)
					return
				}

				console.log("Updated user: ", this.toJSON())
				result(null, this.toJSON())
			}
		)
	}

	// Delete user from the database
	static remove(user_id, result) {
		connection.query(
			`DELETE FROM user WHERE user_id = ?`,
			[user_id],
			(err, res) => {
				if (err) {
					console.log("error: ", err)
					result(null, err)
					return
				}

				if (res.affectedRows == 0) {
					// not found user with the user_id
					result({ kind: "not_found" }, null)
					return
				}

				console.log("Deleted user with user_id: ", user_id)
				result(null, res)
			}
		)
	}
}

export default User
