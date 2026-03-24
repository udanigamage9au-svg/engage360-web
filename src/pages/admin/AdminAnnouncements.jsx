import AdminLayout from "./AdminLayout";
import { useState } from "react";

function AdminAnnouncements() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // ✅ HANDLE EVENT
  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventLocation) {
      return alert("Fill all event fields");
    }

    alert("Event Created (frontend)");
    setEventTitle("");
    setEventDate("");
    setEventLocation("");
  };

  // ✅ HANDLE ANNOUNCEMENT
  const handleSendAnnouncement = () => {
    if (!title || !message) {
      return alert("Fill all fields");
    }

    alert("Announcement sent to students");
    setTitle("");
    setMessage("");
  };

  return (
    <AdminLayout>
      <div style={styles.container}>

        <h1 style={styles.title}>Announcement & Event</h1>

        <div style={styles.grid}>

          {/* ================= CREATE EVENT ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📅 Create Event</h3>

            <label style={styles.label}>Event Title</label>
            <input
              style={styles.input}
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />

            <label style={styles.label}>Date</label>
            <input
              type="date"
              style={styles.input}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />

            <label style={styles.label}>Location</label>
            <input
              style={styles.input}
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />

            <button style={styles.yellowBtn} onClick={handleCreateEvent}>
              Send to Club
            </button>
          </div>

          {/* ================= ANNOUNCEMENT ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📢 General Announcement</h3>

            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label style={styles.label}>Message</label>
            <textarea
              style={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button style={styles.yellowBtn} onClick={handleSendAnnouncement}>
              Send to All Students
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAnnouncements;


/* ================= STYLES ================= */

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
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    marginTop: "5px",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    marginTop: "5px",
    height: "100px",
  },

  yellowBtn: {
    marginTop: "20px",
    background: "#facc15",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "600",
  },
};