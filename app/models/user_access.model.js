import connection from "../config/db.js";

class UserAccess {
	constructer(role, access_level) {
		this.role = role;
		this.access_level = access_level;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM user_access`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				return result(err, null);
			}

			return result(null, res);
		});
	}

	static getByRole(role, result) {
		connection.query(
			`SELECT * FROM user_access WHERE role = ?`,
			[role],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				return result(null, res);
			}
		);
	}

	static getByAccessLevel(role, access_level, result) {
		connection.query(
			`SELECT * FROM user_access WHERE role = ? AND access_level = ?`,
			[role, access_level],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				return result(null, res);
			}
		);
	}
}

export default UserAccess;
