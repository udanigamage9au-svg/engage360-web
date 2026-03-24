import { useLocation, useNavigate } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"

function ClubDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const club = location.state

  if (!club) return <p>No club data</p>

  return (
    <DashboardLayout activePage="clubs" title="Club Profile">
      <div style={styles.wrapper}>
        {/* HERO SECTION */}
        <div style={styles.heroCard}>
          <img src={club.image} style={styles.heroImage} alt={club.name} />
          <div style={styles.heroContent}>
            <div style={styles.badgeRow}>
               <span style={styles.categoryBadge}>{club.category}</span>
               <span style={styles.statusBadge}>✓ Verified Community</span>
            </div>
            <h1 style={styles.title}>{club.name}</h1>
            <p style={styles.description}>
              Empowering students through innovation and hands-on experience. 
              Join us to collaborate on world-class projects and build your professional network.
            </p>
            <div style={styles.actions}>
              <button
                style={styles.primaryBtn} // Kept button style
                onClick={() => navigate("/clubs", { state: { tab: "events", clubName: club.name } })}
              >
                View Club Events →
              </button>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <div style={styles.iconCircle}>👥</div>
            <div>
              <h4 style={styles.infoTitle}>Members</h4>
              <p style={styles.infoText}>120+ Active Students</p>
            </div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.iconCircle}>📅</div>
            <div>
              <h4 style={styles.infoTitle}>Activity</h4>
              <p style={styles.infoText}>Weekly Workshops</p>
            </div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.iconCircle}>🏆</div>
            <div>
              <h4 style={styles.infoTitle}>Engagement</h4>
              <p style={styles.infoText}>Earn +5 Points/Event</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "30px" },
  heroCard: { 
    display: "flex", gap: "40px", background: "white", borderRadius: "28px", 
    padding: "35px", boxShadow: "0 20px 50px rgba(0,0,0,0.05)", alignItems: "center",
    border: "1px solid #f1f5f9"
  },
  heroImage: { width: "320px", height: "240px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
  heroContent: { flex: 1 },
  badgeRow: { display: "flex", gap: "10px", marginBottom: "15px" },
  categoryBadge: { background: "#fff7ed", color: "#c2410c", padding: "6px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: "700" },
  statusBadge: { background: "#f0fdf4", color: "#15803d", padding: "6px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: "700" },
  title: { fontSize: "34px", fontWeight: "800", color: "#1e293b", marginBottom: "15px" },
  description: { color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px", maxWidth: "600px" },
  
  // Button (Untouched functionality/base style)
  primaryBtn: { padding: "14px 28px", background: "#2f6edb", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "15px" },

  infoGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" },
  infoCard: { 
    background: "#ffffff", padding: "25px", borderRadius: "20px", 
    display: "flex", alignItems: "center", gap: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9" 
  },
  iconCircle: { width: "50px", height: "50px", borderRadius: "50%", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
  infoTitle: { margin: 0, fontSize: "14px", color: "#94a3b8", fontWeight: "600" },
  infoText: { margin: 0, fontSize: "16px", color: "#1e293b", fontWeight: "700" }
}

export default ClubDetails