import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

function ContactSupport() {
  const navigate = useNavigate()

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
            <div style={styles.badge}>IT Assistance</div>

            <h1 style={styles.title}>Contact IT Support</h1>
            <p style={styles.subtitle}>
              If you need assistance, our IT team is here to help.
            </p>

            <div
              style={styles.item}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow =
                  "0 14px 28px rgba(15, 23, 42, 0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 8px 18px rgba(15, 23, 42, 0.04)"
              }}
            >
              <div style={styles.itemLeft}>
                <div style={styles.iconBox}>✉️</div>
                <div>
                  <h3 style={styles.itemTitle}>Email</h3>
                  <p style={styles.itemText}>support@university.ac.uk</p>
                </div>
              </div>
              <span style={styles.arrow}>›</span>
            </div>

            <div
              style={styles.item}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow =
                  "0 14px 28px rgba(15, 23, 42, 0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 8px 18px rgba(15, 23, 42, 0.04)"
              }}
            >
              <div style={styles.itemLeft}>
                <div style={styles.iconBox}>📞</div>
                <div>
                  <h3 style={styles.itemTitle}>Phone</h3>
                  <p style={styles.itemText}>(123) 456-7890</p>
                </div>
              </div>
              <span style={styles.arrow}>›</span>
            </div>

            <div
              style={styles.item}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow =
                  "0 14px 28px rgba(15, 23, 42, 0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 8px 18px rgba(15, 23, 42, 0.04)"
              }}
            >
              <div style={styles.itemLeft}>
                <div style={styles.iconBox}>💬</div>
                <div>
                  <h3 style={styles.itemTitle}>Live Chat</h3>
                  <p style={styles.itemText}>Quick support inside the platform</p>
                </div>
              </div>

              <div style={styles.rightText}>
                <span style={styles.comingSoon}>Coming Soon</span>
                <span style={styles.arrow}>›</span>
              </div>
            </div>

            <button
              style={styles.button}
              onClick={() => navigate("/report-issue")}
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
              Report Issue
            </button>

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
    maxWidth: "700px",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "26px",
    padding: "28px 26px",
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
    textAlign: "center",
    fontSize: "34px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#0f172a",
    letterSpacing: "-0.8px",
    lineHeight: "1.08",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "15px",
    color: "#475569",
    margin: "0 0 22px 0",
    lineHeight: "1.6",
  },

  item: {
    background: "rgba(255,255,255,0.82)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "18px",
    padding: "18px 18px",
    marginBottom: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.22s ease",
    boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
    cursor: "pointer",
  },

  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  iconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(37, 99, 235, 0.1)",
    fontSize: "22px",
  },

  itemTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 4px 0",
  },

  itemText: {
    fontSize: "14px",
    color: "#475569",
    margin: 0,
  },

  rightText: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  comingSoon: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
  },

  arrow: {
    fontSize: "32px",
    lineHeight: 1,
    color: "#334155",
  },

  button: {
    display: "block",
    margin: "18px auto 0",
    width: "230px",
    height: "50px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.2)",
  },

  footer: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "13px",
    color: "#64748b",
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

export default ContactSupport