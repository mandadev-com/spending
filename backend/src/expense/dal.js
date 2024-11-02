const { Items } = require("../dals/index");

// Create a new expense
async function addExpense(userId, name, amount, term, occurrence) {
  try {
    const expenseData = {
      user_id: userId,
      name,
      amount,
      term,
      occurrence,
      direction: "expense", // Set direction to expense
    };
    const expense = await Items.create(expenseData);
    return expense;
  } catch (error) {
    throw error;
  }
}

// Get all expenses for a specific user
async function getExpenses(userId) {
  try {
    const expenses = await Items.find({
      user_id: userId,
      direction: "expense",
    });
    return expenses;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addExpense,
  getExpenses,
};
