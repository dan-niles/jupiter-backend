import Contract from "../models/contract.model.js";

export default class ContractCtrl {

    static async getAll(req, res) {

        Contract.getAll((err, result) => {
            if (err) {
                return res.status(500)
                    .send({ error: "Something went wrong on our side." })
            }

            return res.send(result)
        })
    }

    static async getById(req, res) {

        const contract_id = req.params.id

        Contract.getById(contract_id, (err, result) => {
            if (err) {
                return res.status(500)
                    .send({ error: "Something went wrong on our side." })
            }

            if (result.length === 0) {
                return res.status(404)
                    .send({ error: "Given contract ID does not exists." })
            }

            return res.send(result[0])
        })
    }

    static async createNew(req, res) {

        const { contract_type } = req.body

        const contract = new Contract(null, contract_type)

        contract.createNew((err, res) => {

            if (err) {
                return res.status(500)
                    .send({ error: "Something went wrong on our side." })
            }

            return res.send(result)
        })
    }

}