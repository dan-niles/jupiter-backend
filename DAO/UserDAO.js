let connection;

export default class UserDAO {
    static async injectDB(conn) {

        if (connection) {
            return
        }
        connection = conn
    }

    static async addUser() {
        connection.query("INSERT INTO users (name, email) VALUES ('Handysof Inc.', 'handysof@outlook.com')")
    }


}