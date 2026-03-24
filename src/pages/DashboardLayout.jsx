import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Asset Imports
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import facilitiesIcon from "../assets/facilities.png";
import searchIcon from "../assets/search.jpg";
import clubsIcon from "../assets/clubs.png";
import rewardsIcon from "../assets/rewards.png";
import profileIcon from "../assets/profile.png";
import settingsIcon from "../assets/settings.png";
import transitIcon from "../assets/transit.png";
import logoutIcon from "../assets/logout.png";
import notificationIcon from "../assets/notification.png";
import researchIcon from "../assets/research.jpg"; 

const DashboardLayout = ({ activePage, title, subtitle, children }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [notifications] = useState([
    "Welcome to the Engage360 Platform!",
    "New Club event: Tech Workshop at 5 PM",
  ]);

  // 🔥 HANDLE LOGOUT LOGIC
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session data
    setShowLogoutModal(false);       // Close modal
    navigate("/login");              // Redirect to login page
  };

  const navItems = [
    { key: "home", label: "Home", icon: homeIcon, path: "/dashboard" },
    { key: "explore", label: "Explore", icon: searchIcon, path: "/explore" },
    { key: "facilities", label: "Facilities", icon: facilitiesIcon, path: "/facilities" },
    { key: "clubs", label: "Clubs", icon: clubsIcon, path: "/clubs" },
    { key: "research", label: "Research Hub", icon: researchIcon, path: "/research" }, 
    { key: "rewards", label: "Rewards", icon: rewardsIcon, path: "/rewards" },
    { key: "transit", label: "Transit & Navigation", icon: transitIcon, path: "/transit" },
    { key: "profile", label: "Profile", icon: profileIcon, path: "/profile" },
  ];

  const bottomItems = [
    { key: "settings", label: "Settings", icon: settingsIcon, path: "/settings" },
    { key: "logout", label: "Logout", icon: logoutIcon, path: "/login" },
  ];

  return (
    <div style={styles.page}>
      {showNotifications && (
        <div 
          style={styles.notificationOverlay} 
          onClick={() => setShowNotifications(false)} 
        />
      )}

      {/* Visual Decor */}
      <div style={styles.blueGlowTop} />
      <div style={styles.yellowGlowRight} />
      <div style={styles.blueGlowBottom} />
      <div style={styles.yellowGlowLeft} />

      {[styles.p1, styles.p2, styles.p3, styles.p4, styles.p5, styles.p6, styles.p7, styles.p8].map((p, i) => (
        <span key={i} style={{ ...styles.particle, ...p }} />
      ))}

      <header style={styles.topbar}>
        <div style={styles.brandSection}>
          <img src={logo} style={styles.logo} alt="Engage360 Logo" />
          <div style={styles.divider} />
          <span style={styles.platformText}>University Campus Engagement Platform</span>
        </div>
      </header>

      <div style={styles.body}>
        <nav style={styles.sidebar}>
          <div style={styles.navGroup}>
            {navItems.map((item) => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                active={activePage === item.key}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
          <div style={styles.sidebarDivider} />
          <div style={styles.navGroup}>
            {bottomItems.map((item) => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  if (item.key === "logout") setShowLogoutModal(true);
                  else navigate(item.path);
                }}
              />
            ))}
          </div>
        </nav>

        <main style={styles.main}>
          <div style={styles.headerContainer}>
            <div>
              <h1 style={styles.title}>{title}</h1>
              <p style={styles.subtitle}>{subtitle}</p>
            </div>

            <div style={styles.notificationWrapper}>
              <div 
                style={{
                  ...styles.notificationBox, 
                  zIndex: showNotifications ? 10001 : 1001 
                }} 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <img src={notificationIcon} alt="notifications" style={styles.notificationIcon} />
                {notifications.length > 0 && <span style={styles.redDot} />}
              </div>

              {showNotifications && (
                <div style={styles.notificationPopup}>
                  <div style={styles.notificationHeader}>
                    <span style={{ fontWeight: "bold" }}>Notifications</span>
                    <button style={styles.notificationClose} onClick={() => setShowNotifications(false)}>✕</button>
                  </div>
                  <div style={styles.notificationList}>
                    {notifications.length === 0 ? (
                      <p style={styles.emptyText}>No new notifications</p>
                    ) : (
                      notifications.map((note, index) => (
                        <div key={index} style={styles.notificationItem}>{note}</div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={styles.content}>
            {children}
          </div>

          <footer style={styles.footer}>
            © 2026 Engage360, All rights reserved
          </footer>
        </main>
      </div>

      {showLogoutModal && (
        <ModalOverlay onClose={() => setShowLogoutModal(false)}>
          <div style={styles.modalCard}>
            <div style={styles.modalIcon}>❓</div>
            <h2 style={styles.modalTitle}>Do you want to log out?</h2>
            <div style={styles.modalButtons}>
              {/* ✅ UPDATED BUTTON TO USE handleLogout */}
              <button style={styles.modalPrimary} onClick={handleLogout}>Yes, Logout</button>
              <button style={styles.modalSecondary} onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

// Sub-components
const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.sidebarItem,
      ...(active ? styles.sidebarItemActive : {}),
    }}
  >
    <div style={styles.iconBox}>
      <img src={icon} style={styles.iconImg} alt={label} />
    </div>
    <span style={{ fontWeight: active ? "600" : "400" }}>{label}</span>
  </div>
);

const ModalOverlay = ({ children, onClose }) => (
  <div style={styles.modalOverlay} onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

const styles = {
  page: {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg,#f8fbff 0%,#f4f7fc 48%,#fffdf8 100%)",
  },
  notificationOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.3)", 
    zIndex: 10000, 
    backdropFilter: "blur(2px)",
  },
  topbar: {
    height: "80px",
    background: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #e5e7eb",
    zIndex: 1000, 
  },
  brandSection: { display: "flex", alignItems: "center", gap: "14px" },
  logo: { width: "160px", objectFit: "contain" },
  divider: { width: "1px", height: "36px", background: "#cbd5e1" },
  platformText: { color: "#334155", fontSize: "15px", fontWeight: "500" },
  body: { flex: 1, display: "flex", overflow: "hidden" },
  sidebar: {
    width: "260px",
    background: "#295fb8",
    color: "white",
    padding: "20px 12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 5,
  },
  navGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  sidebarItemActive: { background: "#3f86ff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  iconBox: {
    width: "32px",
    height: "32px",
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  iconImg: { width: "18px", height: "18px" },
  sidebarDivider: { borderTop: "1px solid rgba(255,255,255,0.2)", margin: "15px 10px" },
  main: { flex: 1, padding: "30px", overflowY: "auto", position: "relative" },
  headerContainer: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: { fontSize: "36px", fontWeight: "800", color: "#1e293b", margin: 0 },
  subtitle: { fontSize: "16px", color: "#64748b", marginTop: "4px", fontStyle: "italic" },
  notificationWrapper: { position: "relative" },
  notificationBox: {
    background: "white",
    padding: "10px",
    borderRadius: "50%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    border: "1px solid #f1f5f9",
    position: "relative",
  },
  notificationIcon: { width: "24px" },
  redDot: {
    position: "absolute",
    top: "2px",
    right: "2px",
    width: "10px",
    height: "10px",
    background: "#ef4444",
    borderRadius: "50%",
    border: "2px solid white",
  },
  notificationPopup: {
    position: "absolute",
    top: "50px",
    right: "0",
    width: "280px",
    background: "white",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    border: "1px solid #e5e7eb",
    zIndex: 10001, 
  },
  notificationHeader: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
  notificationClose: { border: "none", background: "none", cursor: "pointer", color: "#94a3b8" },
  notificationList: { display: "flex", flexDirection: "column", gap: "10px" },
  notificationItem: { padding: "8px", fontSize: "13px", borderBottom: "1px solid #f1f5f9", color: "#334155" },
  emptyText: { textAlign: "center", fontSize: "13px", color: "#94a3b8" },
  content: { minHeight: "70vh" },
  footer: { textAlign: "center", padding: "40px 0 20px", fontSize: "12px", color: "#94a3b8" },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modalCard: {
    background: "white",
    padding: "40px",
    borderRadius: "24px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  modalIcon: { fontSize: "48px", marginBottom: "10px" },
  modalTitle: { fontSize: "20px", fontWeight: "700", color: "#1e293b" },
  modalButtons: { display: "flex", gap: "12px", marginTop: "30px" },
  modalPrimary: { flex: 1, padding: "12px", background: "#2f6edb", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  modalSecondary: { flex: 1, padding: "12px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },

  blueGlowTop: { position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", zIndex: 0 },
  yellowGlowRight: { position: "absolute", top: "20%", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)", zIndex: 0 },
  blueGlowBottom: { position: "absolute", bottom: "-100px", left: "20%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", zIndex: 0 },
  yellowGlowLeft: { position: "absolute", bottom: "10%", left: "-50px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)", zIndex: 0 },
  particle: { position: "absolute", borderRadius: "50%", zIndex: 1, opacity: 0.6 },
  p1: { top: "10%", left: "5%", width: "8px", height: "8px", background: "#3b82f6" },
  p2: { top: "25%", left: "15%", width: "10px", height: "10px", background: "#60a5fa" },
  p3: { top: "15%", right: "10%", width: "9px", height: "9px", background: "#facc15" },
  p4: { top: "40%", right: "15%", width: "6px", height: "6px", background: "#60a5fa" },
  p5: { bottom: "15%", left: "10%", width: "7px", height: "7px", background: "#3b82f6" },
  p6: { bottom: "20%", right: "12%", width: "9px", height: "9px", background: "#facc15" },
  p7: { top: "50%", left: "12%", width: "5px", height: "5px", background: "#3b82f6" },
  p8: { bottom: "30%", right: "20%", width: "6px", height: "6px", background: "#facc15" },
};

export default DashboardLayout;