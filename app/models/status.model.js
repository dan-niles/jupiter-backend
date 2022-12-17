import connection from '../config/db.js' 

class Status {
    constructor(status_id,type) {
        this.status_id = status_id;
        this.type = type;
    }

    create(result) {
        connection.query(
            `INSERT INTO status(type)
            VALUES (?)`,
            [this.type],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }
                this.status_id = res.insertId;
                result(null, {...this});
            }
        )
    }


    static getAll(result) {
        connection.query(
            `SELECT * FROM status`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }

                return result(null, res)
            }
        )
    }


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
            type = ?
            WHERE status_id = ?`,
            [
                this.type,
                this.status_id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }
                return result(null, res);
            }
        )
    }

    static removeById(status_id, result) {
        connection.query(
            `DELETE FROM status WHERE status_id = ${status_id}`,
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

module.exports = status