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
}
