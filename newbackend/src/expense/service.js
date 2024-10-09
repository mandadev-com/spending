const express = require("express");
const router = express.Router();
const { addExpense, getExpenses } = require("./dal.js");
const { authorisedRoute } = require("../auth/dal.js");

// Add an expense (POST)
router.post("/add", authorisedRoute, async (req, res) => {
  const { name, amount, term, occurrence } = req.body;
  const user_id = req.user;

  // Validate required fields
  if (!name || !amount || !term || !occurrence) {
    return res.status(400).json({
      error: "All fields ( name, amount, term, occurrence) are required",
    });
  }

  try {
    await addExpense(user_id, name, amount, term, occurrence);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

// Get all expenses (GET) //NOT USED
router.get("/:userId/expenses", async (req, res) => {
  const userId = req.params.userId;

  // Validate userId is provided
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const expenses = await getExpenses(userId);
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error getting expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
