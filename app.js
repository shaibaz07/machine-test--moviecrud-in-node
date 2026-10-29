const express = require("express");

const app = express();
const cors = require("cors");
const router = require("./router/moviesRouter");

app.use(cors());
app.use(express.json());
app.use("/api/movies",router)

module.exports = app;