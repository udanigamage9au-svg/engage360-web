
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/startup-bg.png"

function Login1() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome to Engage360!</h1>

          <input
            type="email"
            placeholder="griffinrodriguez@university.ac.uk"
            style={styles.input}
          />

          <input
            type="password"
            placeholder="••••••••••••••••"
            style={styles.input}
          />

          <button
            style={styles.loginButton}
            onClick={() => navigate("/dashboard")}
          >
            LOGIN
          </button>

          <div style={styles.linkRow}>
            <span style={styles.smallText}>New? </span>
            <span style={styles.signupText}>Sign up for free today</span>
          </div>

          <button style={styles.smallButton}>Forgot Password?</button>
          <button style={styles.smallButton}>Need help logging in?</button>
        </div>

        <p style={styles.footer}>© 2026 Engage 360, All rights reserved</p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  overlay: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to right, rgba(7,17,45,0.82) 0%, rgba(7,17,45,0.45) 45%, rgba(7,17,45,0.12) 100%)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "90px",
  },

  card: {
    width: "460px",
    minHeight: "450px",
    background: "rgba(18, 33, 64, 0.72)",
    backdropFilter: "blur(3px)",
    padding: "40px 38px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "2px",
  },

  title: {
    color: "#dfe5f2",
    fontSize: "28px",
    fontWeight: "400",
    marginBottom: "28px",
    textAlign: "center",
  },

  input: {
    width: "100%",
    height: "58px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#d9dee5",
    padding: "0 16px",
    fontSize: "16px",
    marginBottom: "12px",
    outline: "none",
  },

  loginButton: {
    marginTop: "14px",
    marginBottom: "40px",
    backgroundColor: "#2957c8",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    padding: "14px 38px",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    minWidth: "130px",
  },

  linkRow: {
    backgroundColor: "#e6e6e6",
    borderRadius: "10px",
    padding: "8px 18px",
    fontSize: "14px",
    marginBottom: "14px",
  },

  smallText: {
    color: "#222",
  },

  signupText: {
    color: "#3f6edc",
    cursor: "pointer",
  },

  smallButton: {
    backgroundColor: "#dcdcdc",
    border: "none",
    borderRadius: "10px",
    padding: "8px 18px",
    fontSize: "14px",
    marginBottom: "10px",
    cursor: "pointer",
    minWidth: "165px",
  },

  footer: {
    position: "absolute",
    bottom: "22px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#ffffff",
    fontSize: "14px",
  },
}

export default Login1