const express = require("express");
const router = express.Router();
const { deleteItem } = require("./dal.js");
const { authorisedRoute } = require("../auth/dal.js");

// Delete an item (DELETE)
router.delete("/:itemId", authorisedRoute, async (req, res) => {
  const { itemId } = req.params;
  const user_id = req.user;

  try {
    const result = await deleteItem(user_id, itemId);

    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Item deleted successfully." });
    } else {
      res.status(404).json({ error: "Item not found." });
    }
  } catch (error) {
    console.error("Error deleting Item: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
