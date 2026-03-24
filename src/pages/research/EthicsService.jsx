import { useState } from "react"
import DashboardLayout from "../DashboardLayout"

function EthicsService() {

  const [step, setStep] = useState(1)
  const [status] = useState("Draft")

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <DashboardLayout
      activePage="research"
      title="Ethical Clearance"
      subtitle="Submit and track your research ethics application"
    >

      <div style={styles.container}>

        {/* 🔵 STATUS TRACKER */}
        <div style={styles.statusCard}>
          <h3 style={styles.sectionTitle}>Application Status</h3>

          <div style={styles.stepper}>
            {["Draft", "Submitted", "Under Review", "Approved"].map((s, i) => (
              <div key={s} style={styles.stepWrapper}>
                <div
                  style={{
                    ...styles.stepCircle,
                    backgroundColor: status === s ? "#3b82f6" : "#e2e8f0",
                    color: status === s ? "#fff" : "#64748b"
                  }}
                >
                  {i + 1}
                </div>
                <span style={styles.stepLabel}>{s}</span>
                {i < 3 && <div style={styles.stepLine} />}
              </div>
            ))}
          </div>
        </div>

        {/* 🧾 FORM */}
        <div style={styles.formCard}>

          <div style={styles.formHeader}>
            <h2>New Ethics Application</h2>
            <span>Step {step} of 3</span>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={styles.formContent}>
              <label style={styles.label}>Project Title</label>
              <input
                type="text"
                placeholder="Enter research title..."
                style={styles.input}
              />

              <label style={styles.label}>Faculty / Department</label>
              <select style={styles.input}>
                <option>Faculty of Humanities (Linguistics)</option>
                <option>Faculty of Computing & Technology</option>
                <option>Faculty of Science</option>
              </select>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={styles.formContent}>
              <label style={styles.label}>
                Does your research involve human participants?
              </label>

              <div style={styles.radioGroup}>
                <label><input type="radio" name="human" /> Yes</label>
                <label><input type="radio" name="human" /> No</label>
              </div>

              <label style={styles.label}>Methodology Summary</label>
              <textarea
                placeholder="Describe your data collection process..."
                style={{ ...styles.input, height: "100px" }}
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={styles.formContent}>
              <div style={styles.uploadArea}>
                <p>Upload your Research Proposal (PDF)</p>
                <button style={styles.uploadBtn}>Browse Files</button>
              </div>

              <p style={styles.infoText}>
                Ensure consent forms are attached as required.
              </p>
            </div>
          )}

          {/* BUTTONS */}
          <div style={styles.buttonGroup}>
            {step > 1 && (
              <button onClick={prevStep} style={styles.btnSecondary}>
                Back
              </button>
            )}

            <button
              onClick={step === 3 ? () => alert("Submitted!") : nextStep}
              style={styles.btnPrimary}
            >
              {step === 3 ? "Submit Application" : "Next Step"}
            </button>
          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },

  statusCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  stepper: {
    display: "flex",
    justifyContent: "space-between"
  },

  stepWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    position: "relative"
  },

  stepCircle: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },

  stepLabel: {
    fontSize: "12px",
    marginTop: "6px"
  },

  stepLine: {
    position: "absolute",
    top: "17px",
    left: "50%",
    width: "100%",
    height: "2px",
    background: "#e2e8f0",
    zIndex: -1
  },

  formCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  label: {
    fontWeight: "600",
    fontSize: "14px"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0"
  },

  radioGroup: {
    display: "flex",
    gap: "20px"
  },

  uploadArea: {
    border: "2px dashed #cbd5e1",
    padding: "40px",
    borderRadius: "14px",
    textAlign: "center"
  },

  uploadBtn: {
    marginTop: "10px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    cursor: "pointer"
  },

  infoText: {
    fontSize: "12px",
    color: "#94a3b8"
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px"
  },

  btnPrimary: {
    background: "#3b82f6",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  },

  btnSecondary: {
    background: "#e2e8f0",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  }

}

export default EthicsService