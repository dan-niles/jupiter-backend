import express from "express";
import * as reports from "../controllers/reports.controller.js";

const router = express.Router();

router.route("/emp-by-department").post(reports.fetchEmployeesByDepartment);

export default router;
