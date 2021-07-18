require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./server/routes/users.routes");
const buddyRoutes = require("./server/routes/buddies.routes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/buddies", buddyRoutes);

app.use(express.static(__dirname + "/build"));

app.listen(PORT, () => console.log("Connected"));