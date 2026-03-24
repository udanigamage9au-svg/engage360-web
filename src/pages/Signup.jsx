import { useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/logo.png"

function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  })

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  setMessage("");
  setMessageType("");
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ CLEAR OLD MESSAGE FIRST
  setMessage("");
  setMessageType("");

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.studentId ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setMessage("Please fill in all fields.");
    setMessageType("error");
    return;
  }

  if (!formData.email.endsWith("@stu.uni.edu")) {
    setMessage("Student signup must use an email ending with @stu.uni.edu");
    setMessageType("error");
    return;
  }

  console.log("Password:", formData.password);
  console.log("Confirm:", formData.confirmPassword);

  if (formData.password.trim() !== formData.confirmPassword.trim()) {
    setMessage("Passwords do not match.");
    setMessageType("error");
    return;
  }

  // ✅ NOW CALL BACKEND
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  full_name: formData.fullName,
  email: formData.email,
  student_id: formData.studentId,
  password: formData.password,
  confirmPassword: formData.confirmPassword,
})
    });

    const data = await response.json();

    if (response.ok) {
  // ✅ store user (optional for now)
  localStorage.setItem("user", JSON.stringify(data.user || {}));

  // ✅ redirect
  navigate("/dashboard");
} else {
      setMessage(data.message || "Signup failed");
      setMessageType("error");
    }
  } catch (error) {
    console.error(error);
    setMessage("Server error");
    setMessageType("error");
  }
};

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

      <div style={styles.overlay}>
        <div style={styles.wrapper}>
          <div style={styles.brandBar}>
            <img src={logo} alt="Engage360 Logo" style={styles.logo} />
          </div>

          <div style={styles.contentArea}>
            <div style={styles.formCard}>
              <div style={styles.badge}>Student Registration</div>

              <h1 style={styles.title}>Create Your Account</h1>
              <p style={styles.subtitle}>
                Sign up to start engaging with your campus community
              </p>

              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="name@stu.uni.edu"
                  value={formData.email}
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

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={styles.input}
                />

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

                <button type="submit" style={styles.button}>
                  Create Account
                </button>
              </form>

              <div style={styles.linkRow}>
                <button
                  type="button"
                  style={styles.smallLink}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>

                <button
                  type="button"
                  style={styles.smallLink}
                  onClick={() => navigate("/help")}
                >
                  Need Help Logging In?
                </button>
              </div>

              <div style={styles.bottomRow}>
                <p style={styles.signInText}>
                  Already have an account?
                  <button
                    type="button"
                    style={styles.signInLink}
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </button>
                </p>
              </div>

              <p style={styles.footer}>© 2026 Engage360. All rights reserved.</p>
            </div>

            <div style={styles.visualPanel}>
              <div style={styles.visualCard}>
                <div style={styles.orbit1}></div>
                <div style={styles.orbit2}></div>

                <div style={styles.centerCircle}>
                  <div style={styles.centerBlueGlow}></div>
                  <div style={styles.centerYellowGlow}></div>
                  <span style={styles.centerText}>360</span>
                </div>

                <div style={{ ...styles.featureChip, ...styles.chip1 }}>
                  Campus Life
                </div>
                <div style={{ ...styles.featureChip, ...styles.chip2 }}>
                  Rewards
                </div>
                <div style={{ ...styles.featureChip, ...styles.chip3 }}>
                  Events
                </div>
                <div style={{ ...styles.featureChip, ...styles.chip4 }}>
                  Support
                </div>
              </div>
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
    padding: "16px 20px",
  },

  wrapper: {
    width: "100%",
    maxWidth: "1180px",
  },

  brandBar: {
    height: "74px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 14px 30px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.75)",
  },

  logo: {
    width: "220px",
    maxWidth: "100%",
    objectFit: "contain",
  },

  contentArea: {
    display: "grid",
    gridTemplateColumns: "1fr 0.9fr",
    gap: "18px",
    alignItems: "stretch",
  },

  formCard: {
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "24px",
    padding: "24px 24px 20px",
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
    fontSize: "32px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 6px 0",
    lineHeight: "1.08",
    letterSpacing: "-0.8px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#475569",
    margin: "0 0 18px 0",
    lineHeight: "1.5",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    height: "48px",
    padding: "0 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "rgba(255,255,255,0.9)",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.03)",
  },

  message: {
    margin: 0,
    padding: "10px 12px",
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

  button: {
    marginTop: "6px",
    height: "48px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.18)",
  },

  linkRow: {
    marginTop: "14px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  smallLink: {
    border: "1px solid rgba(148, 163, 184, 0.16)",
    background: "rgba(255,255,255,0.78)",
    color: "#334155",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
  },

  bottomRow: {
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid rgba(148, 163, 184, 0.18)",
  },

  signInText: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },

  signInLink: {
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
    fontSize: "13px",
    color: "#64748b",
    textAlign: "center",
  },

  visualPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "520px",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "24px",
    border: "1px solid rgba(148, 163, 184, 0.12)",
    backdropFilter: "blur(10px)",
    boxShadow:
      "0 18px 40px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255,255,255,0.65)",
  },

  visualCard: {
    position: "relative",
    width: "330px",
    height: "330px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(148, 163, 184, 0.14)",
    boxShadow: "0 16px 34px rgba(15, 23, 42, 0.04)",
  },

  orbit1: {
    position: "absolute",
    inset: "48px",
    borderRadius: "50%",
    border: "1.5px solid rgba(37, 99, 235, 0.16)",
  },

  orbit2: {
    position: "absolute",
    inset: "88px",
    borderRadius: "50%",
    border: "1.5px dashed rgba(250, 204, 21, 0.24)",
  },

  centerCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "118px",
    height: "118px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.06)",
  },

  centerBlueGlow: {
    position: "absolute",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.26), rgba(59,130,246,0) 70%)",
  },

  centerYellowGlow: {
    position: "absolute",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 70% 70%, rgba(250,204,21,0.26), rgba(250,204,21,0) 70%)",
  },

  centerText: {
    position: "relative",
    zIndex: 2,
    fontSize: "34px",
    fontWeight: "800",
    color: "#1e3a8a",
    letterSpacing: "-1px",
  },

  featureChip: {
    position: "absolute",
    padding: "10px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
  },

  chip1: {
    top: "42px",
    left: "110px",
  },

  chip2: {
    top: "132px",
    right: "10px",
  },

  chip3: {
    bottom: "44px",
    left: "26px",
  },

  chip4: {
    bottom: "92px",
    right: "26px",
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
}

export default Signup