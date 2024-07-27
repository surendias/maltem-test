const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

// Import routes
const cafesRoutes = require("./routes/cafes");
const employeesRoutes = require("./routes/employees");

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Use routes
app.use("/cafes", cafesRoutes);
app.use("/employees", employeesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
