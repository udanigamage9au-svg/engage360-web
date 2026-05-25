import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then((r) => r.json())
      .then((data) => {
        setAnnouncements(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Format relative time
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (mins > 0) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <DashboardLayout
      activePage="announcements"
      title="Announcements"
      subtitle="Official notices and updates from the university"
    >
      <div style={styles.container}>
        {loading ? (
          <p style={styles.empty}>Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <div style={styles.emptyBox}>
            <span style={styles.emptyIcon}>📢</span>
            <p style={styles.emptyTitle}>No announcements yet</p>
            <p style={styles.emptySubtitle}>
              Check back later for updates from the university.
            </p>
          </div>
        ) : (
          <div style={styles.list}>
            {announcements.map((ann, index) => (
              <div key={ann.id} style={styles.card}>
                {/* left accent bar — alternates colour */}
                <div
                  style={{
                    ...styles.accent,
                    background: index % 3 === 0
                      ? "#295fb8"
                      : index % 3 === 1
                      ? "#facc15"
                      : "#10b981",
                  }}
                />
                <div style={styles.cardBody}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconCircle}>📢</div>
                    <div style={styles.meta}>
                      <span style={styles.tag}>General Announcement</span>
                      <span style={styles.time}>{timeAgo(ann.created_at)}</span>
                    </div>
                  </div>
                  <h3 style={styles.annTitle}>{ann.title}</h3>
                  <p style={styles.annMessage}>{ann.message}</p>
                  <span style={styles.fullDate}>
                    {new Date(ann.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Announcements;

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "0" },
  empty: { color: "#94a3b8", fontSize: "14px" },

  emptyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: { fontSize: "48px" },
  emptyTitle: { fontSize: "20px", fontWeight: "700", color: "#1e293b", margin: 0 },
  emptySubtitle: { fontSize: "14px", color: "#94a3b8", margin: 0 },

  list: { display: "flex", flexDirection: "column", gap: "16px" },

  card: {
    display: "flex",
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  accent: {
    width: "6px",
    flexShrink: 0,
    borderRadius: "0",
  },

  cardBody: {
    flex: 1,
    padding: "20px 24px",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  iconCircle: {
    width: "36px",
    height: "36px",
    background: "#eff6ff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },

  meta: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  tag: {
    background: "#eff6ff",
    color: "#295fb8",
    fontSize: "11px",
    fontWeight: "700",
    padding: "3px 10px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  time: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  annTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },

  annMessage: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
    margin: "0 0 14px 0",
  },

  fullDate: {
    fontSize: "12px",
    color: "#94a3b8",
  },
};
