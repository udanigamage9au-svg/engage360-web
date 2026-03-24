import { useNavigate } from "react-router-dom"

function RoleSelect() {
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    navigate("/login", { state: { role } })
  }

  return (
    <div style={styles.page}>
      <div style={styles.blueGlowTop} />
      <div style={styles.yellowGlowRight} />
      <div style={styles.blueGlowBottom} />

      <span style={{ ...styles.particle, ...styles.p1 }} />
      <span style={{ ...styles.particle, ...styles.p2 }} />
      <span style={{ ...styles.particle, ...styles.p3 }} />
      <span style={{ ...styles.particle, ...styles.p4 }} />
      <span style={{ ...styles.particle, ...styles.p5 }} />
      <span style={{ ...styles.particle, ...styles.p6 }} />
      <span style={{ ...styles.particle, ...styles.p7 }} />
      <span style={{ ...styles.particle, ...styles.p8 }} />

      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome to Engage360!</h1>
          <h2 style={styles.subtitle}>Login as</h2>

          <div style={styles.roleGrid}>
            <div
              style={{ ...styles.roleBox, ...styles.studentBox }}
              onClick={() => handleRoleSelect("student")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)"
                e.currentTarget.style.boxShadow =
                  "0 18px 35px rgba(37, 99, 235, 0.18)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(15, 23, 42, 0.08)"
              }}
            >
              <div style={{ ...styles.roleTop, ...styles.studentTop }}>
                I’m a Student
              </div>
              <div style={styles.bottom}>@stu.uni.edu</div>
            </div>

            <div
              style={{ ...styles.roleBox, ...styles.adminBox }}
              onClick={() => handleRoleSelect("admin")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)"
                e.currentTarget.style.boxShadow =
                  "0 18px 35px rgba(245, 158, 11, 0.18)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(15, 23, 42, 0.08)"
              }}
            >
              <div style={{ ...styles.roleTop, ...styles.adminTop }}>
                I’m an Admin
              </div>
              <div style={styles.bottom}>@uni.edu</div>
            </div>
          </div>

          <p style={styles.note}>
            Please select your role to proceed to the login page.
          </p>

          <p style={styles.footer}>© 2026 Engage360. All rights reserved.</p>
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
      "linear-gradient(135deg, #f8fbff 0%, #f4f7fc 50%, #fffdf8 100%)",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },

  card: {
    width: "100%",
    maxWidth: "980px",
    padding: "56px 50px 42px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.62)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    boxShadow:
      "0 20px 50px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
    textAlign: "center",
  },

  title: {
    margin: 0,
    fontSize: "56px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-1.4px",
  },

  subtitle: {
    marginTop: "12px",
    marginBottom: "36px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#334155",
  },

  roleGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "28px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  roleBox: {
    width: "340px",
    borderRadius: "22px",
    overflow: "hidden",
    cursor: "pointer",
    background: "#ffffff",
    transition: "all 0.25s ease",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148, 163, 184, 0.14)",
  },

  studentBox: {},

  adminBox: {},

  roleTop: {
    height: "92px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
  },

  studentTop: {
    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
  },

  adminTop: {
    background: "linear-gradient(135deg, #eab308 0%, #d4a900 100%)",
    color: "#ffffff",
  },

  bottom: {
    height: "68px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
    color: "#475569",
    fontSize: "18px",
    fontWeight: "600",
  },

  note: {
    marginTop: "10px",
    marginBottom: "26px",
    fontSize: "18px",
    color: "#475569",
  },

  footer: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  blueGlowTop: {
    position: "absolute",
    top: "-120px",
    left: "-120px",
    width: "430px",
    height: "430px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)",
    filter: "blur(12px)",
    zIndex: 0,
  },

  yellowGlowRight: {
    position: "absolute",
    right: "-110px",
    top: "90px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(250,204,21,0.2) 0%, rgba(250,204,21,0) 70%)",
    filter: "blur(12px)",
    zIndex: 0,
  },

  blueGlowBottom: {
    position: "absolute",
    bottom: "-140px",
    left: "28%",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(96,165,250,0) 70%)",
    filter: "blur(14px)",
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
    left: "10%",
    width: "8px",
    height: "8px",
    background: "#3b82f6",
    boxShadow: "0 0 18px rgba(59,130,246,0.45)",
  },

  p2: {
    top: "20%",
    left: "18%",
    width: "10px",
    height: "10px",
    background: "#facc15",
    boxShadow: "0 0 18px rgba(250,204,21,0.42)",
  },

  p3: {
    top: "72%",
    left: "12%",
    width: "7px",
    height: "7px",
    background: "#60a5fa",
  },

  p4: {
    top: "16%",
    right: "14%",
    width: "9px",
    height: "9px",
    background: "#facc15",
    boxShadow: "0 0 16px rgba(250,204,21,0.4)",
  },

  p5: {
    top: "28%",
    right: "10%",
    width: "6px",
    height: "6px",
    background: "#3b82f6",
  },

  p6: {
    bottom: "20%",
    right: "16%",
    width: "10px",
    height: "10px",
    background: "#facc15",
    boxShadow: "0 0 18px rgba(250,204,21,0.38)",
  },

  p7: {
    bottom: "12%",
    left: "24%",
    width: "6px",
    height: "6px",
    background: "#3b82f6",
  },

  p8: {
    top: "48%",
    right: "32%",
    width: "5px",
    height: "5px",
    background: "rgba(59,130,246,0.55)",
  },
}

export default RoleSelect