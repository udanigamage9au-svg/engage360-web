import React from "react";
import DashboardLayout from "../DashboardLayout";

const ResearchOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      tag: "Grant",
      title: "Undergraduate Research Fellowship 2026",
      deadline: "April 15, 2026",
      description: "Funding available for projects in Humanities and Social Sciences.",
      color: "#dcfce7", // Green
      tagColor: "#166534"
    },
    {
      id: 2,
      tag: "Symposium",
      title: "Annual Linguistics Conference - Call for Papers",
      deadline: "May 01, 2026",
      description: "Submit your abstracts for the upcoming international symposium.",
      color: "#fef9c3", // Yellow
      tagColor: "#854d0e"
    },
    {
      id: 3,
      tag: "Collaboration",
      title: "STEM Data Analysis Project",
      deadline: "Open until filled",
      description: "Looking for 2 research assistants with Python/SQL experience.",
      color: "#e0f2fe", // Blue
      tagColor: "#075985"
    }
  ];

  return (
    <DashboardLayout activePage="research" title="Research Opportunities" subtitle="Find funding and collaborations">
      <div style={styles.container}>
        <div style={styles.filterBar}>
          <button style={styles.activeFilter}>All</button>
          <button style={styles.filterBtn}>Grants</button>
          <button style={styles.filterBtn}>Conferences</button>
          <button style={styles.filterBtn}>Jobs</button>
        </div>

        <div style={styles.list}>
          {opportunities.map((op) => (
            <div key={op.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={{ ...styles.tag, backgroundColor: op.color, color: op.tagColor }}>
                  {op.tag}
                </span>
                <span style={styles.deadline}>Deadline: {op.deadline}</span>
              </div>
              <h3 style={styles.cardTitle}>{op.title}</h3>
              <p style={styles.cardDesc}>{op.description}</p>
              <button style={styles.applyBtn}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "20px" },
  filterBar: { display: "flex", gap: "10px", marginBottom: "10px" },
  filterBtn: { padding: "8px 16px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontSize: "13px" },
  activeFilter: { padding: "8px 16px", borderRadius: "20px", border: "none", background: "#295fb8", color: "white", cursor: "pointer", fontSize: "13px" },
  list: { display: "flex", flexDirection: "column", gap: "16px" },
  card: { background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  tag: { padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" },
  deadline: { fontSize: "12px", color: "#94a3b8" },
  cardTitle: { fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: "0 0 8px 0" },
  cardDesc: { fontSize: "14px", color: "#64748b", lineHeight: "1.5", marginBottom: "20px" },
  applyBtn: { padding: "10px 20px", background: "none", border: "1px solid #295fb8", color: "#295fb8", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "13px" }
};

export default ResearchOpportunities;