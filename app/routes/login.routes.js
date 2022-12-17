import express from "express"
import * as login from "../controllers/login.controller.js"

const router = express.Router()

// Authenicating a user
router.post("/", login.authenticate)


export default router
