import express from "express"
import EmployeeCtrl from "../controllers/employee.controller.js"


const router = express.Router()

router.route("/")
    .get(EmployeeCtrl.getAll)
    .post(EmployeeCtrl.createNew)

router.route("/:id")
    .get(EmployeeCtrl.findById)
    .delete(EmployeeCtrl.deleteOne)
export default router
