import express from "express"
import LeaveCtrl from "../controllers/leave.controller"

const router = express.Router()


router.route("/")
    .get(LeaveCtrl.getAllLeavesByUser)

router.route("/supervisor")
    .get(LeaveCtrl.getLeavesToReviewBySupervisor)