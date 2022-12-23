import connection from "../config/db";

class LeaveApplication {
    constructor({
        leave_id ,
        emp_id,
        leave_type,
        date,
        reason,
        status
    })
     {
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
    
    static getByEmployeeID(emp_id, result) {
        connection.query(
            `SELECT * FROM leave_application WHERE emp_id = ?`,
            [emp_id],
            result
        )
    }

    create(result) {
        connection.query(
            `INSERT INTO leave_application
            (
                leave_id,
                emp_id,
                leave_type,
                date,
                reason,
                status
            )
            VALUES
            (?,?,?,?,?,? )`,
            [
                this.leave_id,
                this.emp_id,
                this.leave_type,
                this.date,
                this.reason,
                this.status
            ],
            result
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
                this.status
            ],
            result
        )
    }

    delete(result) {
        connection.query(
            `DELETE FROM leave_application WHERE leave_id = ?`,
            [this.leave_id],
            result
        )
    }
}

export default LeaveApplication;


