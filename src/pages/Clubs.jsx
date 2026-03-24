import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"

import techclub from "../assets/techclub.webp"
import coderclub from "../assets/codingclub.png"
import techfest from "../assets/techfest.png"
import hacknight from "../assets/hacknight.jpg"

function Clubs() {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(location.state?.tab || "clubs")
  const [filterClub, setFilterClub] = useState(location.state?.clubName || null)

  const clubs = [
    { name: "Tech Innovators Club", category: "Technology", image: techclub },
    { name: "Coding & Developers Club", category: "Technology", image: coderclub }
  ]

  const events = [
    {
      title: "Tech Fest",
      club: "Tech Innovators Club",
      image: techfest,
      day: "Wednesday",
      time: "3:00 PM - 4:00 PM",
      location: "Room 202, Tech Building"
    },
    {
      title: "Hack Night",
      club: "Coding & Developers Club",
      image: hacknight,
      day: "Thursday",
      time: "5:00 PM - 6:30 PM",
      location: "Room 405, Computer Science Building"
    }
  ]

  // Filter logic for when coming from ClubDetails
  const displayEvents = filterClub 
    ? events.filter(e => e.club === filterClub) 
    : events

  return (
    <DashboardLayout activePage="clubs" title="Campus Life" subtitle="Join communities that inspire you.">
      <div style={styles.container}>
        <p style={styles.breadcrumb}>Discovery  {activeTab === "clubs" ? "My Clubs" : "Upcoming Events"}</p>

        <div style={styles.tabs}>
          <button
            style={activeTab === "clubs" ? styles.activeTab : styles.tab}
            onClick={() => { setActiveTab("clubs"); setFilterClub(null); }}
          >
            My Clubs
          </button>
          <button
            style={activeTab === "events" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("events")}
          >
            Club Events {filterClub && `(${filterClub})`}
          </button>
        </div>

        {activeTab === "clubs" && (
          <div style={styles.grid}>
            {clubs.map((club, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.imageWrapper}>
                  <img src={club.image} style={styles.image} alt={club.name} />
                  <span style={styles.floatingBadge}>{club.category}</span>
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.title}>{club.name}</h3>
                  <div style={styles.buttonRow}>
                    <button style={styles.grayBtn}>{club.category}</button>
                    <button
                      style={styles.yellowBtn}
                      onClick={() => navigate("/clubdetails", { state: club })}
                    >
                      View Club
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div style={styles.grid}>
            {displayEvents.map((event, index) => (
              <div key={index} style={styles.eventCard}>
                <img src={event.image} style={styles.eventImage} alt={event.title} />
                <div style={styles.eventInfo}>
                  <h3 style={styles.title}>{event.title}</h3>
                  <p style={styles.clubName}>📍 {event.club}</p>
                  <div style={styles.dateTimeRow}>
                    <span>📅 {event.day}</span>
                    <span>⏰ {event.time}</span>
                  </div>
                  <p style={styles.locationText}>Location: {event.location}</p>
                  {/* Keep buttons as is */}
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

const styles = {
  container: { width: "100%", paddingBottom: "40px" },
  breadcrumb: { fontSize: "13px", color: "#94a3b8", marginBottom: "20px", fontWeight: "500" },
  tabs: { display: "flex", gap: "12px", marginBottom: "35px", background: "#f1f5f9", padding: "6px", borderRadius: "12px", width: "fit-content" },
  tab: { padding: "10px 24px", border: "none", background: "transparent", color: "#64748b", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "0.2s" },
  activeTab: { padding: "10px 24px", border: "none", background: "#ffffff", color: "#2f6edb", borderRadius: "8px", cursor: "pointer", fontWeight: "700", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" },
  
  // Card Styling
  card: { background: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.04)", border: "1px solid #f1f5f9" },
  imageWrapper: { position: "relative", height: "180px" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  floatingBadge: { position: "absolute", top: "15px", right: "15px", background: "rgba(255,255,255,0.9)", color: "#b45309", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800" },
  cardContent: { padding: "20px" },
  title: { fontSize: "19px", fontWeight: "700", color: "#1e293b", margin: "0 0 12px 0" },
  
  // Event Specific
  eventCard: { background: "white", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" },
  eventImage: { width: "100%", height: "200px", objectFit: "cover" },
  eventInfo: { padding: "20px" },
  clubName: { color: "#2f6edb", fontWeight: "600", fontSize: "14px", marginBottom: "10px" },
  dateTimeRow: { display: "flex", gap: "15px", fontSize: "13px", color: "#64748b", marginBottom: "10px" },
  locationText: { fontSize: "13px", color: "#94a3b8", fontStyle: "italic" },

  // Buttons (Untouched as requested)
  buttonRow: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
  grayBtn: { background: "#f1f5f9", border: "none", padding: "8px 15px", borderRadius: "8px", color: "#475569", fontWeight: "600" },
  yellowBtn: { background: "#f4b400", border: "none", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", color: "white" },
  blueBtn: { width: "100%", marginTop: "15px", background: "#2f6edb", color: "white", border: "none", padding: "12px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }
}

export default Clubs