const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const createdMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.json({ movies: createdMovies });
};

const addMovieDetails = async (req, res) => {
  //   const { title, runtimeMins } = req.body;
  const createdMovie = await prisma.movie.create({
    data: {
      //   title,
      //   runtimeMins
      title: req.body.title,
      runtimeMins: Number(req.body.runtimeMins),
    },
  });

  res.json({ data: createdMovie });
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
