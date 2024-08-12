const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config.json");
const userRoutes = require("./routes/user.routes");
const userIdCardRoutes = require("./routes/userIdCard.routes");

mongoose
  .connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/user", userRoutes);
app.use("/api/userIdCard", userIdCardRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
