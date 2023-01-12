import express from "express";
import LeaveCtrl from "../controllers/leave.controller.js";

const router = express.Router();

router.route("/").get(LeaveCtrl.getAllLeavesByUser).post(LeaveCtrl.applyLeave);

router.route("/:id").delete(LeaveCtrl.deleteLeave);

router
	.route("/supervisor")
	.get(LeaveCtrl.getLeavesToReviewBySupervisor)
	.post(LeaveCtrl.reviewLeave);

router.route("/balance").post(LeaveCtrl.getLeaveBalance);
router.route("/total").post(LeaveCtrl.getAllocatedLeaves);

export default router;
