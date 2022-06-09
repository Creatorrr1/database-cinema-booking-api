const express = require("express");
// const { createMovies } = require("../controllers/movieList");
const prisma = require("../utils/prisma");

const router = express.Router();

const {
  getMovies,
  getMovieByID,
  addMovieDetails,
} = require("../controllers/movieList");

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4000/customer/register
// router.post("/movies", createMovies);
router.get("/", getMovies);

router.get("/:id", getMovieByID);

router.post("/", addMovieDetails);

module.exports = router;
