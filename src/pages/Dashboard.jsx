import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

// Asset Imports
import studyRoomImg from "../assets/studyroom.png";
import transitImg from "../assets/transit.png";
import trophyImg from "../assets/trophy.jpg";
import uniMap from "../assets/uniMap.png";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("Good Morning");
  
  // Modal states
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showShuttleModal, setShowShuttleModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Dynamic Greeting Logic
  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    navigate("/login"); // 🚨 if not logged in → kick out
  } else {
    setUser(JSON.parse(storedUser));
  }

  // Greeting logic
  const hour = new Date().getHours();
  if (hour < 12) setGreeting("Good Morning");
  else if (hour < 17) setGreeting("Good Afternoon");
  else setGreeting("Good Evening");

}, []);

  return (
    <DashboardLayout
      activePage="home"
      title={`${greeting}, ${user?.full_name || "User"}!`}
      subtitle="Your personal campus engagement dashboard."
    >
      <div style={styles.dashboardGrid}>
        
        {/* --- LEFT COLUMN --- */}
        <div style={styles.column}>
          
          {/* TOP STATS SECTION */}
          <div style={styles.statsRow}>
            {/* Points Card */}
            <div style={styles.glassCardPrimary}>
              <div style={styles.cardHeader}>
                <span style={styles.badgeLabel}>Your Rewards</span>
                <img src={trophyImg} style={styles.trophyIcon} alt="Trophy" />
              </div>
              <h2 style={styles.pointsDisplay}>
  {user?.points || 0} <span style={styles.ptsUnit}>pts</span>
</h2>
              <button 
                style={styles.ghostButton} 
                onClick={() => navigate("/rewards")} // Now functional
              >
                View Rewards →
              </button>
            </div>

            {/* Level Card */}
            <div style={styles.glassCard}>
              <div style={styles.cardHeader}>
                <span style={styles.badgeLabel}>Engagement Level</span>
                <span style={styles.levelBadge}>LVL 4</span>
              </div>
              <p style={styles.progressDetail}><b>350 pts</b> to Level 5</p>
              <div style={styles.progressBarContainer}>
                <div style={styles.progressBarFill} />
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS SECTION */}
          <h3 style={styles.sectionTitle}>Get things done</h3>
          <div style={styles.quickCardsRow}>
            
            {/* Study Space Card */}
            <div style={styles.actionCard}>
              <div style={styles.cardIllustrationBox}>
                <img src={studyRoomImg} style={styles.cardIllustration} alt="Study" />
              </div>
              <h4 style={styles.cardTitle}>Study Spaces</h4>
              <p style={styles.cardDesc}>Quiet zones available in the Main Library.</p>
              <button 
                style={styles.primaryActionBtn}
                onClick={() => navigate("/explore")} // Navigates to Explore as requested
              >
                Book a Study Room
              </button>
            </div>

            {/* Shuttle Card */}
            <div style={styles.actionCard}>
              <div style={styles.cardIllustrationBox}>
                 <div style={styles.liveIndicator}><span style={styles.pulseDot} /> LIVE</div>
                <img src={transitImg} style={styles.cardIllustration} alt="Shuttle" />
              </div>
              <h4 style={styles.cardTitle}>Campus Shuttle</h4>
              {/* Removed the Gate 4 text */}
              <p style={styles.cardDesc}>Shuttle bus location is updated in real-time.</p> 
              <button 
                style={styles.trackLiveBtn} // New blue styling for Track Live
                onClick={() => navigate("/transit")} // Now functional
              >
                Track Now
              </button>
            </div>

          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div style={styles.column}>
          
          <div style={styles.mapSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Campus Map</h3>
              <span style={styles.mapLink} onClick={() => setShowMapModal(true)}>Expand</span>
            </div>
            
            <div style={styles.mapPreviewCard}>
                <div style={styles.mapOverlay}>
                    <div style={styles.locationPin}></div>
                    <button style={styles.mapBtn} onClick={() => setShowMapModal(true)}>Open Map</button>
                </div>
                <img src={uniMap} style={styles.mapImgBlur} alt="Map Preview" />
            </div>
          </div>

          <div style={styles.promoCard}>
            <div style={styles.promoContent}>
                <h4 style={styles.promoHeader}>Earn +5 Points</h4> {/* Points reduced as requested */}
                <p style={styles.promoSub}>Attend the Tech Meetup at the Student Union today!</p>
                <button style={styles.promoBtn} onClick={() => navigate("/rewards")}>Join Event</button>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      {showMapModal && (
        <ModalOverlay onClose={() => setShowMapModal(false)}>
          <div style={styles.fullModal}>
            <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>University Map</h2>
                <button style={styles.closeIcon} onClick={() => setShowMapModal(false)}>✕</button>
            </div>
            <img src={uniMap} style={styles.bigMap} alt="Full Map" />
          </div>
        </ModalOverlay>
      )}

    </DashboardLayout>
  );
}

// Sub-component for Overlay
function ModalOverlay({ children, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

const styles = {
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "30px",
    paddingBottom: "40px"
  },
  column: { display: "flex", flexDirection: "column", gap: "25px" },
  
  // Cards
  glassCard: {
    flex: 1,
    background: "rgba(255, 255, 255, 0.8)",
    padding: "24px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  glassCardPrimary: {
    flex: 1,
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 15px 30px rgba(37, 99, 235, 0.2)"
  },
  actionCard: {
    flex: 1,
    background: "white",
    borderRadius: "24px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    border: "1px solid #f1f5f9"
  },

  // Stats Elements
  statsRow: { display: "flex", gap: "20px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" },
  badgeLabel: { fontSize: "12px", fontWeight: "600", textTransform: "uppercase", opacity: 0.8 },
  pointsDisplay: { fontSize: "36px", fontWeight: "800", margin: "10px 0" },
  ptsUnit: { fontSize: "16px", fontWeight: "400" },
  levelBadge: { background: "#f59e0b", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", color: "white" },
  
  // Progress Bar
  progressBarContainer: { width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "10px", marginTop: "10px" },
  progressBarFill: { width: "65%", height: "100%", background: "#f59e0b", borderRadius: "10px" },
  progressDetail: { fontSize: "13px", color: "#64748b", margin: 0 },

  // Action Buttons
  ghostButton: { background: "rgba(255,255,255,0.2)", border: "none", color: "white", padding: "10px", borderRadius: "12px", cursor: "pointer", fontWeight: "600" },
  primaryActionBtn: { width: "100%", padding: "12px", border: "none", background: "#eff6ff", color: "#2563eb", borderRadius: "12px", fontWeight: "700", cursor: "pointer", marginTop: "15px" },
  // Styled Track Live button
  trackLiveBtn: { width: "100%", padding: "12px", border: "none", background: "#2563eb", color: "white", borderRadius: "12px", fontWeight: "700", cursor: "pointer", marginTop: "15px" },

  // Typography
  sectionTitle: { fontSize: "20px", fontWeight: "700", color: "#1e293b", margin: 0 },
  cardTitle: { fontSize: "18px", fontWeight: "700", margin: "10px 0 5px 0" },
  cardDesc: { fontSize: "14px", color: "#64748b", margin: 0, lineHeight: "1.4" },

  // Illustration handling
  cardIllustrationBox: { position: "relative", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" },
  cardIllustration: { height: "80px", objectFit: "contain" },
  trophyIcon: { width: "40px" },

  // Map Section
  mapPreviewCard: { position: "relative", borderRadius: "24px", overflow: "hidden", height: "220px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" },
  mapImgBlur: { width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8)" },
  mapOverlay: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2, background: "rgba(30, 41, 59, 0.2)" },
  locationPin: { fontSize: "40px", marginBottom: "10px" },
  mapBtn: { background: "white", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: "700", cursor: "pointer", color: "#1e293b" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  mapLink: { fontSize: "13px", color: "#2563eb", fontWeight: "600", cursor: "pointer" },

  // Promo Card
  promoCard: { background: "linear-gradient(135deg, #fef3c7, #fde68a)", padding: "24px", borderRadius: "24px", border: "1px solid #fcd34d" },
  promoHeader: { margin: "0 0 8px 0", fontSize: "18px", fontWeight: "800", color: "#92400e" },
  promoSub: { fontSize: "14px", color: "#b45309", marginBottom: "15px", fontWeight: "500" },
  promoBtn: { padding: "10px 20px", background: "#92400e", color: "white", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" },

  // Modal styling
  overlay: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  fullModal: { background: "white", padding: "30px", borderRadius: "32px", width: "850px", maxWidth: "95%" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  closeIcon: { background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" },
  bigMap: { width: "100%", borderRadius: "16px", maxHeight: "60vh", objectFit: "cover" },

  // Live Pulse
  liveIndicator: { position: "absolute", top: 0, right: 10, background: "white", padding: "4px 8px", borderRadius: "8px", fontSize: "10px", fontWeight: "800", color: "#ef4444", display: "flex", alignItems: "center", gap: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  pulseDot: { width: "6px", height: "6px", background: "#ef4444", borderRadius: "50%" }
};

export default Dashboard;