import express from "express"
import LoginCtrl from "../controllers/login.controller.js"

const router = express.Router()

// Authenicating a user
router.route("/")
    .post(LoginCtrl.loginUser)


export default router
