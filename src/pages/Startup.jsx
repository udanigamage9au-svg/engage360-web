import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

function Startup() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      {/* soft background glows */}
      <div style={styles.blueGlowTop} />
      <div style={styles.yellowGlowRight} />
      <div style={styles.blueGlowBottom} />

      {/* floating particles */}
      <span style={{ ...styles.particle, ...styles.p1 }} />
      <span style={{ ...styles.particle, ...styles.p2 }} />
      <span style={{ ...styles.particle, ...styles.p3 }} />
      <span style={{ ...styles.particle, ...styles.p4 }} />
      <span style={{ ...styles.particle, ...styles.p5 }} />
      <span style={{ ...styles.particle, ...styles.p6 }} />
      <span style={{ ...styles.particle, ...styles.p7 }} />
      <span style={{ ...styles.particle, ...styles.p8 }} />
      <span style={{ ...styles.particle, ...styles.p9 }} />
      <span style={{ ...styles.particle, ...styles.p10 }} />
      <span style={{ ...styles.particle, ...styles.p11 }} />
      <span style={{ ...styles.particle, ...styles.p12 }} />

      <div style={styles.overlay}>
        <div style={styles.grid}>
          <div style={styles.leftContent}>
            <img src={logo} alt="Engage360 Logo" style={styles.logo} />

            <div style={styles.textBlock}>
              <h1 style={styles.line1}>Your Campus</h1>
              <h1 style={styles.line2}>Wrapped Around You</h1>
              <p style={styles.subText}>
                Student life, events, rewards, transport and campus support in
                one place.
              </p>
            </div>

            <button
              style={styles.button}
              onClick={() => navigate("/role-select")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow =
                  "0 14px 28px rgba(37, 99, 235, 0.28)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 10px 22px rgba(37, 99, 235, 0.2)"
              }}
            >
              Get Started
            </button>

            <p style={styles.footer}>
              © 2026 Engage360. All rights reserved.
            </p>
          </div>

          <div style={styles.rightContent}>
            <div style={styles.featureCard}>
              <div style={styles.orbitRing1}></div>
              <div style={styles.orbitRing2}></div>

              <div style={styles.centerBadge}>
                <div style={styles.badgeCircleBlue}></div>
                <div style={styles.badgeCircleYellow}></div>
                <div style={styles.badgeText}>360</div>
              </div>

              <div style={{ ...styles.miniChip, ...styles.chip1 }}>Events</div>
              <div style={{ ...styles.miniChip, ...styles.chip2 }}>
                Rewards
              </div>
              <div style={{ ...styles.miniChip, ...styles.chip3 }}>
                Transport
              </div>
              <div style={{ ...styles.miniChip, ...styles.chip4 }}>Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #f5f7fb 45%, #fefcf7 100%)",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },

  grid: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 60px",
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    alignItems: "center",
    gap: "20px",
  },

  leftContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "26px",
    maxWidth: "560px",
  },

  logo: {
    width: "320px",
    maxWidth: "100%",
    objectFit: "contain",
    filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.08))",
  },

  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  line1: {
    color: "#0f172a",
    fontSize: "58px",
    fontWeight: "800",
    lineHeight: "1.02",
    margin: 0,
    letterSpacing: "-1.5px",
  },

  line2: {
    color: "#334155",
    fontSize: "56px",
    fontWeight: "400",
    lineHeight: "1.02",
    margin: 0,
    letterSpacing: "-1.2px",
  },

  subText: {
    margin: "8px 0 0 0",
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#475569",
    maxWidth: "500px",
  },

  button: {
    marginTop: "6px",
    background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    padding: "16px 30px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    width: "190px",
    transition: "all 0.25s ease",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.2)",
  },

  footer: {
    marginTop: "34px",
    color: "#64748b",
    fontSize: "14px",
  },

  rightContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  featureCard: {
    position: "relative",
    width: "520px",
    height: "520px",
    borderRadius: "32px",
    background: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    backdropFilter: "blur(10px)",
    boxShadow:
      "0 20px 40px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
  },

  orbitRing1: {
    position: "absolute",
    inset: "80px",
    borderRadius: "50%",
    border: "1.5px solid rgba(37, 99, 235, 0.18)",
  },

  orbitRing2: {
    position: "absolute",
    inset: "140px",
    borderRadius: "50%",
    border: "1.5px dashed rgba(245, 158, 11, 0.22)",
  },

  centerBadge: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    overflow: "hidden",
  },

  badgeCircleBlue: {
    position: "absolute",
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.28), rgba(59,130,246,0) 70%)",
  },

  badgeCircleYellow: {
    position: "absolute",
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 70% 70%, rgba(250,204,21,0.28), rgba(250,204,21,0) 70%)",
  },

  badgeText: {
    position: "relative",
    zIndex: 2,
    fontSize: "46px",
    fontWeight: "800",
    color: "#1e3a8a",
    letterSpacing: "-1px",
  },

  miniChip: {
    position: "absolute",
    padding: "12px 18px",
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "999px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#334155",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
  },

  chip1: {
    top: "88px",
    left: "175px",
  },

  chip2: {
    top: "220px",
    right: "48px",
  },

  chip3: {
    bottom: "102px",
    left: "86px",
  },

  chip4: {
    bottom: "170px",
    right: "88px",
  },

  blueGlowTop: {
    position: "absolute",
    top: "-120px",
    left: "-120px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)",
    filter: "blur(10px)",
    zIndex: 0,
  },

  yellowGlowRight: {
    position: "absolute",
    right: "-120px",
    top: "120px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(250,204,21,0.22) 0%, rgba(250,204,21,0) 70%)",
    filter: "blur(10px)",
    zIndex: 0,
  },

  blueGlowBottom: {
    position: "absolute",
    left: "22%",
    bottom: "-180px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(96,165,250,0) 70%)",
    filter: "blur(14px)",
    zIndex: 0,
  },

  particle: {
    position: "absolute",
    borderRadius: "50%",
    zIndex: 1,
    opacity: 0.7,
  },

  p1: {
    top: "12%",
    left: "8%",
    width: "8px",
    height: "8px",
    background: "#3b82f6",
    boxShadow: "0 0 20px rgba(59,130,246,0.5)",
  },

  p2: {
    top: "18%",
    left: "15%",
    width: "12px",
    height: "12px",
    background: "#facc15",
    boxShadow: "0 0 22px rgba(250,204,21,0.45)",
  },

  p3: {
    top: "30%",
    left: "6%",
    width: "6px",
    height: "6px",
    background: "#60a5fa",
  },

  p4: {
    top: "72%",
    left: "10%",
    width: "10px",
    height: "10px",
    background: "#3b82f6",
    boxShadow: "0 0 20px rgba(59,130,246,0.4)",
  },

  p5: {
    top: "80%",
    left: "22%",
    width: "7px",
    height: "7px",
    background: "#facc15",
  },

  p6: {
    top: "16%",
    right: "12%",
    width: "10px",
    height: "10px",
    background: "#facc15",
    boxShadow: "0 0 18px rgba(250,204,21,0.45)",
  },

  p7: {
    top: "26%",
    right: "18%",
    width: "7px",
    height: "7px",
    background: "#3b82f6",
  },

  p8: {
    top: "52%",
    right: "7%",
    width: "12px",
    height: "12px",
    background: "#facc15",
    boxShadow: "0 0 20px rgba(250,204,21,0.42)",
  },

  p9: {
    bottom: "18%",
    right: "12%",
    width: "8px",
    height: "8px",
    background: "#60a5fa",
  },

  p10: {
    bottom: "12%",
    right: "22%",
    width: "6px",
    height: "6px",
    background: "#facc15",
  },

  p11: {
    top: "42%",
    left: "46%",
    width: "5px",
    height: "5px",
    background: "rgba(59,130,246,0.55)",
  },

  p12: {
    top: "64%",
    right: "34%",
    width: "5px",
    height: "5px",
    background: "rgba(250,204,21,0.6)",
  },
}

export default Startup