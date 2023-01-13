import connection from "../config/db.js";

export default class LeaveApplication {
    constructor({
        leave_id,
        emp_id,
        leave_type,
        date,
        reason,
        status
    }) {
        this.leave_id = leave_id;
        this.emp_id = emp_id;
        this.leave_type = leave_type;
        this.date = date;
        this.reason = reason;
        this.status = status;
    }

    static getAll(result) {
        connection.query(`SELECT * FROM leave_application`, result);
    }

    static getById(leave_id, result) {
        connection.query(
            `SELECT * FROM leave_application WHERE leave_id = ?`,
            [leave_id],
            result
        )
    }

    static getBySupervisorId(supervisor_id, handleDBResponse) {

        connection.query(
            `SELECT e.emp_id, first_name, last_name, leave_id, leave_type, reason, date, status FROM employee e INNER JOIN leave_application l ON e.
emp_id = l.emp_id WHERE supervisor_id = ? ORDER BY date`,
            [supervisor_id],
            handleDBResponse
        )
    }

    static getByEmployeeID(emp_id, result) {
        connection.query(
            `SELECT * FROM leave_application WHERE emp_id = ? ORDER BY date`,
            [emp_id],
            result
        )
    }

    create(handleDBResponse) {
        connection.query(
            `INSERT INTO leave_application
            (
                emp_id,
                leave_type,
                date,
                reason,
                status
            )
            VALUES
            (?,?,?,?,? )`,
            [
                this.emp_id,
                this.leave_type,
                this.date,
                this.reason,
                this.status
            ],
            handleDBResponse
        )
    }

    static takeAction(leave_id, action, handleDBResponse) {
        connection.query(
            `
            UPDATE leave_application
            SET status = ?
            WHERE leave_id = ?
            `,
            [action, leave_id],
            handleDBResponse
        )
    }

    update(result) {
        connection.query(
            `UPDATE leave_application
            SET
                leave_id = ?,
                emp_id = ?,
                leave_type = ?,
                date = ?,
                reason = ?,
                status = ?
            WHERE leave_id = ?`,
            [
                this.leave_id,
                this.emp_id,
                this.leave_type,
                this.date,
                this.reason,
                this.status,
            ],
            result
        );
    }

    static delete(leave_id, emp_id, result) {
        connection.query(
            `DELETE FROM leave_application WHERE leave_id = ? and emp_id = ?`,
            [leave_id, emp_id],
            result
        )
    }
}
