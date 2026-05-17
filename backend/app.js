const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/routes/authRoutes")
const userRoutes = require("./modules/user/routes/userRoutes")
const customerRoutes = require("./modules/customers/routes/customerRoute");
const serviceRoute = require ("./modules/services/routes/serviceRoute.js")
const planRoute = require ("./modules/plans/routes/planRoute.js")
const subscriptionRoute = require("./modules/subscriptions/routes/subscriptionRoute.js")
const paymentRoute = require("./modules/payments/routes/paymentRoute.js")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
app.use("/api/customers",customerRoutes )
app.use("/api/services",serviceRoute )
app.use("/api/plans",planRoute )
app.use("/api/subscriptions",subscriptionRoute )
app.use("/api/payments",paymentRoute )

module.exports = app;
