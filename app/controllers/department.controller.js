import Department from "../models/department.model";

export default class DepartmentCtrl {


    static async getAll(req, res) {
        Department.getAll((err, result) => {
            if (err) {
                console.log(err)
                return res
                    .status(500)
                    .send({
                        error: "Something went wrong on our side."
                    })
            }

            return res.send(result)
        })
    }

    static async findById(req, res) {

        const dept_id = req.params.id
        Department.getById(dept_id, (err, result) => {
            if (err) {
                return res.status(500)
                    .send({
                        error: "Something went wrong on our side."
                    })
            }

        })
    }
};
