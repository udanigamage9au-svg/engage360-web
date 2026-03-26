const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 👉 CREATE BOOKING
router.post("/create", (req, res) => {
  const { user_id, room_name, time_slot } = req.body;

  const today = new Date().toISOString().split("T")[0];

  // 🔒 1. CHECK if slot already booked
  const checkQuery = `
    SELECT * FROM room_bookings 
    WHERE room_name = ? AND time_slot = ? AND booking_date = ?
  `;

  db.query(checkQuery, [room_name, time_slot, today], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Slot already booked!" });
    }

    // 🔒 2. CHECK if user already booked today
    const userCheckQuery = `
      SELECT * FROM room_bookings
      WHERE user_id = ? AND booking_date = ?
    `;

    db.query(userCheckQuery, [user_id, today], (err, userResult) => {
      if (err) return res.status(500).json(err);

      if (userResult.length > 0) {
        return res.status(400).json({
          message: "You can only book one study room per day!"
        });
      }

      // ✅ 3. INSERT BOOKING (ONLY if both checks passed)
      const insertQuery = `
        INSERT INTO room_bookings (user_id, room_name, time_slot, booking_date)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertQuery, [user_id, room_name, time_slot, today], (err) => {
        if (err) return res.status(500).json(err);

        // 🎁 4. ADD POINT (+1)
        const updatePoints = `
          UPDATE users SET points = points + 1 WHERE user_id = ?
        `;

        db.query(updatePoints, [user_id]);

        res.json({ message: "Booking successful +1 point " });
      });
    });
  });
});

module.exports = router;