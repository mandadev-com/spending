const express = require("express");
const router = express.Router();
const { addIncome, getIncomes } = require("./dal.js");
const { authorisedRoute } = require("../auth/dal.js");

console.log("API routes mounted at /api/income");
// Add an income (POST)
router.post("/add", authorisedRoute, async (req, res) => {
  const { name, amount, term, occurrence } = req.body;
  const user_id = req.user;
  console.log("Income - user_id : ", user_id);

  // Validate required fields
  if (!name || !amount || !term || !occurrence) {
    return res.status(400).json({
      error: "All fields ( name, amount, term, occurrence) are required",
    });
  }

  try {
    await addIncome(user_id, name, amount, term, occurrence);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all incomes (GET) //NOT USED
router.get("/:userId/incomes", async (req, res) => {
  const userId = req.params.userId;

  try {
    const incomes = await getIncomes(userId);
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error getting Incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
