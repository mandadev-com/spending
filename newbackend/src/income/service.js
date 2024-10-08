const express = require("express");
const router = express.Router();
const { addIncome, getIncomes } = require("./dal.js");
const { validateToken } = require("../auth/dal.js");

console.log("API routes mounted at /api/income");
// Add an income (POST)
router.post("/add", async (req, res) => {
  const { name, amount, term, occurrence } = req.body;
  const token = req.headers["authorization"]; // Get the token from the headers

  // Validate required fields
  if (!name || !amount || !term || !occurrence) {
    return res.status(400).json({
      error: "All fields (userId, name, amount, term, occurrence) are required",
    });
  }

  try {
    console.log("Token : ", token);
    const user_id = validateToken(token); // Validate the token and get user_id
    console.log("user_id : ", user_id);
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
