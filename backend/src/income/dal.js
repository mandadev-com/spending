const { Items } = require("../dals/index");

// Create a new INcome
async function addIncome(userId, name, amount, term, occurrence) {
  try {
    const incomeData = {
      user_id: userId,
      name,
      amount,
      term,
      occurrence,
      direction: "income", // Set direction to income
    };
    const income = await Items.create(incomeData);
    return income;
  } catch (error) {
    throw error;
  }
}

// Get all Incomes for a specific user
async function getIncomes(userId) {
  try {
    const incomes = await Items.find({ user_id: userId, direction: "income" });
    return incomes;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addIncome,
  getIncomes,
};
