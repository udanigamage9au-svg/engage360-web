import { useNavigate } from "react-router-dom"
import bgImage from "../assets/startup-bg.png"
import logo from "../assets/logo.png"

function Login() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.grid}>

          <div style={styles.leftContent}>

            <img src={logo} alt="Engage360 Logo" style={styles.logo} />

            <div style={styles.textBlock}>
              <h1 style={styles.line1}>Your Campus</h1>
              <h1 style={styles.line2}>Wrapped Around You</h1>
            </div>

            <button
              style={styles.button}
              onClick={() => navigate("/login1")}
            >
              Get Started
            </button>

            <p style={styles.footer}>
              © 2026 Engage360. All rights reserved.
            </p>

          </div>

        </div>
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
      "linear-gradient(to right, rgba(7,17,45,0.9) 0%, rgba(7,17,45,0.75) 25%, rgba(7,17,45,0.3) 50%, rgba(7,17,45,0.05) 100%)",
    display: "flex",
    alignItems: "center",
  },

  grid: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },

  leftContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "28px",
    paddingLeft: "40px",
    maxWidth: "480px",
  },

  logo: {
  width: "320px",
  marginTop: "30px"
 },

  textBlock: {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
},

  line1: {
    color: "#ffffff",
    fontSize: "38px",
    fontWeight: "700",
    margin: 0,
  },

  line2: {
    color: "#ffffff",
    fontSize: "38px",
    fontWeight: "400",
    margin: 0,
  },

  button: {
  marginTop: "15px",
  backgroundColor: "#2b23f3",
  color: "#ffffff",
  border: "none",
  borderRadius: "14px",
  padding: "16px 30px",
  fontSize: "18px",
  cursor: "pointer",
  width: "180px",
  boxShadow: "0 8px 20px rgba(43,35,243,0.35)"
},

  footer: {
    marginTop: "40px",
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
  }

}

export default Login