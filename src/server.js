const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

// Add middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
const customerRouter = require("./routers/customer");
app.use("/customer", customerRouter);
const movieRouter = require("./routers/movieList");
app.use("/movies", movieRouter);
const screenRouter = require("./routers/screen");
app.use("/screen", screenRouter);
const ticketRouter = require("./routers/ticket");
app.use("/ticket", ticketRouter);

module.exports = app;
