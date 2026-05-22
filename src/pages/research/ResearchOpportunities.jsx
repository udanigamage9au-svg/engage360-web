import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";

const tagColors = {
  Grant: { bg: "#dcfce7", text: "#166534" },
  Symposium: { bg: "#fef9c3", text: "#854d0e" },
  Collaboration: { bg: "#e0f2fe", text: "#075985" },
};

const ResearchOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/research/opportunities")
      .then((r) => r.json())
      .then((data) => { setOpportunities(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? opportunities : opportunities.filter((o) => o.tag === filter);

  return (
    <DashboardLayout activePage="research" title="Research Opportunities" subtitle="Find funding and collaborations">
      <div style={styles.container}>
        <div style={styles.filterBar}>
          {["All", "Grant", "Symposium", "Collaboration"].map((f) => (
            <button key={f}
              style={filter === f ? styles.activeFilter : styles.filterBtn}
              onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#94a3b8" }}>Loading opportunities...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No opportunities available right now. Check back soon!</p>
        ) : (
          <div style={styles.list}>
            {filtered.map((op) => {
              const colors = tagColors[op.tag] || { bg: "#f1f5f9", text: "#334155" };
              return (
                <div key={op.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={{ ...styles.tag, backgroundColor: colors.bg, color: colors.text }}>
                      {op.tag}
                    </span>
                    <span style={styles.deadline}>Deadline: {op.deadline || "Open"}</span>
                  </div>
                  <h3 style={styles.cardTitle}>{op.title}</h3>
                  <p style={styles.cardDesc}>{op.description}</p>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    Posted: {new Date(op.created_at).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "20px" },
  filterBar: { display: "flex", gap: "10px" },
  filterBtn: { padding: "8px 16px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontSize: "13px" },
  activeFilter: { padding: "8px 16px", borderRadius: "20px", border: "none", background: "#295fb8", color: "white", cursor: "pointer", fontSize: "13px" },
  list: { display: "flex", flexDirection: "column", gap: "16px" },
  card: { background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  tag: { padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" },
  deadline: { fontSize: "12px", color: "#94a3b8" },
  cardTitle: { fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: "0 0 8px 0" },
  cardDesc: { fontSize: "14px", color: "#64748b", lineHeight: "1.5", marginBottom: "12px" },
};

export default ResearchOpportunities;