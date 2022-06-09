const prisma = require("../utils/prisma");

const newScreen = async (req, res) => {
  const { number } = req.body;
  const createdScreen = await prisma.screen.create({
    data: {
      number: Number(number),
    },
  });

  res.json({ data: createdScreen });
};

module.exports = {
  newScreen,
};
