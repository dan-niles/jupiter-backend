import express from "express";
import EmployeeCtrl from "../controllers/employee.controller.js";

const router = express.Router();

router.route("/").get(EmployeeCtrl.getAll).post(EmployeeCtrl.createNew);

router
	.route("/:id")
	.get(EmployeeCtrl.findById)
	.delete(EmployeeCtrl.deleteOne)
	.put(EmployeeCtrl.updateOne);

router.route("/department/:dept_id").get(EmployeeCtrl.getByDepartment);

router.route("/count").post(EmployeeCtrl.getCount);

export default router;
