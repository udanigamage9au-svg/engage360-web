import React from "react";
import DashboardLayout from "../DashboardLayout";

const ResearchGuidance = () => {
  const categories = [
    {
      title: "Writing Templates",
      resources: [
        { name: "Undergraduate Thesis Template", format: "DOCX", size: "1.5MB" },
        { name: "Research Proposal Format", format: "PDF", size: "800KB" },
      ]
    },
    {
      title: "Citation Styles",
      resources: [
        { name: "APA 7th Edition Summary", format: "PDF", size: "1.1MB" },
        { name: "Harvard Referencing Guide", format: "PDF", size: "950KB" },
      ]
    }
  ];

  return (
    <DashboardLayout activePage="research" title="Research Guidance" subtitle="Academic manuals and formatting templates">
      <div style={styles.container}>
        {/* Search Bar for Guidance */}
        <div style={styles.searchSection}>
          <input type="text" placeholder="Search for templates or guides..." style={styles.searchInput} />
        </div>

        <div style={styles.grid}>
          {categories.map((cat, idx) => (
            <div key={idx} style={styles.categoryCard}>
              <h3 style={styles.categoryTitle}>{cat.title}</h3>
              <div style={styles.resourceList}>
                {cat.resources.map((res, i) => (
                  <div key={i} style={styles.resourceItem}>
                    <div style={styles.resInfo}>
                      <span style={styles.resName}>{res.name}</span>
                      <span style={styles.resMeta}>{res.format} • {res.size}</span>
                    </div>
                    <button style={styles.downloadBtn}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro-Tip Section */}
        <div style={styles.tipBox}>
          <span style={styles.tipIcon}>💡</span>
          <p style={styles.tipText}>
            <strong>Pro Tip:</strong> Always check with your specific department (e.g., Linguistics) for any unique formatting requirements before final submission.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "24px" },
  searchSection: { width: "100%", maxWidth: "500px" },
  searchInput: { width: "100%", padding: "12px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" },
  categoryCard: { background: "white", padding: "24px", borderRadius: "20px", border: "1px solid #f1f5f9", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  categoryTitle: { fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "20px", borderBottom: "2px solid #3b82f6", display: "inline-block", paddingBottom: "4px" },
  resourceList: { display: "flex", flexDirection: "column", gap: "16px" },
  resourceItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "10px", background: "#f8fafc", transition: "transform 0.2s" },
  resInfo: { display: "flex", flexDirection: "column", gap: "2px" },
  resName: { fontSize: "14px", fontWeight: "600", color: "#334155" },
  resMeta: { fontSize: "12px", color: "#94a3b8" },
  downloadBtn: { background: "#295fb8", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
  tipBox: { display: "flex", gap: "12px", alignItems: "center", background: "#eff6ff", padding: "16px", borderRadius: "12px", border: "1px solid #bfdbfe" },
  tipIcon: { fontSize: "20px" },
  tipText: { fontSize: "14px", color: "#1e40af", margin: 0 }
};

export default ResearchGuidance;