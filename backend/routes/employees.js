const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

// Get all employees or employees by cafe
router.get("/", employeesController.getEmployees);

// Create a new employee
router.post("/", employeesController.createEmployee);

// Update an employee
router.put("/:id", employeesController.updateEmployee);

// Delete an employee
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;
