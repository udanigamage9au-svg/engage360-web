const express = require("express");
const cors = require("cors");
require("dotenv").config();

// CREATE APP FIRST
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// CONNECT DATABASE
require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookingRoutes = require("./routes/bookings");
app.use("/api/bookings", bookingRoutes);

const checkinRoutes = require("./routes/checkinRoutes");
app.use("/api", checkinRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});