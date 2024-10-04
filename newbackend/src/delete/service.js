const express = require("express");
const router = express.Router();
const { deleteItem } = require("./dal.js");
const { validateToken } = require("../auth/dal.js");

console.log("API routes mounted at /api/delete");
// Delete an item (DELETE)
router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const token = req.headers["authorization"]; // Get the token from the headers

  try {
    console.log("Token : ", token);
    const user_id = validateToken(token); // Validate the token and get user_id
    console.log("user_id : ", user_id);
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
