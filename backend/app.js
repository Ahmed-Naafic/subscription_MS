const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/routes/authRoutes")
const userRoutes = require("./modules/user/routes/userRoutes")
const customerRoutes = require("./modules/customers/routes/customerRoute.js");
const serviceRoute = require ("./modules/services/routes/serviceRoute.js")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
app.use("/api/customers",customerRoutes )
app.use("/api/services",customerRoutes )

module.exports = app;
