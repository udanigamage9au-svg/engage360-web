import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const navItems = [
  { name: "Dashboard", path: "/admin-dashboard", icon: "⊞" },
  { name: "Clubs", path: "/admin/clubs", icon: "👥" },
  { name: "Announcement", path: "/admin/announcements", icon: "📢" },
  { name: "System Updates", path: "/admin/system-updates", icon: "📇" },
  { name: "Research", path: "/admin/research", icon: "📄" }, // ✅ Added Research Management
];
  

  return (
    <AdminLayout>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.headerRow}>
          <h1 style={styles.title}>Dashboard</h1>

          <div style={styles.logoBox}>
            <img src={logo} style={styles.logo} alt="logo" />
            <span style={styles.logoText}>ENGAGE360</span>
          </div>
        </div>

        {/* STATS */}
        <div style={styles.statsRow}>
          <div style={styles.card}>
            <span style={styles.icon}>👤</span>
            <div>
              <p style={styles.label}>Total Users</p>
              <h2 style={styles.value}>1245</h2>
            </div>
          </div>

          <div style={styles.card}>
            <span style={styles.icon}>🚩</span>
            <div>
              <p style={styles.label}>Total Clubs</p>
              <h2 style={styles.value}>18</h2>
            </div>
          </div>

          <div style={styles.card}>
            <span style={styles.icon}>📅</span>
            <div>
              <p style={styles.label}>Booking Today</p>
              <h2 style={styles.value}>32</h2>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>

          <div style={styles.actionGrid}>
            <button
              style={styles.actionBtn}
              onClick={() => navigate("/admin/clubs")}
            >
              ➕ Create Club
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/admin/clubs")}
            >
              👥 Add User to Club
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/admin/announcements")}
            >
              📢 Send Announcement
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/admin/system-updates")}
            >
              🗓️ Update Booking
            </button>
          </div>
        </div>

        {/* ANNOUNCEMENT */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Announcement</h3>

          <div style={styles.announcement}>
            <span style={styles.announceIcon}>📢</span>

            <div>
              <h4 style={styles.announceTitle}>
                Gym Maintenance Tomorrow
              </h4>

              <p style={styles.announceText}>
                The gym will be closed for maintenance tomorrow afternoon.
              </p>

              <span style={styles.time}>2 hrs ago</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <p style={styles.footer}>
          © 2026 Engage360, All rights reserved
        </p>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;



/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "26px",
    fontWeight: "600",
    margin: 0,
  },

  logoBox: {
    textAlign: "right",
  },

  logo: {
    width: "45px",
    display: "block",
    marginLeft: "auto",
  },

  logoText: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#3f479b",
  },

  statsRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  card: {
    flex: "1",
    minWidth: "250px",
    background: "#dcdde1",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  icon: {
    fontSize: "24px",
  },

  label: {
    margin: 0,
    fontSize: "13px",
    color: "#333",
  },

  value: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
  },

  section: {
    background: "#dcdde1",
    padding: "18px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  sectionTitle: {
    marginBottom: "10px",
    fontSize: "15px",
    fontWeight: "600",
    borderBottom: "1px solid #aaa",
    paddingBottom: "8px",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  actionBtn: {
    background: "#fff",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
  },

  announcement: {
    display: "flex",
    gap: "10px",
  },

  announceIcon: {
    fontSize: "22px",
  },

  announceTitle: {
    margin: "0 0 5px 0",
    fontSize: "14px",
  },

  announceText: {
    margin: 0,
    fontSize: "12px",
    color: "#555",
  },

  time: {
    fontSize: "11px",
    color: "#888",
  },

  footer: {
    textAlign: "center",
    fontSize: "12px",
    color: "#777",
    marginTop: "10px",
  },
};