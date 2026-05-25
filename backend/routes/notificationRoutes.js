const express = require("express");
const router = express.Router();
const db = require("../config/db");
 
// GET notifications for a student
router.get("/:user_id", (req, res) => {
  db.query(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
    [req.params.user_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});
 
// POST send notification to ALL students (admin broadcast)
router.post("/send-all", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });
 
  const io = req.app.get("io");
 
  db.query("SELECT user_id FROM users WHERE role = 'student'", (err, students) => {
    if (err) return res.status(500).json({ error: err.message });
    if (students.length === 0) return res.json({ success: true, sent: 0 });
 
    const values = students.map((s) => [s.user_id, message]);
    db.query(
      "INSERT INTO notifications (user_id, message) VALUES ?",
      [values],
      (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
 
        // Emit real-time to each student
        students.forEach((s) => {
          io.to(`user_${s.user_id}`).emit("new_notification", {
            message,
            created_at: new Date(),
          });
        });
 
        res.json({ success: true, sent: students.length });
      }
    );
  });
});
 
// POST send notification to ONE student (used by ethics status update)
router.post("/send-one", (req, res) => {
  const { user_id, message } = req.body;
  if (!user_id || !message) return res.status(400).json({ error: "Missing fields" });
 
  const io = req.app.get("io");
 
  db.query(
    "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
    [user_id, message],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
 
      io.to(`user_${user_id}`).emit("new_notification", {
        message,
        created_at: new Date(),
      });
 
      res.json({ success: true });
    }
  );
});
 
// PUT mark all notifications as read for a student
router.put("/mark-read/:user_id", (req, res) => {
  db.query(
    "UPDATE notifications SET is_read = TRUE WHERE user_id = ?",
    [req.params.user_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});
 
module.exports = router;
 