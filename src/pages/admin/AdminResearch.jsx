import React from "react";
import AdminLayout from "./AdminLayout";

const AdminResearch = () => {
  const applications = [
    { id: "ETH-2026-001", student: "Udani Gamage", status: "Pending", date: "2026-03-18" },
    { id: "ETH-2026-002", student: "Sam Silva", status: "Approved", date: "2026-03-15" },
  ];

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Research Management</h1>

        {/* SECTION: ETHICAL CLEARANCE REVIEWS */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Ethical Clearance Applications</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tr}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} style={styles.tr}>
                  <td style={styles.td}>{app.id}</td>
                  <td style={styles.td}>{app.student}</td>
                  <td style={styles.td}>{app.date}</td>
                  <td style={styles.td}>
                    <span style={{...styles.badge, background: app.status === "Pending" ? "#fef9c3" : "#dcfce7"}}>
                      {app.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.actionBtn}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION: CONTENT MANAGEMENT */}
        <div style={styles.actionGrid}>
          <div style={styles.miniCard}>
            <h4>Manage Council</h4>
            <p>Update faculty member list</p>
            <button style={styles.manageBtn}>Edit Members</button>
          </div>
          <div style={styles.miniCard}>
            <h4>Research News</h4>
            <p>Post new opportunities</p>
            <button style={styles.manageBtn}>Post Opportunity</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto" },
  title: { fontSize: "26px", fontWeight: "600", marginBottom: "25px" },
  section: { background: "#dcdde1", padding: "20px", borderRadius: "10px", marginBottom: "20px" },
  sectionTitle: { marginBottom: "15px", fontSize: "16px", fontWeight: "600" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden" },
  th: { textAlign: "left", padding: "12px", background: "#3f479b", color: "#fff", fontSize: "14px" },
  td: { padding: "12px", borderBottom: "1px solid #eee", fontSize: "13px" },
  badge: { padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
  actionBtn: { background: "#3f479b", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" },
  actionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  miniCard: { background: "#dcdde1", padding: "20px", borderRadius: "10px" },
  manageBtn: { marginTop: "10px", width: "100%", padding: "10px", background: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }
};

export default AdminResearch;