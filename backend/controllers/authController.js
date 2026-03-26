const db = require("../config/db");

exports.signup = (req, res) => {
  const { full_name, email, student_id, password, confirmPassword, role } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check university email
  if (!email.endsWith("@stu.uni.edu")) {
    return res.status(400).json({ message: "Use university email (@stu.uni.edu)" });
  }

  // Check if user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";

  db.query(checkUserQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert new user
    const insertQuery = `
      INSERT INTO users (full_name, email, student_id, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [full_name, email, student_id, password, role || "student"],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.json({ message: "User registered successfully" });
      }
    );
  });
};

//  LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check user
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    res.json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        points: user.points,
      },
    });
  });
};

// GET ALL USERS (for testing)
exports.getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};