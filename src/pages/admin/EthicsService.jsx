import { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";

function EthicsService() {
  const [step, setStep] = useState(1);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    project_title: "",
    faculty: "Faculty of Humanities (Linguistics)",
    involves_humans: false,
    methodology: "",
  });

  // Get user_id from localStorage (adjust key to match your auth setup)
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const user_id = user.user_id;
  const student_name = user.full_name || "Student";

  // Load this student's past applications
  useEffect(() => {
    if (!user_id) return;
    fetch(`http://localhost:5000/api/research/ethics/my/${user_id}`)
      .then((r) => r.json())
      .then((data) => setMyApplications(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [user_id, submitted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async () => {
    if (!form.project_title) return alert("Please enter a project title");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/research/ethics/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, student_name, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setStep(1);
        setForm({ project_title: "", faculty: "Faculty of Humanities (Linguistics)", involves_humans: false, methodology: "" });
        alert(`Application submitted! ID: ETH-${String(data.application_id).padStart(4, "0")}`);
      } else {
        alert("Submission failed: " + data.error);
      }
    } catch {
      alert("Could not connect to server.");
    }
    setLoading(false);
  };

  const statusColor = { Pending: "#fef9c3", "Under Review": "#dbeafe", Approved: "#dcfce7", Rejected: "#fee2e2" };

  return (
    <DashboardLayout activePage="research" title="Ethical Clearance" subtitle="Submit and track your research ethics application">
      <div style={styles.container}>

        {/* MY APPLICATIONS */}
        {myApplications.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>My Applications</h3>
            {myApplications.map((app) => (
              <div key={app.id} style={styles.appRow}>
                <div>
                  <strong>{app.project_title}</strong>
                  <p style={{ margin: "2px 0", fontSize: "12px", color: "#64748b" }}>{app.faculty}</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>
                    Submitted: {new Date(app.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span style={{ ...styles.badge, background: statusColor[app.status] || "#f1f5f9" }}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* NEW APPLICATION FORM */}
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={{ margin: 0 }}>New Ethics Application</h2>
            <span style={{ color: "#94a3b8" }}>Step {step} of 3</span>
          </div>

          {/* STEP INDICATOR */}
          <div style={styles.stepper}>
            {["Project Info", "Methodology", "Review & Submit"].map((label, i) => (
              <div key={i} style={styles.stepItem}>
                <div style={{
                  ...styles.stepCircle,
                  background: step > i ? "#22c55e" : step === i + 1 ? "#3b82f6" : "#e2e8f0",
                  color: step >= i + 1 ? "#fff" : "#64748b"
                }}>
                  {step > i ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "11px", marginTop: "4px", color: step === i + 1 ? "#1e293b" : "#94a3b8" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={styles.formContent}>
              <label style={styles.label}>Project Title *</label>
              <input name="project_title" value={form.project_title}
                onChange={handleChange} placeholder="Enter your research title..."
                style={styles.input} />
              <label style={styles.label}>Faculty / Department</label>
              <select name="faculty" value={form.faculty} onChange={handleChange} style={styles.input}>
                <option>Faculty of Humanities (Linguistics)</option>
                <option>Faculty of Computing & Technology</option>
                <option>Faculty of Science</option>
                <option>Faculty of Social Sciences</option>
              </select>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={styles.formContent}>
              <label style={styles.label}>Does your research involve human participants?</label>
              <div style={styles.radioGroup}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" name="involves_humans" checked={form.involves_humans === true}
                    onChange={() => setForm((p) => ({ ...p, involves_humans: true }))} /> Yes
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" name="involves_humans" checked={form.involves_humans === false}
                    onChange={() => setForm((p) => ({ ...p, involves_humans: false }))} /> No
                </label>
              </div>
              <label style={styles.label}>Methodology Summary</label>
              <textarea name="methodology" value={form.methodology} onChange={handleChange}
                placeholder="Describe your data collection process..."
                style={{ ...styles.input, height: "120px", resize: "vertical" }} />
            </div>
          )}

          {/* STEP 3 — REVIEW */}
          {step === 3 && (
            <div style={styles.formContent}>
              <div style={styles.reviewBox}>
                <p><strong>Project Title:</strong> {form.project_title}</p>
                <p><strong>Faculty:</strong> {form.faculty}</p>
                <p><strong>Human Participants:</strong> {form.involves_humans ? "Yes" : "No"}</p>
                <p><strong>Methodology:</strong> {form.methodology || "—"}</p>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Please review your details. Once submitted, the ethics committee will review within 5–7 working days.
              </p>
            </div>
          )}

          <div style={styles.buttonGroup}>
            {step > 1 && (
              <button onClick={() => setStep((p) => p - 1)} style={styles.btnSecondary}>
                ← Back
              </button>
            )}
            <button
              onClick={step === 3 ? handleSubmit : () => setStep((p) => p + 1)}
              style={styles.btnPrimary}
              disabled={loading}
            >
              {loading ? "Submitting..." : step === 3 ? "Submit Application" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "24px" },
  card: { background: "#fff", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  sectionTitle: { fontSize: "17px", fontWeight: "700", marginBottom: "16px" },
  appRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "10px", background: "#f8fafc", marginBottom: "10px" },
  badge: { padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" },
  formCard: { background: "#fff", padding: "30px", borderRadius: "24px", boxShadow: "0 12px 30px rgba(0,0,0,0.08)" },
  formHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  stepper: { display: "flex", justifyContent: "space-around", marginBottom: "28px" },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" },
  stepCircle: { width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" },
  formContent: { display: "flex", flexDirection: "column", gap: "16px" },
  label: { fontWeight: "600", fontSize: "14px", color: "#334155" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" },
  radioGroup: { display: "flex", gap: "20px", fontSize: "14px" },
  reviewBox: { background: "#f8fafc", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" },
  buttonGroup: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" },
  btnPrimary: { background: "#3b82f6", color: "#fff", padding: "11px 24px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: "600" },
  btnSecondary: { background: "#e2e8f0", padding: "11px 24px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: "600" },
};

export default EthicsService;