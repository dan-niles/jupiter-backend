import connection from "../config/db";

class Department {
    constructor ({
        dept_id,
        dept_name,
        building,
        branch_id
    })
        {
            this.dept_id = dept_id ;
            this.dept_name = dept_name ;
            this.building = building ;
            this.branch_id = branch_id ;
        }

        static getAll(result) {
            connection.query(`SELECT * FROM department`, result);
        }

        static getById(dept_id, result) {
            connection.query(
                `SELECT * FROM department WHERE dept_id = ?`,
                [dept_id],
                result
            )
        }

        static getByBranch(branch_id, result) {
            connection.query(
                `SELECT * FROM department WHERE branch_id = ?`,
                [branch_id],
                result
            )
        }

        create(result) {
            connection.query(
                `INSERT INTO department
                (
                    dept_id,
                    dept_name,
                    building,
                    branch_id
                )
                VALUES
                (?,?,?,? )`,
                [
                    this.dept_id,
                    this.dept_name,
                    this.building,
                    this.branch_id
                ],
                result
            )
        }

        update(result) {
            connection.query(
                `UPDATE department SET
                    dept_name = ?,
                    building = ?,
                    branch_id = ?
                WHERE
                    dept_id = ?`,
                [
                    this.dept_name,
                    this.building,
                    this.branch_id,
                    this.dept_id
                ],
                result
            )
        }

        delete(result) {
            connection.query(
                `DELETE FROM department WHERE dept_id = ?`,
                [this.dept_id],
                result
            )
        }
    }

    export default Department;