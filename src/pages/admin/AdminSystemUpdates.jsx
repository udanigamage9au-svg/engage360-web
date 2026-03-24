import AdminLayout from "./AdminLayout";
import { useState } from "react";

function AdminSystemUpdates() {
  const [facility, setFacility] = useState("Gym");
  // Updated to include the state of the facility (Moderate/Busy)
  const [status, setStatus] = useState("Moderate");

  const [route, setRoute] = useState("Moratuwa Route");
  const [time, setTime] = useState("8:30 AM");

  const [rewardName, setRewardName] = useState("Free Coffee");
  // Updated default points to 500
  const [points, setPoints] = useState(500);

  // ✅ HANDLERS
  const handleFacilityUpdate = () => {
    alert(`Facility ${facility} status updated to: ${status}`);
  };

  const handleRouteUpdate = () => {
    alert(`Route updated: ${route} at ${time}`);
  };

  const handleRewardUpdate = () => {
    alert(`Reward ${rewardName} updated with ${points} points`);
  };

  return (
    <AdminLayout>
      <div style={styles.container}>

        <h1 style={styles.title}>System Updates</h1>

        <div style={styles.grid}>

          {/* ================= FACILITY STATUS ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🏫 Facility Status</h3>

            <label style={styles.label}>Facility</label>
            <select
              style={styles.input}
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
            >
              <option>Gymnasium</option>
              <option>Library</option>
              <option>Labs</option>
              <option>Stadium</option>
              <option>Student Guidance Center</option>
              <option>Media Unit</option>
            </select>

            <label style={styles.label}>Current State (Traffic)</label>
            <select
              style={styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Moderate</option>
              <option>Busy</option>
              <option>Very Busy</option>
              <option>Closed</option>
            </select>

            <button style={styles.blueBtn} onClick={handleFacilityUpdate}>
              Update Facility
            </button>
          </div>

          {/* ================= TRANSIT ROUTES ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🚌 Transit Routes</h3>

            <label style={styles.label}>Route</label>
            <select
              style={styles.input}
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            >
              <option>Moratuwa Route</option>
              <option>Gampaha Route</option>
              <option>Kandy Route</option>
            </select>

            <label style={styles.label}>Time</label>
            <select
              style={styles.input}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>8:30 AM</option>
              <option>12:00 PM</option>
              <option>5:00 PM</option>
            </select>

            <button style={styles.blueBtn} onClick={handleRouteUpdate}>
              Update Route
            </button>
          </div>

          {/* ================= REWARDS ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🏆 Rewards</h3>

            <label style={styles.label}>Reward Name</label>
            <input
              style={styles.input}
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
            />

            <label style={styles.label}>Points Required</label>
            <input
              type="number"
              style={styles.input}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />

            <button style={styles.yellowBtn} onClick={handleRewardUpdate}>
              Update Points
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1",
    minWidth: "300px",
    background: "#dcdde1",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "600",
    borderBottom: "1px solid #aaa",
    paddingBottom: "8px",
  },
  label: {
    fontSize: "13px",
    marginTop: "10px",
    display: "block",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
    boxSizing: "border-box",
  },
  blueBtn: {
    marginTop: "auto",
    paddingTop: "15px",
    background: "#3f479b", // Matching your brand color
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "20px",
  },
  yellowBtn: {
    marginTop: "20px",
    background: "#f1c40f", // Matching your brand color
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default AdminSystemUpdates;