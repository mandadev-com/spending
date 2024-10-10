const express = require("express");
const router = express.Router();
const { getRecurringItems, getTermItems } = require("./dal.js");
const moment = require("moment");
const { authorisedRoute } = require("../auth/dal.js");

router.get("/:term", authorisedRoute, async (req, res) => {
  let term = req.params.term;
  const user_id = req.user;

  if (term === "current") {
    term = moment().format("YYYY-MM");
  }

  if (!req.headers["authorization"]) {
    return res.status(400).json({
      status: false,
      error: "Authorization is Required",
    });
  }

  try {
    if (!user_id) {
      return res.status(401).json({
        status: false,
        error: "Finance ValidateToken : Invalid Token",
      });
    }

    const reccuringItems = await getRecurringItems(user_id);
    const termItems = await getTermItems(user_id, term);

    let items = [];
    let totalIncome = 0;
    let totalExpenses = 0;
    let income = [];
    let expenses = [];

    reccuringItems.forEach((item) => {
      item._id = item._id.toString();
      item.user_id = item.user_id.toString();
      items.push(item);
    });

    termItems.forEach((item) => {
      item._id = item._id.toString();
      item.user_id = item.user_id.toString();
      items.push(item);
    });

    items.forEach((item) => {
      if (item.direction === "income") {
        totalIncome += item.amount;
        income.push(item);
      } else if (item.direction === "expense") {
        totalExpenses += item.amount;
        expenses.push(item);
      }
    });
    const total = totalIncome - totalExpenses;

    res.status(200).json({
      status: true,
      total_income: totalIncome,
      total_expenses: totalExpenses,
      total: total,
      income: income,
      expenses: expenses,
    });
  } catch (error) {
    console.error("Error fetching finance data:", error);
    res.status(500).json({
      status: false,
      error: "Finance Route : Internal Server Error",
    });
  }
});

module.exports = router;
