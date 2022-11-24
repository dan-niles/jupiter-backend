import express from "express";
import cors from "cors";

// Routes
import userRoutes from "./app/routes/user.routes.js";

const app = express();

var corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

// Test route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Jupiter HRM Backend" });
});

userRoutes(app);

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
