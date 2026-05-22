const db = require("../config/db");

exports.checkInFacility = (req, res) => {
  const { user_id, facility_name } = req.body;

  const today = new Date().toISOString().split("T")[0];

  //  Check how many check-ins today
  const checkTodayQuery = `
    SELECT COUNT(*) AS count 
    FROM checkins 
    WHERE user_id = ? AND checkin_date = ?
  `;

  db.query(checkTodayQuery, [user_id, today], (err, results) => {
    if (err) return res.status(500).json(err);

    // Limit reached
    if (results[0].count >= 2) {
      return res.status(400).json({
        message: "Daily limit reached (2 check-ins)"
      });
    }

    //  Insert check-in
    const insertQuery = `
      INSERT INTO checkins (user_id, facility_name, checkin_date)
      VALUES (?, ?, ?)
    `;

    db.query(insertQuery, [user_id, facility_name, today], (err) => {
      if (err) return res.status(500).json(err);

      // 3. Get user data
      const getUserQuery = `
        SELECT last_checkin_date, current_streak, points 
        FROM users 
        WHERE user_id = ?
      `;

      db.query(getUserQuery, [user_id], (err, userResults) => {
        if (err) return res.status(500).json(err);

        let streak = userResults[0].current_streak || 0;
        let lastDate = userResults[0].last_checkin_date;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yDate = yesterday.toISOString().split("T")[0];

        // Streak logic
        if (lastDate === yDate) {
          streak += 1;
        } else if (lastDate !== today) {
          streak = 1;
        }

        // 4. Update user (streak + points)
        const updateUserQuery = `
          UPDATE users 
          SET current_streak = ?, last_checkin_date = ?, points = points + 1
          WHERE user_id = ?
        `;

        db.query(updateUserQuery, [streak, today, user_id], (err) => {
          if (err) return res.status(500).json(err);

          // 5. Get updated points (IMPORTANT FIX)
          const updatedUserQuery = `
            SELECT points FROM users WHERE user_id = ?
          `;

          db.query(updatedUserQuery, [user_id], (err, result) => {
            if (err) return res.status(500).json(err);

            return res.json({
              message: "Check-in successful",
              streak,
              points: result[0].points 
            });
          });
        });
      });
    });
  });
};