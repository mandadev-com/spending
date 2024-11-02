const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoutes = require("./src/auth/service");
const expenseRoutes = require("./src/expense/service");
const incomeRoutes = require("./src/income/service");
const financeRoutes = require("./src/finance/service");
const deleteRoutes = require("./src/delete/service");

app.use(
  "/assets",
  express.static(path.join(__dirname, "../frontend/dist/assets"))
);

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/delete", deleteRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
