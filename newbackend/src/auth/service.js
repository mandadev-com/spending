const express = require("express");
const router = express.Router();
const { authenticateUser, createUser } = require("./dal");

router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);
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

  console.log(`${req.method} request to ${req.url}`);
  console.log("Request body:", req.body);
  try {
    const token = await createUser(email, password);
    res.json({ token: token });
    console.log("Success creating user:", token);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
