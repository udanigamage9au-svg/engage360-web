import React from "react";
import DashboardLayout from "../DashboardLayout";

const ResearchCouncil = () => {
  const councilMembers = [
    { name: "Prof. Neelakshi C. Premawardhena", role: "Chairperson", dept: "Linguistics", interest: "Applied Linguistics, Multi-lingualism" },
    { name: "Dr. Thilina Pathirage", role: "Member", dept: "Computing", interest: "AI, Machine Learning, Data Science" },
    { name: "Prof. Kapila Seneviratne", role: "Member", dept: "Science", interest: "Biochemistry, Molecular Biology" },
  ];

  return (
    <DashboardLayout activePage="research" title="Research Council" subtitle="The Governing Body of University Research">
      <div style={styles.container}>
        <div style={styles.infoCard}>
          <h3>About the Council</h3>
          <p>The University Research Council (URC) oversees ethical standards, grant approvals, and research quality across all faculties at the University of Kelaniya.</p>
        </div>

        <div style={styles.grid}>
          {councilMembers.map((member, index) => (
            <div key={index} style={styles.memberCard}>
              <div style={styles.avatar}>{member.name.charAt(0)}</div>
              <h4 style={styles.name}>{member.name}</h4>
              <p style={styles.role}>{member.role}</p>
              <div style={styles.deptBadge}>{member.dept}</div>
              <p style={styles.interest}><strong>Focus:</strong> {member.interest}</p>
              <button style={styles.contactBtn}>View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "24px" },
  infoCard: { background: "#f8fafc", padding: "20px", borderRadius: "16px", borderLeft: "5px solid #295fb8" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" },
  memberCard: { background: "white", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", textAlign: "center", border: "1px solid #f1f5f9" },
  avatar: { width: "60px", height: "60px", background: "#e0f2fe", color: "#0369a1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", margin: "0 auto 15px" },
  name: { fontSize: "16px", fontWeight: "700", margin: "0 0 5px" },
  role: { fontSize: "13px", color: "#64748b", marginBottom: "10px" },
  deptBadge: { display: "inline-block", padding: "4px 12px", background: "#f1f5f9", borderRadius: "20px", fontSize: "11px", fontWeight: "600", color: "#475569", marginBottom: "10px" },
  interest: { fontSize: "12px", color: "#64748b", lineHeight: "1.4" },
  contactBtn: { marginTop: "15px", width: "100%", padding: "8px", border: "1px solid #e2e8f0", background: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }
};

export default ResearchCouncil;