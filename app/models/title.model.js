import connection from "../config/db.js";

class Title {
	constructor(title_id, job_title) {
		this.title_id = title_id;
		this.job_title = job_title;
	}

	create(result) {
		connection.query(
			`INSERT INTO title(job_title)
            VALUES (?)`,
			[this.job_title],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				this.title_id = res.insertId;
				result(null, { ...this });
			}
		);
	}

	static getAll(result) {
		connection.query(`SELECT * FROM title`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				return result(err, null);
			}

			return result(null, res);
		});
	}

	static getById(title_id, result) {
		connection.query(
			`SELECT * FROM title WHERE title_id = ?`,
			[title_id],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				return result(null, res);
			}
		);
	}

	updateById(result) {
		connection.query(
			`UPDATE title SET 
            job_title = ?
            WHERE title_id = ?`,
			[this.job_title, this.title_id],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					return result(err, null);
				}
				return result(null, res);
			}
		);
	}

	static deleteById(title_id, result) {
		connection.query(
			`DELETE FROM title WHERE title_id = ?`,
			[title_id],
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

export default Title;
