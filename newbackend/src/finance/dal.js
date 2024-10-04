const { Items } = require("../dals/index");

// Get all recurring items for a specific user
async function getRecurringItems(user_id) {
  try {
    console.log("user_id is  : ", user_id, " Type : ", typeof user_id);
    const recurringItems = await Items.find({
      user_id: user_id,
      occurrence: "recurring",
    });
    return recurringItems;
  } catch (error) {
    throw error;
  }
}

// Get all term items for a specific user
async function getTermItems(userId, term) {
  try {
    const termItems = await Items.find({ user_id: userId, term: term });

    return termItems;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRecurringItems,
  getTermItems,
};
