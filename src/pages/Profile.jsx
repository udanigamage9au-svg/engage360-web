import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [profilePic, setProfilePic] = useState(null)

  // Load real user from localStorage (same source as Dashboard)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      navigate("/login")
    } else {
      const parsed = JSON.parse(storedUser)
      const nameParts = (parsed.full_name || "").split(" ")
      setUser({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        studentId: parsed.student_id || parsed.user_id || "—",
        email: parsed.email || "—",
        faculty: parsed.faculty || "—",
        dob: parsed.dob || "—",
        points: parsed.points || 0,
      })
    }
  }, [])

  // Wait until user is loaded
  if (!user) return null

  const handleChange = (e) => {
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const handleSave = () => {
    // Write updated name back to localStorage so Dashboard stays in sync
    const storedUser = JSON.parse(localStorage.getItem("user"))
    storedUser.full_name = `${user.firstName} ${user.lastName}`
    localStorage.setItem("user", JSON.stringify(storedUser))
    setEditing(false)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePic(URL.createObjectURL(file))
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <DashboardLayout activePage="profile" title="My Profile" subtitle="Student Identity & Account Settings">
      <div style={styles.wrapper}>

        {/* PROFILE HEADER CARD */}
        <div style={styles.heroCard}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatarRing}>
              {profilePic ? (
                <img src={profilePic} style={styles.avatarImg} alt="Profile" />
              ) : (
                <div style={styles.initialsPlaceholder}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
              )}
            </div>
            <label style={styles.photoUploadLabel}>
              <span>Edit Photo</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          </div>

          <div style={styles.heroText}>
            <h2 style={styles.userName}>{user.firstName} {user.lastName}</h2>
            <p style={styles.userSubtitle}>CINEC {user.faculty} Student</p>
            <div style={styles.statusPills}>
              <span style={styles.pillActive}>Verified Student</span>
              <span style={styles.pillPoints}>{user.points} PTS</span>
            </div>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          {/* EDITABLE SECTION */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Personal Info</h3>
              <p style={styles.sectionDesc}>Update your display name.</p>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>First Name</label>
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                disabled={!editing}
                style={editing ? styles.inputActive : styles.inputLocked}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                disabled={!editing}
                style={editing ? styles.inputActive : styles.inputLocked}
              />
            </div>

            <div style={styles.controls}>
              {!editing ? (
                <button style={styles.primaryBtn} onClick={() => setEditing(true)}>
                  Edit Personal Info
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={styles.saveBtn} onClick={handleSave}>Save</button>
                  <button style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                </div>
              )}
            </div>
          </div>

          {/* READ-ONLY SECTION */}
          <div style={styles.sectionCardLocked}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Academic Records</h3>
              <p style={{ ...styles.sectionDesc, color: '#f87171' }}>LOCKED FOR SECURITY</p>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Student ID</label>
              <div style={styles.staticValue}>{user.studentId}</div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>University Email</label>
              <div style={styles.staticValue}>{user.email}</div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Faculty</label>
              <div style={styles.staticValue}>{user.faculty}</div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Date of Birth</label>
              <div style={styles.staticValue}>{user.dob}</div>
            </div>
          </div>
        </div>

        <button style={styles.logoutBtn} onClick={handleSignOut}>Sign Out</button>
      </div>
    </DashboardLayout>
  )
}

const styles = {
  wrapper: { maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' },
  heroCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', gap: '30px', color: '#fff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  avatarContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatarRing: {
    width: '120px', height: '120px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)',
    overflow: 'hidden', background: '#475569'
  },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  initialsPlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: '#fff' },
  photoUploadLabel: { marginTop: '10px', fontSize: '12px', cursor: 'pointer', opacity: 0.8, textAlign: 'center', display: 'block' },
  heroText: { display: 'flex', flexDirection: 'column' },
  userName: { fontSize: '28px', margin: 0 },
  userSubtitle: { fontSize: '16px', color: '#94a3b8', margin: '5px 0 15px 0' },
  statusPills: { display: 'flex', gap: '10px' },
  pillActive: { background: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  pillPoints: { background: '#3b82f6', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },

  detailsGrid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' },
  sectionCard: { background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' },
  sectionCardLocked: { background: '#f8fafc', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' },
  sectionHeader: { marginBottom: '10px' },
  sectionTitle: { fontSize: '18px', margin: '0 0 5px 0' },
  sectionDesc: { fontSize: '13px', color: '#64748b', marginBottom: '20px' },
  fieldGroup: { marginBottom: '5px' },
  label: { display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' },
  inputActive: { width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #3b82f6', marginBottom: '15px', boxSizing: 'border-box' },
  inputLocked: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f1f5f9', color: '#64748b', marginBottom: '15px', boxSizing: 'border-box' },
  staticValue: { fontSize: '15px', fontWeight: '600', color: '#1e293b', padding: '8px 0 15px 0', borderBottom: '1px solid #e2e8f0', marginBottom: '15px' },
  controls: { marginTop: '10px' },

  primaryBtn: { background: '#1e293b', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' },
  saveBtn: { background: '#10b981', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' },
  cancelBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' },
  logoutBtn: { alignSelf: 'center', background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 30px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }
}

export default Profile
