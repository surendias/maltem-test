const express = require("express");
const router = express.Router();
const cafesController = require("../controllers/cafesController");

// Get all cafes or cafes by location
router.get("/", cafesController.getCafes);

// Create a new cafe
router.post("/", cafesController.createCafe);

// Update a cafe
router.put("/:id", cafesController.updateCafe);

// Delete a cafe and its employees
router.delete("/:id", cafesController.deleteCafe);

module.exports = router;
