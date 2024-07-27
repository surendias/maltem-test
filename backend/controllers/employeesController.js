const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");

exports.getEmployees = async (req, res) => {
  const { cafe } = req.query;
  let employees;

  try {
    if (cafe) {
      employees = await prisma.employee.findMany({
        where: {
          cafe: {
            id: cafe,
          },
        },
        include: {
          cafe: true,
        },
      });
    } else {
      employees = await prisma.employee.findMany({
        include: {
          cafe: true,
        },
      });
    }

    const currentDate = dayjs();
    employees = employees
      .map((employee) => ({
        id: employee.id,
        name: employee.name,
        emailAddress: employee.emailAddress,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        startDate: employee.startDate,
        daysWorked: currentDate.diff(dayjs(employee.startDate), "day"),
        cafe: employee.cafe ? employee.cafe.name : "",
      }))
      .sort((a, b) => b.daysWorked - a.daysWorked);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, emailAddress, phoneNumber, gender, cafeId, startDate } =
    req.body;

  const id = "UI" + uuidv4();

  try {
    const employee = await prisma.employee.create({
      data: {
        id,
        name,
        emailAddress,
        phoneNumber,
        gender,
        cafeId,
        startDate: new Date(startDate),
      },
    });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, emailAddress, phoneNumber, gender, cafeId, startDate } =
    req.body;

  try {
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        name,
        emailAddress,
        phoneNumber,
        gender,
        cafeId,
        startDate: new Date(startDate),
      },
    });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { id },
    });
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
