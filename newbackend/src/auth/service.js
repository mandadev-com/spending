const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  createUser,
  validateToken,
  getUserById,
} = require("./dal");

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const token = await authenticateUser(email, password);
    res.json({ token: token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const token = await createUser(email, password);
    res.json({ token: token });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Adjusted route to get account details
router.get("/account", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const user_id = validateToken(token);
    const user = await getUserById(user_id); // Make sure you have this function defined to fetch user
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user details
    res.json({
      user_id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
