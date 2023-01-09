import express from "express";
import cors from "cors";

import validateToken from "./app/middleware/auth.middleware.js";

// Routes
import userRoutes from "./app/routes/user.routes.js";
import loginRoutes from "./app/routes/login.routes.js";
import employeeRoutes from "./app/routes/employee.routes.js";
import orgInfoRoutes from "./app/routes/org_info.routes.js";
import customAttrRoutes from "./app/routes/custom_attributes.routes.js";
import paygradeRoutes from "./app/routes/paygrade.routes.js";
import branchRoutes from "./app/routes/branch.routes.js";
import departmentRoutes from "./app/routes/department.routes.js";
import contractRoutes from "./app/routes/contract.routes.js"
import leaveRoutes from "./app/routes/leave.routes.js"
import titleRoutes from "./app/routes/title.routes.js"
import statusRoutes from "./app/routes/status.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

// App entrypoint
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Jupiter HRM Backend" });
});

// Initializaing login routes
app.use("/api/login", loginRoutes);

// Using authentication for the below
app.use(validateToken);

// Initializaing routes
app.use("/api/user", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/org_info", orgInfoRoutes);
app.use("/api/custom_attributes", customAttrRoutes);
app.use("/api/paygrade", paygradeRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRoutes)
app.use("/api/contract", contractRoutes)
app.use("/api/leave", leaveRoutes)
app.use("/api/title", titleRoutes)
app.use("/api/status", statusRoutes)

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
