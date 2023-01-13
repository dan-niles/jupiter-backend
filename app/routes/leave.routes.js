import express from "express";
import LeaveCtrl from "../controllers/leave.controller.js";

const router = express.Router();

router.route("/balance")
	.post(LeaveCtrl.getLeaveBalance);
router.route("/total")
	.post(LeaveCtrl.getAllocatedLeaves);
router.route("/supervisor")
	.post(LeaveCtrl.reviewLeave)


router.route("/")
	.get(LeaveCtrl.getAllLeavesByUser)

router.route("/:id")
	.get(LeaveCtrl.getAllLeavesByUser)
	.post(LeaveCtrl.applyLeave)

router.route("/:emp_id/:leave_id")
	.delete(LeaveCtrl.deleteLeave);


router
	.route("/supervisor/:id")
	.get(LeaveCtrl.getLeavesToReviewBySupervisor)


export default router;
