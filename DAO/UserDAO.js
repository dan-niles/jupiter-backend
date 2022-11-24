let connection;

export default class UserDAO {
	static async injectDB(conn) {
		if (connection) {
			return;
		}
		connection = conn;
	}

	static async addUser() {
		connection.query(
			"INSERT INTO employee (emp_id, full_name, email) VALUES ('00003', 'Test', 'test@test')"
		);
	}

	static async getEmployees() {
		connection.query("SELECT * FROM employee", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
		});
	}
}
