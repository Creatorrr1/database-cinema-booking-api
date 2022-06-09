const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  console.log("BODY: ", req.body);

  createdTicket = await prisma.ticket.create({
    data: {
      screeningId,
      customerId,
    },
  });

  res.json({ data: createdTicket });
};

module.exports = {
  createTicket,
};
