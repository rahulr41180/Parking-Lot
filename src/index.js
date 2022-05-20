
const express = require("express");

const app = express();

app.use(express.json());

const FloorController = require("./controllers/floor.controller");
const TicketController = require("./controllers/ticket.controller");
const UserController = require("./controllers/user.controller");

app.use("/floor", FloorController);
app.use("/ticket", TicketController);
app.use("/user", UserController);

module.exports = app;