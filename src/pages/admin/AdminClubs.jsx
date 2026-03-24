import AdminLayout from "./AdminLayout";
import { useState } from "react";

function AdminClubs() {

  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [studentId, setStudentId] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [image, setImage] = useState(null);

  // ✅ DEFAULT CLUB LIST (ADMIN VIEW)
  const [clubs, setClubs] = useState([
    "Tech Innovators Club",
    "Coding & Developers Club",
    "Media Unit",
    "Sports Club",
    "AI & Robotics Club",
    "Business Club",
    "Music Club",
    "Drama Society",
    "Photography Club",
    "Debate Club"
  ]);

  // ✅ HANDLE IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview
    }
  };

  // ✅ CREATE CLUB (frontend only for now)
  const handleCreateClub = () => {
    if (!clubName) return alert("Enter club name");

    setClubs([...clubs, clubName]);
    setClubName("");
    setDescription("");
    setImage(null);

    alert("Club created (frontend)");
  };

  // ✅ ADD USER
  const handleAddUser = () => {
    if (!studentId || !selectedClub) {
      return alert("Fill all fields");
    }

    alert(`Student ${studentId} added to ${selectedClub}`);
  };

  return (
    <AdminLayout>
      <div style={styles.container}>

        <h1 style={styles.title}>Clubs Management</h1>

        <div style={styles.grid}>

          {/* ================= CREATE CLUB ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>➕ Create Club</h3>

            <label style={styles.label}>Club Name</label>
            <input
              style={styles.input}
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />

            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label style={styles.label}>Upload Image</label>

            {/* IMAGE PREVIEW */}
            <div style={styles.uploadBox}>
              {image ? (
                <img src={image} style={styles.preview} />
              ) : (
                <p style={{ fontSize: "12px" }}>Upload Image</p>
              )}
            </div>

            <input type="file" onChange={handleImageUpload} />

            <button style={styles.yellowBtn} onClick={handleCreateClub}>
              Create Club
            </button>
          </div>

          {/* ================= ADD USER ================= */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>➕ Add User to Club</h3>

            <label style={styles.label}>Student ID</label>
            <input
              style={styles.input}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <label style={styles.label}>Select Club</label>
            <select
              style={styles.input}
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
            >
              <option value="">Select Club</option>
              {clubs.map((club, index) => (
                <option key={index} value={club}>
                  {club}
                </option>
              ))}
            </select>

            <button style={styles.blueBtn} onClick={handleAddUser}>
              Add to Club
            </button>
          </div>

        </div>

        {/* ================= CLUB LIST ================= */}
        <div style={styles.listSection}>
          <h3 style={styles.cardTitle}>📋 Club List</h3>

          <div style={styles.clubList}>
            {clubs.map((club, index) => (
              <div key={index} style={styles.clubItem}>
                {club}
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminClubs;



/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },

  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    flex: "1",
    minWidth: "300px",
    background: "#dcdde1",
    padding: "20px",
    borderRadius: "12px",
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "600",
    borderBottom: "1px solid #aaa",
    paddingBottom: "8px",
  },

  label: {
    fontSize: "13px",
    marginTop: "10px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    marginTop: "5px",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    marginTop: "5px",
    height: "80px",
  },

  uploadBox: {
    marginTop: "10px",
    border: "2px dashed #bbb",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    background: "#f5f5f5",
  },

  preview: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  yellowBtn: {
    marginTop: "10px",
    background: "#facc15",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "600",
  },

  blueBtn: {
    marginTop: "20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "600",
  },

  listSection: {
    marginTop: "25px",
    background: "#dcdde1",
    padding: "20px",
    borderRadius: "12px",
  },

  clubList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  clubItem: {
    background: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
  },
};