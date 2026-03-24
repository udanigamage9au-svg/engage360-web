import React, { useState, useRef } from "react";
import AdminLayout from "./AdminLayout";
import initialAdminPhoto from "../../assets/admin.png"; 

function AdminProfile() {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "Tim David",
    email: "TimDavid@uni.edu", 
    role: "Administrator",
    password: "••••••",
  });

  // State to handle the live preview of the uploaded photo
  const [profilePreview, setProfilePreview] = useState(initialAdminPhoto);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Trigger the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // ✅ Handle image selection and conversion to preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile settings saved successfully!");
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Profile</h1>

        <div style={styles.profileCard}>
          <div style={styles.cardHeader}>
            <span style={styles.headerIcon}>👤</span> Profile Information
          </div>
          <div style={styles.headerDivider} />

          <div style={styles.contentLayout}>
            {/* LEFT: PHOTO SECTION */}
            <div style={styles.photoSection}>
              <div style={styles.imageWrapper}>
                <img src={profilePreview} alt="Admin" style={styles.avatarImg} />
              </div>
              
              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: "none" }} 
              />
              
              <button 
                style={styles.changePhotoBtn} 
                onClick={handleUploadClick}
                onMouseOver={(e) => e.target.style.background = "#e1b50d"}
                onMouseOut={(e) => e.target.style.background = "#f1c40f"}
              >
                Change Photo
              </button>
            </div>

            {/* RIGHT: FORM SECTION */}
            <div style={styles.formSection}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter full name"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email (Permanent)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  style={styles.readOnlyInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>User Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  readOnly 
                  style={styles.readOnlyInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.actionRow}>
                <button 
                  style={styles.saveBtn} 
                  onClick={handleSave}
                  onMouseOver={(e) => e.target.style.opacity = "0.9"}
                  onMouseOut={(e) => e.target.style.opacity = "1"}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: { width: "100%", maxWidth: "1000px" },
  pageTitle: { fontSize: "26px", fontWeight: "600", marginBottom: "25px", color: "#2d3436" },
  profileCard: { 
    background: "#dcdde1", 
    borderRadius: "18px", 
    padding: "40px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)" // Added subtle shadow for depth
  },
  cardHeader: { fontSize: "19px", fontWeight: "600", display: "flex", alignItems: "center", gap: "12px", color: "#2f3640" },
  headerDivider: { height: "1px", background: "#b2bec3", margin: "15px 0 35px 0" },
  contentLayout: { display: "flex", gap: "60px", alignItems: "center" }, // Centered items vertically
  photoSection: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
  imageWrapper: { 
    width: "180px", 
    height: "180px", 
    borderRadius: "50%", 
    overflow: "hidden", 
    border: "5px solid #fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)" 
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  changePhotoBtn: { 
    background: "#f1c40f", 
    border: "none", 
    padding: "10px 24px", 
    borderRadius: "10px", 
    fontWeight: "700", 
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  formSection: { flex: 1, display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "700", color: "#4b4b4b" },
  input: { 
    width: "100%", 
    padding: "14px 18px", 
    borderRadius: "10px", 
    border: "1px solid #ced4da", 
    background: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.3s ease"
  },
  readOnlyInput: { 
    width: "100%", 
    padding: "14px 18px", 
    borderRadius: "10px", 
    border: "1px solid #ced4da", 
    backgroundColor: "#f1f2f6", // Slightly different grey for read-only
    color: "#7f8c8d",
    cursor: "not-allowed",
    fontSize: "15px"
  },
  actionRow: { marginTop: "15px", display: "flex", justifyContent: "flex-end" },
  saveBtn: { 
    background: "#f1c40f", 
    color: "#2d3436", 
    border: "none", 
    padding: "14px 40px", 
    borderRadius: "10px", 
    fontWeight: "800", 
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(241, 196, 15, 0.3)"
  },
};

export default AdminProfile;