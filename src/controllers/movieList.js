const { movie } = require("../utils/prisma");
const prisma = require("../utils/prisma");

// map
const filters = {
  greaterThan: "gt",
  lessThan: "lt",
};

const getMovies = async (req, res) => {
  // get data from the request
  const { runtimeMins, comparison } = req.query;

  // figure out is it less or greater than

  // only add the where clause if request has the query parameters

  const whereData = {};

  if (runtimeMins && comparison) {
    const filter = {};
    const prismaOperator = filters[comparison];
    filter[prismaOperator] = Number(runtimeMins);
    whereData.runtimeMins = filter;
  }

  const movies = await prisma.movie.findMany({
    where: whereData,
    include: {
      screenings: true,
    },
  });
  res.json({ data: movies });
};

const addMovieDetails = async (req, res) => {
  // get data from request - req.body
  const { screenings } = req.body;

  const movieData = {
    title: req.body.title,
    runtimeMins: Number(req.body.runtimeMins),
  };

  if (screenings) {
    movieData.screenings = { create: screenings };
  }

  try {
    const movie = await prisma.movie.create({
      data: movieData,
    });
    res.json({ data: movie });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getMovieByID = async (req, res) => {
  const id = Number(req.params.id);
  const createdMovies = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

  res.json({ movies: createdMovies });

  if (!createdMovies) {
    return res.status(404).json({ error: `movie ${id} not found` });
  }
};

module.exports = {
  getMovies,
  getMovieByID,
  addMovieDetails,
};
