import express from "express";
import DepartmentCtrl from "../controllers/department.controller.js";

const router = express.Router();

router.route("/")
	.get(DepartmentCtrl.getAll)
	.post(DepartmentCtrl.findById);

export default router;
