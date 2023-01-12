import express from "express"
import ContractCtrl from "../controllers/contract.controller.js"

const router = express.Router()

router.route("/")
    .get(ContractCtrl.getAll)
    .post(ContractCtrl.createNew)

router.route("/:id")
    .get(ContractCtrl.getById)



export default router