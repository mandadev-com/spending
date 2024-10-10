const { Items } = require("../dals/index");

// Delete an item by item ID and user ID
async function deleteItem(userId, itemId) {
  try {
    const result = await Items.findOneAndDelete({
      _id: itemId,
      user_id: userId,
    });
    return result !== null; // Returns true if an Item was deleted, false otherwise
  } catch (error) {
    throw error;
  }
}

module.exports = {
  deleteItem,
};
