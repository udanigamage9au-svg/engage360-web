import { useState } from "react"
import logo from "../assets/logo.png"

function ReportIssue() {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    description: "",
    fileName: "",
  })

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "screenshot" && files && files[0]) {
      setFormData({
        ...formData,
        fileName: files[0].name,
      })
      setMessage("")
      setMessageType("")
      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
    setMessage("")
    setMessageType("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.studentId || !formData.description) {
      setMessage("Please complete all required fields.")
      setMessageType("error")
      return
    }

    setMessage("Issue submitted successfully.")
    setMessageType("success")
  }

  return (
    <div style={styles.page}>
      <div style={styles.blueGlowTop} />
      <div style={styles.yellowGlowRight} />
      <div style={styles.blueGlowBottom} />
      <div style={styles.yellowGlowLeft} />

      <span style={{ ...styles.particle, ...styles.p1 }} />
      <span style={{ ...styles.particle, ...styles.p2 }} />
      <span style={{ ...styles.particle, ...styles.p3 }} />
      <span style={{ ...styles.particle, ...styles.p4 }} />
      <span style={{ ...styles.particle, ...styles.p5 }} />
      <span style={{ ...styles.particle, ...styles.p6 }} />
      <span style={{ ...styles.particle, ...styles.p7 }} />
      <span style={{ ...styles.particle, ...styles.p8 }} />

      <div style={styles.overlay}>
        <div style={styles.wrapper}>
          <div style={styles.logoBar}>
            <img src={logo} alt="Engage360 Logo" style={styles.logo} />
          </div>

          <div style={styles.card}>
            <div style={styles.badge}>Support Center</div>

            <h1 style={styles.title}>Report an Issue</h1>
            <p style={styles.subtitle}>
              Please provide details of the issue you’re experiencing.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={handleChange}
                style={styles.input}
              />

              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                placeholder="Describe the technical issue here..."
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
              />

              <div style={styles.uploadBox}>
                <div style={styles.uploadLeft}>
                  <div style={styles.uploadIcon}>↑</div>
                  <div>
                    <p style={styles.uploadTitle}>Upload Screenshot</p>
                    <p style={styles.uploadHint}>
                      Add a screenshot if it helps explain the issue
                    </p>
                  </div>
                </div>

                <label style={styles.uploadButton}>
                  Choose File
                  <input
                    type="file"
                    name="screenshot"
                    onChange={handleChange}
                    style={styles.fileInput}
                  />
                </label>
              </div>

              <p style={styles.fileName}>
                {formData.fileName || "No screenshot uploaded"}
              </p>

              {message && (
                <p
                  style={{
                    ...styles.message,
                    ...(messageType === "error"
                      ? styles.errorMessage
                      : styles.successMessage),
                  }}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(37, 99, 235, 0.28)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow =
                    "0 10px 22px rgba(37, 99, 235, 0.2)"
                }}
              >
                Submit
              </button>
            </form>

            <p style={styles.footer}>© 2026 Engage360. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #f4f7fc 48%, #fffdf8 100%)",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },

  wrapper: {
    width: "100%",
    maxWidth: "920px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
  },

  logoBar: {
    width: "100%",
    maxWidth: "760px",
    height: "84px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 18px 40px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.75)",
  },

  logo: {
    width: "250px",
    maxWidth: "100%",
    objectFit: "contain",
  },

  card: {
    width: "100%",
    maxWidth: "760px",
    background: "rgba(255,255,255,0.68)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "28px",
    padding: "32px",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 20px 50px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#1d4ed8",
    background: "rgba(37, 99, 235, 0.1)",
    border: "1px solid rgba(37, 99, 235, 0.14)",
    marginBottom: "16px",
  },

  title: {
    margin: "0 0 8px 0",
    fontSize: "40px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-1px",
    lineHeight: "1.08",
  },

  subtitle: {
    margin: "0 0 24px 0",
    fontSize: "17px",
    color: "#475569",
    lineHeight: "1.6",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    height: "54px",
    padding: "0 16px",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "rgba(255,255,255,0.9)",
    fontSize: "16px",
    color: "#0f172a",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.03)",
  },

  label: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#334155",
    marginTop: "2px",
  },

  textarea: {
    minHeight: "150px",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "rgba(255,255,255,0.9)",
    fontSize: "16px",
    color: "#0f172a",
    resize: "vertical",
    outline: "none",
    lineHeight: "1.6",
    boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.03)",
  },

  uploadBox: {
    marginTop: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
    flexWrap: "wrap",
  },

  uploadLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  uploadIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(37, 99, 235, 0.1)",
    color: "#2563eb",
    fontSize: "20px",
    fontWeight: "700",
  },

  uploadTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#334155",
  },

  uploadHint: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#64748b",
  },

  uploadButton: {
    position: "relative",
    padding: "12px 18px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.16)",
  },

  fileInput: {
    display: "none",
  },

  fileName: {
    margin: "2px 0 0 0",
    fontSize: "14px",
    color: "#64748b",
  },

  message: {
    margin: 0,
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    textAlign: "left",
  },

  errorMessage: {
    color: "#dc2626",
    background: "rgba(254, 226, 226, 0.9)",
    border: "1px solid rgba(248, 113, 113, 0.2)",
  },

  successMessage: {
    color: "#166534",
    background: "rgba(220, 252, 231, 0.9)",
    border: "1px solid rgba(74, 222, 128, 0.2)",
  },

  button: {
    marginTop: "6px",
    alignSelf: "center",
    width: "180px",
    height: "52px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.2)",
  },

  footer: {
    textAlign: "center",
    marginTop: "22px",
    fontSize: "14px",
    color: "#64748b",
  },

  blueGlowTop: {
    position: "absolute",
    top: "-140px",
    left: "-120px",
    width: "430px",
    height: "430px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)",
    filter: "blur(14px)",
    zIndex: 0,
  },

  yellowGlowRight: {
    position: "absolute",
    right: "-120px",
    top: "120px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(250,204,21,0.2) 0%, rgba(250,204,21,0) 70%)",
    filter: "blur(14px)",
    zIndex: 0,
  },

  blueGlowBottom: {
    position: "absolute",
    bottom: "-140px",
    left: "24%",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(96,165,250,0) 70%)",
    filter: "blur(16px)",
    zIndex: 0,
  },

  yellowGlowLeft: {
    position: "absolute",
    left: "-90px",
    bottom: "80px",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(250,204,21,0.12) 0%, rgba(250,204,21,0) 70%)",
    filter: "blur(16px)",
    zIndex: 0,
  },

  particle: {
    position: "absolute",
    borderRadius: "50%",
    zIndex: 1,
    opacity: 0.75,
  },

  p1: {
    top: "12%",
    left: "8%",
    width: "8px",
    height: "8px",
    background: "#3b82f6",
    boxShadow: "0 0 18px rgba(59,130,246,0.42)",
  },

  p2: {
    top: "22%",
    left: "15%",
    width: "11px",
    height: "11px",
    background: "rgba(96,165,250,0.42)",
    boxShadow: "0 0 20px rgba(96,165,250,0.22)",
  },

  p3: {
    top: "16%",
    right: "12%",
    width: "10px",
    height: "10px",
    background: "#facc15",
    boxShadow: "0 0 18px rgba(250,204,21,0.34)",
  },

  p4: {
    top: "38%",
    right: "10%",
    width: "6px",
    height: "6px",
    background: "#60a5fa",
  },

  p5: {
    bottom: "18%",
    left: "12%",
    width: "7px",
    height: "7px",
    background: "#3b82f6",
  },

  p6: {
    bottom: "14%",
    right: "13%",
    width: "10px",
    height: "10px",
    background: "#facc15",
  },

  p7: {
    top: "58%",
    left: "18%",
    width: "5px",
    height: "5px",
    background: "rgba(59,130,246,0.55)",
  },

  p8: {
    top: "68%",
    right: "28%",
    width: "5px",
    height: "5px",
    background: "rgba(250,204,21,0.55)",
  },
}

export default ReportIssue