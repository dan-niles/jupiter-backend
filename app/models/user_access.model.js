import connection from "../config/db";

class Useraccess {
    constructer(role, access_level){
        this.role = role;
        this.access_level = access_level;
    }

    create(result){
        connection.query(
            `INSERT INTO user_access(role, access_level)
                VALUES (${this.access_level})`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);

                    return result(err, null);
                }

                this.role = res.insertId
                result(null, { ...this })
            }
        )
    }

    static getAll(result){
        connection.query(
            `SELECT * FROM user_access`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }

                return result(null, res)
            }
        )
    }

    static getById(role, result){
        connection.query(
            `SELECT * FROM user_access WHERE role = ${role}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null)
                }
                return result(null, res)
            }
        )   
    }

    updateById(result){
        connection.query(
            `UPDATE user_access SET 
            access_level = ${this.access_level} 
            WHERE role = ${this.role}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }

                return result(null, res)
            }
        )
    }

    static deleteById(role, result){
        connection.query(
            `DELETE FROM user_access WHERE role = ${role}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }

                return result(null, res)
            }
        )
    } 
}

export default Useraccess;