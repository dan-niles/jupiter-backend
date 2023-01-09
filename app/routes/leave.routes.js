import express from "express"
import LeaveCtrl from "../controllers/leave.controller.js"

const router = express.Router()


router.route("/")
    .get(LeaveCtrl.getAllLeavesByUser)
    .post(LeaveCtrl.applyLeave)

router.route("/:id")
    .delete(LeaveCtrl.deleteLeave)

router.route("/supervisor")
    .get(LeaveCtrl.getLeavesToReviewBySupervisor)
    .post(LeaveCtrl.reviewLeave)


export default router