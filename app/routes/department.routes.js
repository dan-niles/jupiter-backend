import express from "express";
import * as department from "../controllers/department.controller.js";

const router = express.Router();

router.route("/").get(department.findAll).post(department.create);

router
	.route("/:dept_id")
	.get(department.findOne)
	.put(department.update)
	.delete(department.remove);

export default router;
