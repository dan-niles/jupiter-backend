import express from "express";
import cors from "cors";

// Routes
import userRoutes from "./app/routes/user.routes.js";
import loginRoutes from "./app/routes/login.routes.js";

const app = express();

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(
	cors({
		origin: "*",
	})
);

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

// App entrypoint
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Jupiter HRM Backend" });
});

// Initializaing routes
userRoutes(app);
loginRoutes(app);

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
