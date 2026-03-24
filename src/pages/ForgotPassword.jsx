import { useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/logo.png"

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleReset = (e) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your university email.")
      setMessageType("error")
      return
    }

    setMessage("Reset link sent successfully.")
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
            <div style={styles.badge}>Account Recovery</div>

            <h1 style={styles.title}>Forgot Password?</h1>
            <p style={styles.subtitle}>
              Enter your university email and we’ll send you a reset link.
            </p>

            <form onSubmit={handleReset} style={styles.form}>
              <input
                type="email"
                placeholder="name@university.ac.uk"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setMessage("")
                  setMessageType("")
                }}
                style={styles.input}
              />

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
                Send Reset Link
              </button>
            </form>

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

            <p style={styles.bottomText}>
              Remember your password?
              <button
                type="button"
                style={styles.link}
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </p>
          </div>

          <p style={styles.footer}>© 2026 Engage360. All rights reserved.</p>
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
    alignItems: "center",
    justifyContent: "center",
    padding: "18px 20px",
  },

  wrapper: {
    width: "100%",
    maxWidth: "980px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoBar: {
    width: "100%",
    maxWidth: "900px",
    height: "76px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "18px",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 14px 30px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.75)",
  },

  logo: {
    width: "220px",
    maxWidth: "100%",
    objectFit: "contain",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "26px",
    padding: "30px 28px",
    textAlign: "center",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 18px 40px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.75)",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 13px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#1d4ed8",
    background: "rgba(37, 99, 235, 0.1)",
    border: "1px solid rgba(37, 99, 235, 0.14)",
    marginBottom: "14px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#0f172a",
    letterSpacing: "-0.8px",
    lineHeight: "1.08",
  },

  subtitle: {
    fontSize: "15px",
    margin: "0 0 22px 0",
    color: "#475569",
    lineHeight: "1.6",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    height: "50px",
    padding: "0 16px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "rgba(255,255,255,0.9)",
    fontSize: "16px",
    color: "#0f172a",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.03)",
  },

  button: {
    height: "50px",
    background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.2)",
  },

  message: {
    marginTop: "16px",
    padding: "11px 12px",
    borderRadius: "10px",
    fontSize: "13px",
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

  bottomText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#64748b",
  },

  link: {
    marginLeft: "8px",
    background: "none",
    border: "none",
    color: "#2563eb",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    padding: 0,
  },

  footer: {
    marginTop: "16px",
    color: "#64748b",
    fontSize: "13px",
  },

  blueGlowTop: {
    position: "absolute",
    top: "-140px",
    left: "-120px",
    width: "380px",
    height: "380px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)",
    filter: "blur(14px)",
    zIndex: 0,
  },

  yellowGlowRight: {
    position: "absolute",
    right: "-120px",
    top: "140px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(250,204,21,0.16) 0%, rgba(250,204,21,0) 70%)",
    filter: "blur(14px)",
    zIndex: 0,
  },

  blueGlowBottom: {
    position: "absolute",
    bottom: "-120px",
    left: "22%",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(96,165,250,0.12) 0%, rgba(96,165,250,0) 70%)",
    filter: "blur(16px)",
    zIndex: 0,
  },

  yellowGlowLeft: {
    position: "absolute",
    left: "-90px",
    bottom: "70px",
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
    opacity: 0.72,
  },

  p1: {
    top: "14%",
    left: "8%",
    width: "8px",
    height: "8px",
    background: "#3b82f6",
  },

  p2: {
    top: "30%",
    left: "10%",
    width: "10px",
    height: "10px",
    background: "rgba(96,165,250,0.42)",
  },

  p3: {
    top: "18%",
    right: "12%",
    width: "9px",
    height: "9px",
    background: "#facc15",
  },

  p4: {
    top: "42%",
    right: "14%",
    width: "6px",
    height: "6px",
    background: "#60a5fa",
  },

  p5: {
    bottom: "16%",
    left: "14%",
    width: "7px",
    height: "7px",
    background: "#3b82f6",
  },

  p6: {
    bottom: "18%",
    right: "10%",
    width: "9px",
    height: "9px",
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

export default ForgotPassword