const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Make io accessible in routes
app.set("io", io);

app.use(cors());
app.use(express.json());

require("./config/db");

const helmet = require("helmet");
app.use(helmet());
app.disable("x-powered-by");

// ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookingRoutes = require("./routes/bookings");
app.use("/api/bookings", bookingRoutes);

const checkinRoutes = require("./routes/checkinRoutes");
app.use("/api", checkinRoutes);

const researchRoutes = require("./routes/researchRoutes");
app.use("/api/research", researchRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

const announcementRoutes = require("./routes/announcementRoutes"); // ← NEW
app.use("/api/announcements", announcementRoutes);                 // ← NEW

// SOCKET.IO
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Student registers with their user_id
  socket.on("register", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));