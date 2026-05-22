import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

const AdminResearch = () => {
  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [councilMembers, setCouncilMembers] = useState([]);

  // Modals
  const [reviewModal, setReviewModal] = useState(null);   // selected application
  const [oppModal, setOppModal] = useState(false);
  const [councilModal, setCouncilModal] = useState(false);

  // Forms
  const [oppForm, setOppForm] = useState({ tag: "Grant", title: "", description: "", deadline: "" });
  const [councilForm, setCouncilForm] = useState({ name: "", role: "Member", department: "", interests: "" });

  const fetchAll = () => {
    fetch("http://localhost:5000/api/research/ethics/all")
      .then((r) => r.json()).then((d) => setApplications(Array.isArray(d) ? d : []));
    fetch("http://localhost:5000/api/research/opportunities")
      .then((r) => r.json()).then((d) => setOpportunities(Array.isArray(d) ? d : []));
    fetch("http://localhost:5000/api/research/council")
      .then((r) => r.json()).then((d) => setCouncilMembers(Array.isArray(d) ? d : []));
  };

  useEffect(() => { fetchAll(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/research/ethics/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchAll();
    setReviewModal(null);
  };

  const postOpportunity = async () => {
    if (!oppForm.title) return alert("Title is required");
    await fetch("http://localhost:5000/api/research/opportunities/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oppForm),
    });
    setOppModal(false);
    setOppForm({ tag: "Grant", title: "", description: "", deadline: "" });
    fetchAll();
  };

  const deleteOpportunity = async (id) => {
    if (!window.confirm("Delete this opportunity?")) return;
    await fetch(`http://localhost:5000/api/research/opportunities/delete/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const addCouncilMember = async () => {
    if (!councilForm.name) return alert("Name is required");
    await fetch("http://localhost:5000/api/research/council/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(councilForm),
    });
    setCouncilModal(false);
    setCouncilForm({ name: "", role: "Member", department: "", interests: "" });
    fetchAll();
  };

  const deleteCouncilMember = async (id) => {
    if (!window.confirm("Remove this council member?")) return;
    await fetch(`http://localhost:5000/api/research/council/delete/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const statusColor = { Pending: "#fef9c3", "Under Review": "#dbeafe", Approved: "#dcfce7", Rejected: "#fee2e2" };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Research Management</h1>

        {/* ETHICS APPLICATIONS */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Ethical Clearance Applications
            <span style={styles.countBadge}>{applications.length}</span>
          </h3>
          {applications.length === 0 ? (
            <p style={{ color: "#94a3b8", padding: "10px" }}>No applications submitted yet.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Student</th>
                  <th style={styles.th}>Project</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td style={styles.td}>ETH-{String(app.id).padStart(4, "0")}</td>
                    <td style={styles.td}>{app.student_name}</td>
                    <td style={styles.td}>{app.project_title}</td>
                    <td style={styles.td}>{new Date(app.created_at).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, background: statusColor[app.status] || "#f1f5f9" }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => setReviewModal(app)}>
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* BOTTOM GRID */}
        <div style={styles.actionGrid}>

          {/* MANAGE COUNCIL */}
          <div style={styles.miniCard}>
            <h4 style={{ marginBottom: "8px" }}>👨‍🏫 Research Council ({councilMembers.length} members)</h4>
            <div style={{ marginBottom: "12px" }}>
              {councilMembers.map((m) => (
                <div key={m.id} style={styles.memberRow}>
                  <span style={{ fontSize: "13px" }}>{m.name} — <em style={{ color: "#64748b" }}>{m.role}</em></span>
                  <button onClick={() => deleteCouncilMember(m.id)} style={styles.deleteBtn}>✕</button>
                </div>
              ))}
            </div>
            <button style={styles.manageBtn} onClick={() => setCouncilModal(true)}>+ Add Member</button>
          </div>

          {/* POST OPPORTUNITIES */}
          <div style={styles.miniCard}>
            <h4 style={{ marginBottom: "8px" }}>📢 Research Opportunities ({opportunities.length} active)</h4>
            <div style={{ marginBottom: "12px" }}>
              {opportunities.map((op) => (
                <div key={op.id} style={styles.memberRow}>
                  <span style={{ fontSize: "13px" }}>{op.title}</span>
                  <button onClick={() => deleteOpportunity(op.id)} style={styles.deleteBtn}>✕</button>
                </div>
              ))}
            </div>
            <button style={styles.manageBtn} onClick={() => setOppModal(true)}>+ Post Opportunity</button>
          </div>
        </div>

        {/* ── REVIEW MODAL ── */}
        {reviewModal && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3 style={{ marginBottom: "4px" }}>Review Application</h3>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
                ETH-{String(reviewModal.id).padStart(4, "0")}
              </p>
              <div style={styles.reviewGrid}>
                <div><strong>Student:</strong> {reviewModal.student_name}</div>
                <div><strong>Faculty:</strong> {reviewModal.faculty}</div>
                <div style={{ gridColumn: "1/-1" }}><strong>Project:</strong> {reviewModal.project_title}</div>
                <div><strong>Human Participants:</strong> {reviewModal.involves_humans ? "Yes" : "No"}</div>
                <div><strong>Current Status:</strong>
                  <span style={{ ...styles.badge, background: statusColor[reviewModal.status], marginLeft: "6px" }}>
                    {reviewModal.status}
                  </span>
                </div>
                {reviewModal.methodology && (
                  <div style={{ gridColumn: "1/-1" }}>
                    <strong>Methodology:</strong>
                    <p style={{ margin: "4px 0 0", color: "#475569", fontSize: "13px" }}>{reviewModal.methodology}</p>
                  </div>
                )}
              </div>
              <p style={{ fontWeight: "600", marginBottom: "10px", marginTop: "16px" }}>Update Status:</p>
              <div style={styles.statusBtns}>
                {["Pending", "Under Review", "Approved", "Rejected"].map((s) => (
                  <button key={s}
                    style={{ ...styles.statusBtn, background: reviewModal.status === s ? "#3f479b" : "#f1f5f9", color: reviewModal.status === s ? "#fff" : "#334155" }}
                    onClick={() => updateStatus(reviewModal.id, s)}>
                    {s}
                  </button>
                ))}
              </div>
              <button style={styles.closeBtn} onClick={() => setReviewModal(null)}>Close</button>
            </div>
          </div>
        )}

        {/* ── POST OPPORTUNITY MODAL ── */}
        {oppModal && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3 style={{ marginBottom: "16px" }}>Post Research Opportunity</h3>
              {[
                { label: "Tag", name: "tag", type: "select", options: ["Grant", "Symposium", "Collaboration"] },
                { label: "Title *", name: "title", type: "text" },
                { label: "Description", name: "description", type: "textarea" },
                { label: "Deadline", name: "deadline", type: "text", placeholder: "e.g. April 15, 2026" },
              ].map(({ label, name, type, options, placeholder }) => (
                <div key={name} style={{ marginBottom: "14px" }}>
                  <label style={styles.label}>{label}</label>
                  {type === "select" ? (
                    <select style={styles.input} value={oppForm[name]}
                      onChange={(e) => setOppForm((p) => ({ ...p, [name]: e.target.value }))}>
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : type === "textarea" ? (
                    <textarea style={{ ...styles.input, height: "80px" }} value={oppForm[name]}
                      onChange={(e) => setOppForm((p) => ({ ...p, [name]: e.target.value }))} />
                  ) : (
                    <input style={styles.input} value={oppForm[name]} placeholder={placeholder}
                      onChange={(e) => setOppForm((p) => ({ ...p, [name]: e.target.value }))} />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={styles.actionBtn} onClick={postOpportunity}>Post</button>
                <button style={styles.closeBtn} onClick={() => setOppModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ── ADD COUNCIL MEMBER MODAL ── */}
        {councilModal && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3 style={{ marginBottom: "16px" }}>Add Council Member</h3>
              {[
                { label: "Full Name *", name: "name", type: "text" },
                { label: "Role", name: "role", type: "select", options: ["Chairperson", "Member", "Secretary"] },
                { label: "Department", name: "department", type: "text" },
                { label: "Research Interests", name: "interests", type: "text" },
              ].map(({ label, name, type, options }) => (
                <div key={name} style={{ marginBottom: "14px" }}>
                  <label style={styles.label}>{label}</label>
                  {type === "select" ? (
                    <select style={styles.input} value={councilForm[name]}
                      onChange={(e) => setCouncilForm((p) => ({ ...p, [name]: e.target.value }))}>
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input style={styles.input} value={councilForm[name]}
                      onChange={(e) => setCouncilForm((p) => ({ ...p, [name]: e.target.value }))} />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={styles.actionBtn} onClick={addCouncilMember}>Add</button>
                <button style={styles.closeBtn} onClick={() => setCouncilModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto" },
  title: { fontSize: "26px", fontWeight: "600", marginBottom: "25px" },
  section: { background: "#dcdde1", padding: "20px", borderRadius: "10px", marginBottom: "20px" },
  sectionTitle: { marginBottom: "15px", fontSize: "16px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px" },
  countBadge: { background: "#3f479b", color: "#fff", borderRadius: "20px", padding: "2px 10px", fontSize: "12px" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden" },
  th: { textAlign: "left", padding: "12px", background: "#3f479b", color: "#fff", fontSize: "13px" },
  td: { padding: "12px", borderBottom: "1px solid #eee", fontSize: "13px" },
  badge: { padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" },
  actionBtn: { background: "#3f479b", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" },
  actionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  miniCard: { background: "#dcdde1", padding: "20px", borderRadius: "10px" },
  manageBtn: { width: "100%", padding: "10px", background: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
  memberRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: "#fff", borderRadius: "6px", marginBottom: "6px" },
  deleteBtn: { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "14px", fontWeight: "bold" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 },
  modal: { background: "#fff", padding: "30px", borderRadius: "16px", width: "480px", maxHeight: "85vh", overflowY: "auto" },
  reviewGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#f8fafc", padding: "16px", borderRadius: "10px", fontSize: "14px" },
  statusBtns: { display: "flex", gap: "8px", flexWrap: "wrap" },
  statusBtn: { padding: "8px 14px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
  closeBtn: { marginTop: "14px", padding: "9px 20px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  label: { fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px" },
  input: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", boxSizing: "border-box" },
};

export default AdminResearch;