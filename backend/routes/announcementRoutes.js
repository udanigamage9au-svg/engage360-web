const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all announcements (students see this)
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM announcements ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// POST create announcement (admin uses this)
router.post("/add", (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: "Title and message are required" });
  }
  db.query(
    "INSERT INTO announcements (title, message) VALUES (?, ?)",
    [title, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// DELETE announcement (admin uses this)
router.delete("/delete/:id", (req, res) => {
  db.query(
    "DELETE FROM announcements WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;
