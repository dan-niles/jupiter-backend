import connection from "../config/db"

export default class Department {

    constructor(dept_id, dept_name, building, branch_id) {
        this.dept_id = dept_id
        this.dept_name = dept_name
        this.building = building
        this.branch_id = branch_id
    }

    static getAll(handleDBResponse) {
        connection.query(
            "SELECT * FROM department",
            handleDBResponse
        )
    }

    static getById(dept_id, handleDBResponse) {
        connection.query(
            "SELECT * FROM department WHERE dept_id = ?",
            [dept_id],
            handleDBResponse
        )
    }

    createNew(handleDBResponse) {
        connection.query(
            `INSERT INTO department(dept_name, building, branch_id)
            VALUES (?, ?, ?)`,
            [this.dept_name, this.building, this.branch_id],
            handleDBResponse
        )
    }

    updateById(handleDBResponse) {
        connection.query(
            `UPDATE department SET
            dept_name = ?, building = ?, branch_id = ?
            WHERE dept_id = ?`,
            [this.dept_name, this.building, this.branch_id, this.dept_id]
        )
    }

    delete(dept_id, handleDBResponse) {
        connection.query(
            `DELETE FROM department WHERE dept_id = ?`,
            [dept_id],
            handleDBResponse
        )
    }
}
