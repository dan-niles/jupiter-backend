import connection from "../config/db.js"

class Branch {

    constructor(branch_id, branch_name, address, country) {
        this.branch_id = branch_id
        this.branch_name = branch_name
        this.address = address
        this.country = country
    }

    create(result) {
        connection.query(
            `INSERT INTO branch
            (
                branch_name,
                address,
                country
            ) 
                VALUES (?, ?, ?)`,
            [this.branch_name, this.address, this.country],
            (err, res) => {
                if (err) {
                    console.log("error: ", err)
                    return result(err, null)
                }

                this.branch_id = res.insertId
                result(null, { ...this })
            }
        )
    }

    static getAll(result) {
        connection.query(
            `SELECT * FROM branch`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err)
                    return result(err, null)
                }

                return result(null, res)
            }
        )
    }

    static getById(branch_id, result) {
        connection.query(
            `SELECT * FROM branch WHERE branch_id = ?`,
            [branch_id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err)
                    return result(err, null)
                }
                return result(null, res)
            }
        )
    }

    updateById(result) {
        connection.query(
            `UPDATE branch SET 
                branch_name = ?
                country = ?
                address = ?
                WHERE branch_id = ?
            `,
            [
                this.branch_name,
                this.country,
                this.address,
                this.branch_id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err)
                    return result(err, null)
                }
                return result(null, res)
            }
        )
    }
}