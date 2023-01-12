import connection from "../config/db.js";

class LeaveBalance {
	constructer({ emp_id, year, annual, casual, maternity, no_pay }) {
		this.emp_id = emp_id;
		this.year = year;
		this.annual = annual;
		this.casual = casual;
		this.maternity = maternity;
		this.no_pay = no_pay;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM leave_balance`, result);
	}

	static getById(emp_id, result) {
		connection.query(
			`SELECT * FROM leave_balance WHERE emp_id = ?`,
			[emp_id],
			result
		);
	}

	create(result) {
		connection.query(
			`INSERT INTO leave_balance
            (
                emp_id,
                year,
                annual,
                casual,
                maternity,
                no_pay
            )
            VALUES
            (?,?,?,?,?,? )`,
			[
				this.emp_id,
				this.year,
				this.annual,
				this.casual,
				this.maternity,
				this.no_pay,
			],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE leave_balance SET
            year = ?,
            annual = ?,
            casual = ?,
            maternity = ?,
            no_pay = ?
            WHERE emp_id = ?`,
			[
				this.year,
				this.annual,
				this.casual,
				this.maternity,
				this.no_pay,
				this.emp_id,
			],
			result
		);
	}

	delete(result) {
		connection.query(
			`DELETE FROM leave_balance WHERE emp_id = ?`,
			[this.emp_id],
			result
		);
	}

	static async getCount(emp_id, leave_type, result) {
		connection.query(
			"SELECT `FN_no_of_leaves`(?, ?) AS `FN_no_of_leaves`;",
			[emp_id, leave_type],
			result
		);
	}

	static async getTotal(emp_id, leave_type, result) {
		connection.query(
			"SELECT `FN_alloc_leaves`(?, ?) AS `FN_alloc_leaves`;",
			[emp_id, leave_type],
			result
		);
	}
}

export default LeaveBalance;
