const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ─── ETHICS APPLICATIONS ───────────────────────────────────────

// Student submits application
router.post("/ethics/submit", (req, res) => {
  const { user_id, student_name, project_title, faculty, involves_humans, methodology } = req.body;
  if (!user_id || !project_title || !faculty) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `INSERT INTO ethics_applications 
    (user_id, student_name, project_title, faculty, involves_humans, methodology) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [user_id, student_name, project_title, faculty, involves_humans ? 1 : 0, methodology], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, application_id: result.insertId });
  });
});

// Student gets their own applications
router.get("/ethics/my/:user_id", (req, res) => {
  db.query(
    "SELECT * FROM ethics_applications WHERE user_id = ? ORDER BY created_at DESC",
    [req.params.user_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Admin gets ALL applications
router.get("/ethics/all", (req, res) => {
  db.query(
    "SELECT * FROM ethics_applications ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Admin updates status — WITH auto notification
router.put("/ethics/update/:id", (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Pending", "Under Review", "Approved", "Rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const io = req.app.get("io");

  // Get application details first
  db.query(
    "SELECT * FROM ethics_applications WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows.length) return res.status(404).json({ error: "Not found" });

      const app = rows[0];

      // Update status
      db.query(
        "UPDATE ethics_applications SET status = ? WHERE id = ?",
        [status, req.params.id],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });

          // Auto-notify the student
          const message = `Your ethics application "${app.project_title}" has been updated to: ${status}`;
          db.query(
            "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
            [app.user_id, message],
            () => {
              io.to(`user_${app.user_id}`).emit("new_notification", {
                message,
                created_at: new Date(),
              });
            }
          );

          res.json({ success: true });
        }
      );
    }
  );
});

// ─── RESEARCH COUNCIL ──────────────────────────────────────────

// Get all members
router.get("/council", (req, res) => {
  db.query("SELECT * FROM research_council ORDER BY id", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Admin adds member
router.post("/council/add", (req, res) => {
  const { name, role, department, interests } = req.body;
  db.query(
    "INSERT INTO research_council (name, role, department, interests) VALUES (?, ?, ?, ?)",
    [name, role, department, interests],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// Admin deletes member
router.delete("/council/delete/:id", (req, res) => {
  db.query("DELETE FROM research_council WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ─── RESEARCH OPPORTUNITIES ────────────────────────────────────

// Get all opportunities
router.get("/opportunities", (req, res) => {
  db.query(
    "SELECT * FROM research_opportunities ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Admin posts opportunity
router.post("/opportunities/add", (req, res) => {
  const { tag, title, description, deadline } = req.body;
  if (!tag || !title) return res.status(400).json({ error: "Missing fields" });
  db.query(
    "INSERT INTO research_opportunities (tag, title, description, deadline) VALUES (?, ?, ?, ?)",
    [tag, title, description, deadline],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// Admin deletes opportunity
router.delete("/opportunities/delete/:id", (req, res) => {
  db.query("DELETE FROM research_opportunities WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;