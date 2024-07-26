const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");
const dayjs = require("dayjs");

const prisma = new PrismaClient();
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Get all cafes or cafes by location
app.get("/cafes", async (req, res) => {
  const { location } = req.query;
  let cafes;

  try {
    if (location) {
      cafes = await prisma.cafe.findMany({
        where: { location },
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
});

// Get all employees or employees by cafe
app.get("/employees", async (req, res) => {
  const { cafe } = req.query;
  console.log({ cafe });
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
});

// Create a new cafe
app.post("/cafes", async (req, res) => {
  const { name, description, logo, location } = req.body;

  try {
    const cafe = await prisma.cafe.create({
      data: { name, description, logo, location },
    });
    res.json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new employee
app.post("/employees", async (req, res) => {
  const { name, emailAddress, phoneNumber, gender, cafeId, startDate } =
    req.body;

  const id = "UI" + uuidv4();

  console.log({ id });

  console.log({ create_employee: req.body });

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
    console.log({ error });
    res.status(400).json({ error: error.message });
  }
});

// Update a cafe
app.put("/cafes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, logo, location } = req.body;

  console.log({ id });
  console.log({ cafe_update: req.body });

  try {
    const cafe = await prisma.cafe.update({
      where: { id },
      data: { name, description, logo, location },
    });
    res.json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an employee
app.put("/employees/:id", async (req, res) => {
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
});

// Delete a cafe and its employees
app.delete("/cafes/:id", async (req, res) => {
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
});

// Delete an employee
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { id },
    });
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
