import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notifModal, setNotifModal] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notifSending, setNotifSending] = useState(false);

  const isActive = (path) => location.pathname === path;
  const sendNotification = async () => {
  if (!notifMsg.trim()) return alert("Enter a message");
  setNotifSending(true);
  const res = await fetch("http://localhost:5000/api/notifications/send-all", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: notifMsg }),
  });
  const data = await res.json();
  setNotifSending(false);
  setNotifMsg("");
  setNotifModal(false);
  alert(`Notification sent to ${data.sent} students!`);
};

  // Modern Navigation Items Array for cleaner mapping
  const navItems = [
  { name: "Dashboard", path: "/admin-dashboard", icon: "⊞" },
  { name: "Clubs", path: "/admin/clubs", icon: "👥" },
  { name: "Announcement", path: "/admin/announcements", icon: "📢" },
  { name: "System Updates", path: "/admin/system-updates", icon: "📇" },
  { name: "Research", path: "/admin/research", icon: "📄" },
];

  return (
    <div style={styles.wrapper}>
      
      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalIcon}>🚪</div>
            <h3 style={{ margin: "10px 0 5px" }}>Confirm Logout</h3>
            <p style={styles.modalText}>Are you sure you want to end your session?</p>
            <div style={styles.modalActions}>
              <button style={styles.confirmBtn} onClick={() => navigate("/")}>Logout</button>
              <button style={styles.cancelBtn} onClick={() => setShowLogoutConfirm(false)}>Stay</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <div style={styles.sidebar}>
        <div>
          {/* BRANDING */}
          <div style={styles.sidebarHeader}>
            <div style={styles.logoContainer}>
              <img src={logo} style={styles.logoImg} alt="Logo" />
            </div>
            <div style={styles.brandText}>
               <span style={styles.brandMain}>ENGAGE</span>
               <span style={styles.brandSub}>360</span>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav style={styles.menu}>
            {navItems.map((item) => (
              <div
                key={item.path}
                style={isActive(item.path) ? styles.activeItem : styles.menuItem}
                onClick={() => navigate(item.path)}
              >
                <span style={styles.iconSpan}>{item.icon}</span>
                {item.name}
              </div>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION / PROFILE CARD */}
        <div style={styles.sidebarFooter}>
          <div style={styles.divider}></div>
          <div style={styles.profileCard} onClick={() => navigate("/admin/profile")}>
            <div style={styles.avatar}>AD</div>
            <div style={styles.profileInfo}>
               <span style={styles.profileName}>Admin User</span>
               <span style={styles.profileRole}>Super Admin</span>
            </div>
          </div>
          <div
            style={styles.logoutItem}
            onClick={() => setShowLogoutConfirm(true)}
          >
            <span style={styles.iconSpan}>🚪</span> Logout
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={styles.main}>
        
       <header style={styles.topBar}>
  <div style={styles.breadcrumb}>
    <span style={{ opacity: 0.5 }}>Platform</span> /
    <span style={{ fontWeight: 600, color: "#3f479b" }}>
      {" "}{location.pathname.split("/").pop().replace("-", " ")}
    </span>
  </div>
  <div style={styles.topBarRight}>
    <span style={styles.statusIndicator}>● System Online</span>
    <button style={styles.notifBtn} onClick={() => setNotifModal(true)}>
      🔔 Send Notification
    </button>
  </div>
</header>

{/* NOTIFICATION SEND MODAL */}
{notifModal && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalBox}>
      <h3 style={{ marginBottom: "6px" }}>🔔 Send Notification</h3>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
        This will be sent to all students in real time.
      </p>
      <textarea
        style={styles.notifTextarea}
        placeholder="Type your message..."
        value={notifMsg}
        onChange={(e) => setNotifMsg(e.target.value)}
        rows={4}
      />
      <div style={styles.modalActions}>
        <button style={styles.confirmBtn} onClick={sendNotification} disabled={notifSending}>
          {notifSending ? "Sending..." : "Send to All Students"}
        </button>
        <button style={styles.cancelBtn} onClick={() => setNotifModal(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
        {/* PAGE CONTENT */}
        <main style={styles.content}>
          <div style={styles.innerContent}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "#f4f7fe", // Softer, modern background
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  notifBtn: {
  marginLeft: "16px",
  background: "#fbbf24",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "13px",
  cursor: "pointer",
},
notifTextarea: {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  resize: "vertical",
  boxSizing: "border-box",
  marginBottom: "16px",
},
topBarRight: {
  display: "flex",
  alignItems: "center",
},
 
  /* SIDEBAR */
  sidebar: {
    width: "260px",
    background: "linear-gradient(180deg, #3f479b 0%, #2a316e 100%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "30px 0",
    boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
    zIndex: 10,
  },

  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 25px",
    marginBottom: "40px",
    gap: "12px",
  },

  logoContainer: {
    width: "40px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(5px)",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  logoImg: { width: "24px" },

  brandText: { letterSpacing: "1px", fontSize: "18px", fontWeight: "800" },
  brandMain: { color: "#fff" },
  brandSub: { color: "#fbbf24" }, // Gold accent

  menu: { display: "flex", flexDirection: "column", gap: "4px", padding: "0 15px" },

  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#cbd5e1",
    transition: "all 0.3s ease",
  },

  activeItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.15)",
    color: "#fff",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  iconSpan: { marginRight: "12px", fontSize: "18px" },

  /* SIDEBAR FOOTER */
  sidebarFooter: { padding: "0 15px" },
  divider: { height: "1px", background: "rgba(255,255,255,0.1)", margin: "20px 10px" },
  
  profileCard: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.1)",
    cursor: "pointer",
    marginBottom: "10px",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#fbbf24",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },

  profileInfo: { marginLeft: "10px", display: "flex", flexDirection: "column" },
  profileName: { fontSize: "13px", fontWeight: "600" },
  profileRole: { fontSize: "11px", opacity: 0.6 },

  logoutItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    color: "#ff8a8a",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "10px",
  },

  /* MAIN AREA */
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },

  topBar: {
    height: "70px",
    padding: "0 30px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  breadcrumb: { fontSize: "14px", textTransform: "capitalize" },
  statusIndicator: { fontSize: "12px", color: "#10b981", fontWeight: "600" },

  content: { flex: 1, overflowY: "auto", padding: "30px" },
  innerContent: { maxWidth: "1400px", margin: "0 auto" },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.6)", // Darker, blurred backdrop
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modalBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  modalIcon: { fontSize: "40px", marginBottom: "10px" },
  
  confirmBtn: {
    flex: 1,
    background: "#ef4444", // Red for destructive action
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  cancelBtn: {
    flex: 1,
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default AdminLayout;