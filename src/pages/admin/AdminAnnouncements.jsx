import AdminLayout from "./AdminLayout";
import { useState, useEffect } from "react";

function AdminAnnouncements() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [sending, setSending] = useState(false);

  // Load existing announcements
  const fetchAnnouncements = () => {
    fetch("http://localhost:5000/api/announcements")
      .then((r) => r.json())
      .then((data) => setAnnouncements(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ✅ HANDLE EVENT (frontend only — no DB for events yet)
  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventLocation) {
      return alert("Fill all event fields");
    }
    alert("Event Created");
    setEventTitle("");
    setEventDate("");
    setEventLocation("");
  };

  // ✅ HANDLE ANNOUNCEMENT — saves to DB + sends real-time notification
  const handleSendAnnouncement = async () => {
    if (!title || !message) {
      return alert("Fill all fields");
    }
    setSending(true);
    try {
      const res = await fetch("http://localhost:5000/api/announcements/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle("");
        setMessage("");
        fetchAnnouncements();
        alert("Announcement sent to all students!");
      } else {
        alert("Error: " + data.error);
      }
    } catch {
      alert("Could not connect to server.");
    }
    setSending(false);
  };

  // ✅ DELETE announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await fetch(`http://localhost:5000/api/announcements/delete/${id}`, {
      method: "DELETE",
    });
    fetchAnnouncements();
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Announcement & Event</h1>

        <div style={styles.grid}>

          {/* ═══ CREATE EVENT ═══ */}
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

          {/* ═══ GENERAL ANNOUNCEMENT ═══ */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📢 General Announcement</h3>

            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Library Closure Notice"
            />

            <label style={styles.label}>Message</label>
            <textarea
              style={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write the full announcement here..."
            />

            <button
              style={{ ...styles.yellowBtn, opacity: sending ? 0.6 : 1 }}
              onClick={handleSendAnnouncement}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send to All Students"}
            </button>
          </div>
        </div>

        {/* ═══ POSTED ANNOUNCEMENTS ═══ */}
        <div style={styles.historySection}>
          <h3 style={styles.historyTitle}>
            📋 Posted Announcements
            <span style={styles.countBadge}>{announcements.length}</span>
          </h3>

          {announcements.length === 0 ? (
            <p style={styles.emptyText}>No announcements posted yet.</p>
          ) : (
            announcements.map((ann) => (
              <div key={ann.id} style={styles.annRow}>
                <div style={styles.annLeft}>
                  <p style={styles.annTitle}>{ann.title}</p>
                  <p style={styles.annMessage}>{ann.message}</p>
                  <span style={styles.annTime}>
                    {new Date(ann.created_at).toLocaleString()}
                  </span>
                </div>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(ann.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAnnouncements;

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto" },
  title: { fontSize: "24px", marginBottom: "20px" },
  grid: { display: "flex", gap: "20px", flexWrap: "wrap" },
  card: { flex: "1", minWidth: "300px", background: "#dcdde1", padding: "20px", borderRadius: "12px" },
  cardTitle: { marginBottom: "15px", fontSize: "16px", fontWeight: "600", borderBottom: "1px solid #aaa", paddingBottom: "8px" },
  label: { fontSize: "13px", marginTop: "10px", display: "block" },
  input: { width: "100%", padding: "10px", borderRadius: "6px", border: "none", marginTop: "5px", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "10px", borderRadius: "6px", border: "none", marginTop: "5px", height: "100px", boxSizing: "border-box", resize: "vertical" },
  yellowBtn: { marginTop: "20px", background: "#facc15", border: "none", padding: "10px", borderRadius: "6px", width: "100%", cursor: "pointer", fontWeight: "600" },
  historySection: { marginTop: "28px", background: "#dcdde1", padding: "20px", borderRadius: "12px" },
  historyTitle: { fontSize: "16px", fontWeight: "600", borderBottom: "1px solid #aaa", paddingBottom: "10px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" },
  countBadge: { background: "#3f479b", color: "#fff", borderRadius: "20px", padding: "2px 10px", fontSize: "12px" },
  emptyText: { color: "#94a3b8", fontSize: "14px" },
  annRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#fff", padding: "14px", borderRadius: "10px", marginBottom: "10px" },
  annLeft: { flex: 1 },
  annTitle: { margin: "0 0 4px", fontWeight: "700", fontSize: "14px", color: "#1e293b" },
  annMessage: { margin: "0 0 6px", fontSize: "13px", color: "#475569" },
  annTime: { fontSize: "11px", color: "#94a3b8" },
  deleteBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px", marginLeft: "12px", whiteSpace: "nowrap" },
};
