import express from "express"
import cors from "cors"

// Routes
import userRoutes from "./app/routes/user.routes.js"
import loginRoutes from "./app/routes/login.routes.js"
import validateToken from "./app/middleware/auth.middleware.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

// App entrypoint
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Jupiter HRM Backend" })
})

app.use("/login", loginRoutes)

// Using authentication for the below 
app.use(validateToken)


// Initializaing routes
app.use("/user", userRoutes)

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`)
})
