import express from "express";
import * as reports from "../controllers/reports.controller.js";

const router = express.Router();

router.route("/emp-by-department").post(reports.fetchEmployeesByDepartment);
router.route("/leaves-by-department").post(reports.fetchLeavesByDepartment);
router.route("/grouped-emp").post(reports.fetchGroupedInfo);

export default router;
