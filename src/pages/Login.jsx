import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

function Login() {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedRole = location.state?.role || "student"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  // 🎓 Student validation
  if (selectedRole === "student" && !email.endsWith("@stu.uni.edu")) {
    setError("Student login must use an email ending with @stu.uni.edu");
    return;
  }

  // 🧑‍💼 Admin validation
  if (selectedRole === "admin") {
    if (!email.endsWith("@uni.edu") || email.endsWith("@stu.uni.edu")) {
      setError("Admin login must use an email ending with @uni.edu");
      return;
    }
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect based on role
    if (data.user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    console.error(error);
    setError("Server error. Try again.");
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.loginCard}>

          {/* Badge */}
          <div style={styles.badgeRow}>
            <div
              style={{
                ...styles.roleBadge,
                ...(selectedRole === "student"
                  ? styles.studentBadge
                  : styles.adminBadge),
              }}
            >
              {selectedRole === "student" ? "Student Portal" : "Admin Portal"}
            </div>
          </div>

          {/* Title */}
          <h1 style={styles.title}>Welcome to Engage360!</h1>

          <p style={styles.roleLabel}>
            Logging in as{" "}
            <span style={styles.roleValue}>
              {selectedRole === "student" ? "Student" : "Admin"}
            </span>
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder={
                selectedRole === "student"
                  ? "name@stu.uni.edu"
                  : "name@uni.edu"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.button}>
              LOGIN
            </button>
          </form>

          {/* Links */}
          <div style={styles.links}>
            <button
              style={styles.linkButton}
              onClick={() => navigate("/signup")}
            >
              New? Sign up for free today
            </button>

            <button
              style={styles.linkButton}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>

            <button
              style={styles.linkButton}
              onClick={() => navigate("/help")}
            >
              Need help logging in?
            </button>
          </div>

          <p style={styles.footer}>
            © 2026 Engage360. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login

// STYLES (NO ERRORS)
const styles = {
  page: {
    width: "100%",
    height: "100vh",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #f4f7fc 50%, #fffdf8 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loginCard: {
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    borderRadius: "20px",
    background: "#ffffff",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  badgeRow: {
    marginBottom: "15px",
  },

  roleBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },

  studentBadge: {
    background: "#e0f2fe",
    color: "#0369a1",
  },

  adminBadge: {
    background: "#fef3c7",
    color: "#92400e",
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#0f172a",
  },

  roleLabel: {
    marginBottom: "25px",
    color: "#475569",
  },

  roleValue: {
    fontWeight: "bold",
    color: "#0f172a",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    background: "linear-gradient(135deg, #2563eb, #4338ca)",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },

  links: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  linkButton: {
    background: "#f1f5f9",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "14px",
  },

  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#64748b",
  },
}