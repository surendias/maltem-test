const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");

exports.getCafes = async (req, res) => {
  const { location } = req.query;
  let cafes;

  try {
    if (location) {
      cafes = await prisma.cafe.findMany({
        where: {
          location: {
            contains: location,
          },
        },
      });
    } else {
      cafes = await prisma.cafe.findMany();
    }

    if (cafes.length === 0) {
      return res.json([]);
    }

    const cafesWithEmployeeCount = await Promise.all(
      cafes.map(async (cafe) => {
        const employeeCount = await prisma.employee.count({
          where: { cafeId: cafe.id },
        });
        return {
          id: cafe.id,
          name: cafe.name,
          description: cafe.description,
          employees: employeeCount,
          logo: cafe.logo || "",
          location: cafe.location,
        };
      })
    );

    cafesWithEmployeeCount.sort((a, b) => b.employees - a.employees);

    res.json(cafesWithEmployeeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCafe = async (req, res) => {
  const { name, description, logo, location } = req.body;

  try {
    const cafe = await prisma.cafe.create({
      data: { name, description, logo, location },
    });
    res.json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCafe = async (req, res) => {
  const { id } = req.params;
  const { name, description, logo, location } = req.body;

  try {
    const cafe = await prisma.cafe.update({
      where: { id },
      data: { name, description, logo, location },
    });
    res.json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCafe = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.deleteMany({
      where: { cafeId: id },
    });
    await prisma.cafe.delete({
      where: { id },
    });
    res.json({ message: "Cafe and its employees deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
