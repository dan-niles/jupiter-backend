<<<<<<< HEAD
import connection from "../config/db.js";

class Status {
	constructor(status_id, type) {
		this.status_id = status_id;
		this.type = type;
	}
=======
import connection from '../config/db.js'

export default class Status {
    constructor(status_id, type) {
        this.status_id = status_id;
        this.type = type;
    }
>>>>>>> 84bcc7b (leave controller created.)

	create(result) {
		connection.query(
			`INSERT INTO status(type)
            VALUES (?)`,
<<<<<<< HEAD
			[this.type],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				this.status_id = res.insertId;
				result(null, { ...this });
			}
		);
	}
=======
            [this.type],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }
                this.status_id = res.insertId;
                result(null, { ...this });
            }
        )
    }
>>>>>>> 84bcc7b (leave controller created.)

	static getAll(result) {
		connection.query(`SELECT * FROM status`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				return result(err, null);
			}

			return result(null, res);
		});
	}

	static getById(status_id, result) {
		connection.query(
			`SELECT * FROM status WHERE status_id = ${status_id}`,
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				return result(null, res);
			}
		);
	}

<<<<<<< HEAD
	updateById(result) {
		connection.query(
			`UPDATE status SET 
=======

    static getById(status_id, result) {
        connection.query(
            `SELECT * FROM status WHERE status_id = ${status_id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null)
                }
                return result(null, res)
            }
        )
    }

    updateById(result) {
        connection.query(
            `UPDATE status SET 
>>>>>>> 84bcc7b (leave controller created.)
            type = ?
            WHERE status_id = ?`,
			[this.type, this.status_id],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				return result(null, res);
			}
		);
	}

<<<<<<< HEAD
	static removeById(status_id, result) {
		connection.query(
			`DELETE FROM status WHERE status_id = ${status_id}`,
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

export default Status;
=======
}
>>>>>>> 84bcc7b (leave controller created.)
