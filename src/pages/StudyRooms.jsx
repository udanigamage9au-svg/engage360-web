import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

function StudyRooms() {
  const [selectedRoom, setSelectedRoom] = useState("Room A");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Initialize state from LocalStorage to keep it synced with Facilities.jsx
  const [streak, setStreak] = useState(parseInt(localStorage.getItem("streakCount") || "0"));
  const user = JSON.parse(localStorage.getItem("user"));

const [points, setPoints] = useState(user?.points || 0);
  const rooms = [
    { name: "Room A", capacity: 4, type: "Solo Focus" },
    { name: "Room B", capacity: 6, type: "Group Project" },
    { name: "Room C", capacity: 8, type: "Workshop" },
    { name: "Room D", capacity: 10, type: "Conference" }
  ];

  const timeSlots = ["9-10", "10-11", "11-12", "12-1", "1-2", "2-3"];

  const bookedSlots = {
    "Room A": ["10-11", "1-2"],
    "Room B": ["9-10"],
    "Room C": [],
    "Room D": ["12-1"]
  };

  // ✅ STREAK & POINT LOGIC (+1 Point)
  function handleBooking() {
  if (!selectedSlot) return;

  const today = new Date().toLocaleDateString();
  const lastUpdate = localStorage.getItem("lastStreakUpdate");

  setShowPopup(true);

  if (lastUpdate !== today) {
    const user = JSON.parse(localStorage.getItem("user"));

    const newPoints = user.points + 1;
    const newStreak = streak + 1;

    const updatedUser = {
      ...user,
      points: newPoints
    };

    setPoints(newPoints);
    setStreak(newStreak);

    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("streakCount", newStreak);
    localStorage.setItem("lastStreakUpdate", today);
  }
}

  return (
    <DashboardLayout activePage="facilities" title="Study Space" subtitle="Boost your productivity by booking a dedicated zone.">
      
      <div style={styles.pageWrapper}>
        <div style={styles.mainContainer}>
          
          {/* USER PROGRESS HEADER - SYNCED WITH FACILITIES PAGE */}
          <div style={styles.gamificationBar}>
            <div style={styles.statItem}>
              <span style={styles.statEmoji}>🔥</span>
              <div>
                <p style={styles.statText}>Current Streak</p>
                <h2 style={styles.statValue}>{streak} Days</h2>
              </div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statEmoji}>💰</span>
              <div>
                <p style={styles.statText}>Total Rewards</p>
                <h2 style={styles.statValue}>{points} PTS</h2>
              </div>
            </div>
          </div>

          <div style={styles.bookingGrid}>
            {/* ROOM SELECTION */}
            <div style={styles.cardSection}>
              <h3 style={styles.sectionTitle}>1. Choose your Space</h3>
              <div style={styles.roomList}>
                {rooms.map((room) => (
                  <div
                    key={room.name}
                    style={{
                      ...styles.roomCard,
                      ...(selectedRoom === room.name ? styles.roomSelected : {})
                    }}
                    onClick={() => {
                      setSelectedRoom(room.name);
                      setSelectedSlot(null);
                    }}
                  >
                    <div style={styles.roomIcon}>{room.capacity > 6 ? "👥" : "📚"}</div>
                    <h4 style={styles.roomTitle}>{room.name}</h4>
                    <p style={styles.roomType}>{room.type}</p>
                    <div style={styles.capacityBadge}>Max {room.capacity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLOT SELECTION */}
            <div style={styles.cardSection}>
              <h3 style={styles.sectionTitle}>2. Select a Time</h3>
              <div style={styles.slotGrid}>
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots[selectedRoom]?.includes(slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      disabled={isBooked}
                      style={{
                        ...styles.slotButton,
                        ...(isBooked ? styles.slotBooked : {}),
                        ...(isSelected ? styles.slotSelected : {})
                      }}
                      onClick={() => !isBooked && setSelectedSlot(slot)}
                    >
                      {slot}
                      <span style={styles.slotStatus}>{isBooked ? "Booked" : "Available"}</span>
                    </button>
                  );
                })}
              </div>

              <button 
                style={{
                    ...styles.confirmBtn,
                    opacity: selectedSlot ? 1 : 0.6,
                    cursor: selectedSlot ? "pointer" : "not-allowed"
                }} 
                onClick={handleBooking}
              >
                Reserve {selectedRoom}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showPopup && (
        <div style={styles.modalOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.successIcon}>Success</div>
            <h2 style={styles.modalTitle}>Spot Secured!</h2>
            <p style={styles.modalText}>You've successfully booked <strong>{selectedRoom}</strong> for <strong>{selectedSlot}</strong>.</p>
            
            <div style={styles.bonusBadge}>
                {localStorage.getItem("lastStreakUpdate") === new Date().toLocaleDateString() 
                ? "Streak Maintained 🔥" 
                : "+1 Point Earned"}
            </div>

            <button style={styles.modalCloseBtn} onClick={() => setShowPopup(false)}>Awesome</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

const styles = {
  pageWrapper: { minHeight: "80vh", padding: "10px", position: "relative" },
  mainContainer: { maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 },
  gamificationBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "#1e293b", // Matching your Facilities header color
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    color: "white"
  },
  statItem: { display: "flex", alignItems: "center", gap: "15px" },
  statEmoji: { fontSize: "32px" },
  statText: { margin: 0, fontSize: "12px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase" },
  statValue: { margin: 0, fontSize: "24px", color: "white", fontWeight: "800" },
  statDivider: { width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" },

  bookingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" },
  cardSection: { background: "white", padding: "25px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "#334155" },
  roomList: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  roomCard: { padding: "20px", borderRadius: "16px", background: "#f8fafc", border: "2px solid transparent", cursor: "pointer", transition: "all 0.2s ease", textAlign: "center" },
  roomSelected: { borderColor: "#3b82f6", background: "#eff6ff", transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(59,130,246,0.1)" },
  roomIcon: { fontSize: "24px", marginBottom: "8px" },
  roomTitle: { margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700" },
  roomType: { fontSize: "12px", color: "#64748b", margin: "0 0 12px 0" },
  capacityBadge: { display: "inline-block", padding: "4px 8px", background: "white", borderRadius: "8px", fontSize: "11px", fontWeight: "600", color: "#3b82f6" },

  slotGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "25px" },
  slotButton: { padding: "15px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", transition: "all 0.2s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", fontSize: "15px", fontWeight: "700" },
  slotStatus: { fontSize: "10px", fontWeight: "500", opacity: 0.6 },
  slotSelected: { background: "#3b82f6", color: "white", borderColor: "#3b82f6" },
  slotBooked: { background: "#fee2e2", color: "#ef4444", borderColor: "#fecaca", cursor: "not-allowed", opacity: 0.7 },

  confirmBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", borderRadius: "14px", fontSize: "16px", fontWeight: "700", boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)", cursor: "pointer" },

  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 },
  modalContent: { background: "white", padding: "40px", borderRadius: "30px", textAlign: "center", maxWidth: "400px", boxShadow: "0 30px 60px rgba(0,0,0,0.3)" },
  successIcon: { fontSize: "60px", marginBottom: "20px" },
  modalTitle: { fontSize: '24px', fontWeight: '800', marginBottom: '10px' },
  modalText: { color: '#64748b', marginBottom: '20px' },
  bonusBadge: { display: "inline-block", padding: "8px 20px", background: "#fef3c7", color: "#d97706", borderRadius: "20px", fontWeight: "700", marginBottom: "25px" },
  modalCloseBtn: { width: "100%", padding: "12px", borderRadius: "12px", border: "none", background: "#f1f5f9", fontWeight: "700", cursor: "pointer" },
};

export default StudyRooms;