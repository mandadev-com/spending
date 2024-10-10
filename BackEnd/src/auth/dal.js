const { User, secret_key } = require("../dals");
const { generateRandomString } = require("../utils");
const jwt = require("jsonwebtoken");

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== password) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    {
      user_id: user._id,
      email: user.email,
      refresh_token: user.refresh_token,
    },
    secret_key,
    { expiresIn: "30d" }
  );
  return token;
}

async function createUser(email, password) {
  const user = await User.create({
    email,
    password,
    refresh_token: generateRandomString(10),
  });
  const token = jwt.sign(
    {
      user_id: user._id,
      email: user.email,
      refresh_token: user.refresh_token,
    },
    secret_key,
    { expiresIn: "30d" }
  );

  return token;
}

async function authorisedRoute(req, res, next) {
  try {
    const user = await validateToken(req.headers["authorization"]);
    req.user = user;
    if (!req.headers["authorization"]) {
      res.status(401).json({ error: "Authorization required" });
    } else {
      next();
    }
  } catch (error) {
    if (error.message === "Invalid Token") {
      res.status(401).json({ error: "Invalid Authorization token" });
    } else {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, secret_key);

    if (!decoded.user_id) {
      return new Error("Invalid token: user_id is missing");
    } else {
      return decoded.user_id;
    }
  } catch (error) {
    console.error("Invalid token error:", error);
    throw new Error("Invalid token");
  }
}

// Get user
async function getUserById(userId) {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

module.exports = {
  authenticateUser,
  createUser,
  authorisedRoute,
  validateToken,
  getUserById,
};
