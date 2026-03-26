import { useState } from "react"
import DashboardLayout from "./DashboardLayout"
import { useNavigate } from "react-router-dom"

import eventImg from "../assets/events.jpg"
import gymImg from "../assets/gymnasium.jpg"
import mapImg from "../assets/realMap.png"
import clubImg from "../assets/clubs.webp"

function Explore() {
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)

  // Explicitly encoded URL for CINEC Campus, Malabe
  const cinecMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7832247242416!2d79.97036497587523!3d6.916503818464627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1aaaaaab%3A0xa6ad79a61a030d97!2sCINEC%20Campus!5e0!3m2!1sen!2slk!4v1709845000000!5m2!1sen!2slk"

  return (
    <DashboardLayout 
      activePage="explore" 
      title="Explore Campus" 
      subtitle="Discover Your Uni through Maps, Events and Premium Features!"
    >
      <div style={styles.container}>
        
<<<<<<< HEAD
        {/* NEW FEATURE: GLOWING STUDY ROOM BANNER */}
=======
        {/*  NEW FEATURE: GLOWING STUDY ROOM BANNER */}
>>>>>>> 7780ad8301042b4abfecb256d691e23399a6c3c1
        <div style={styles.featuredGlowCard}>
          <div style={styles.glowOverlay} />
          <div style={styles.featuredContent}>
            <div style={styles.newTag}>NEW FEATURE</div>
            <h2 style={styles.featuredTitle}> Premium Study Spaces</h2>
            <p style={styles.featuredSubtitle}>Book high-speed Wi-Fi zones and maintain your daily streak!</p>
          

            <button style={styles.featuredButton} onClick={() => navigate("/studyrooms")}>
              Reserve a Spot Now
            </button>
          </div>
        </div>

        {/* BALANCED 4-CARD GRID */}
        <div style={styles.grid}>
          
          {/* EVENTS */}
          <div style={styles.card}>
            <div style={styles.imgContainer}>
                <span style={styles.categoryBadge}>Happening Now</span>
                <img src={eventImg} style={styles.image} alt="Events" />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>University Events</h3>
              <p style={styles.cardText}>Join workshops and fests</p>
              <button style={styles.button} onClick={() => navigate("/clubs")}>View Events</button>
            </div>
          </div>

          {/* GYM */}
          <div style={styles.card}>
            <div style={styles.imgContainer}>
                <span style={styles.categoryBadge}>Wellness</span>
                <img src={gymImg} style={styles.image} alt="Gym" />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Fitness Center</h3>
              <p style={styles.cardText}>Check gym hours</p>
              <button style={styles.button} onClick={() => navigate("/facilities")}>View Gym</button>
            </div>
          </div>

          {/* CLUBS */}
          <div style={styles.card}>
            <div style={styles.imgContainer}>
                <span style={styles.categoryBadge}>Community</span>
                <img src={clubImg} style={styles.image} alt="Clubs" />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Clubs & Societies</h3>
              <p style={styles.cardText}>Find your tribe.</p>
              <button style={styles.button} onClick={() => navigate("/clubs")}>View joined Clubs</button>
            </div>
          </div>

          {/* CAMPUS MAP */}
          <div style={styles.card}>
            <div style={styles.imgContainer}>
                <span style={styles.categoryBadge}>Navigation</span>
                <img src={mapImg} style={styles.image} alt="Map" />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Campus Navigator</h3>
              <p style={styles.cardText}>Locate buildings and halls across CINEC Malabe.</p>
              <button style={styles.button} onClick={() => setShowMap(true)}>Explore Map</button>
            </div>
          </div>

        </div>
      </div>

      {/* MAP POPUP */}
      {showMap && (
        <div style={styles.overlay} onClick={() => setShowMap(false)}>
          <div style={styles.mapCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
                <h2 style={styles.mapTitle}>CINEC Campus Map</h2>
                <button style={styles.closeX} onClick={() => setShowMap(false)}>✕</button>
            </div>
            <iframe
              src={cinecMapUrl}
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: "14px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "35px", paddingBottom: "40px" },
  
  featuredGlowCard: {
    position: "relative",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
    borderRadius: "24px",
    padding: "40px",
    color: "white",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 10px 40px rgba(0,0,0,0.3)",
    border: "1px solid rgba(59, 130, 246, 0.3)"
  },
  glowOverlay: {
    position: "absolute", top: "-50%", left: "-20%", width: "140%", height: "200%",
    background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
    zIndex: 1
  },
  featuredContent: { position: "relative", zIndex: 2 },
  newTag: { 
    display: "inline-block", background: "#3b82f6", padding: "4px 12px", 
    borderRadius: "20px", fontSize: "10px", fontWeight: "800", marginBottom: "15px", letterSpacing: "1px" 
  },
  featuredTitle: { fontSize: "32px", fontWeight: "800", marginBottom: "10px" },
  featuredSubtitle: { fontSize: "16px", opacity: 0.9, marginBottom: "20px", maxWidth: "500px" },
  statsRow: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "25px" },
  miniStat: { fontSize: "14px", fontWeight: "600" },
  statDivider: { width: "1px", height: "15px", background: "rgba(255,255,255,0.3)" },
  featuredButton: {
    background: "#facc15", color: "#1e293b", border: "none",
    padding: "14px 28px", borderRadius: "12px", cursor: "pointer",
    fontWeight: "700", fontSize: "16px", boxShadow: "0 4px 15px rgba(250, 204, 21, 0.4)"
  },

  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "25px" },
  card: {
    background: "#fff", borderRadius: "20px", overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9"
  },
  imgContainer: { position: "relative", height: "180px" },
  categoryBadge: {
    position: "absolute", top: "15px", left: "15px", zIndex: 2,
    background: "rgba(255,255,255,0.9)", padding: "4px 10px", 
    borderRadius: "8px", fontSize: "11px", fontWeight: "700", color: "#1e293b"
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  cardBody: { padding: "24px" },
  cardTitle: { fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#1e293b" },
  cardText: { fontSize: "14px", color: "#64748b", marginBottom: "20px", lineHeight: "1.5" },
  button: {
    width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0",
    padding: "12px", borderRadius: "10px", cursor: "pointer",
    fontWeight: "600", color: "#1e293b"
  },

  overlay: {
    position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.7)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
    backdropFilter: "blur(4px)"
  },
  mapCard: { background: "#fff", padding: "30px", borderRadius: "24px", width: "950px", maxWidth: "95%" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  mapTitle: { fontSize: "22px", fontWeight: "800" },
  closeX: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }
}

export default Explore
