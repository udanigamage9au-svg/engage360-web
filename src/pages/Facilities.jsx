import DashboardLayout from "./DashboardLayout"
import { useState, useEffect } from "react"
import uniMap from "../assets/uniMap.png"
import { useNavigate } from "react-router-dom"

import stadiumImg from "../assets/stadium.jpg"
import gymImg from "../assets/gymnasium.jpg"
import libraryImg from "../assets/library.jpg"
import labsImg from "../assets/labs.jpg"
import mediaImg from "../assets/mediaUnit.webp"
import guidanceImg from "../assets/counseling.jpeg"

function Facilities(){
const [showStudyModal, setShowStudyModal] = useState(false)
const [showCafeModal, setShowCafeModal] = useState(false)
const [showMap, setShowMap] = useState(false)

// State for live UI update
const [streak, setStreak] = useState(parseInt(localStorage.getItem("streakCount") || "0"))
const user = JSON.parse(localStorage.getItem("user"))

const [points, setPoints] = useState(user?.points || 0)

const handleCheckIn = (facilityName) => {
  console.log("Clicked:", facilityName);

  const user = JSON.parse(localStorage.getItem("user"));

  fetch("http://localhost:5000/api/checkin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.user_id,
      facility_name: facilityName,
    }),
  })
    .then((res) => {
      console.log("Response received");
      return res.json();
    })
    .then((data) => {
      console.log("Backend data:", data);
      alert(data.message);

      // ✅ UPDATE POINTS
      if (data.points) {
        setPoints(data.points);

        let updatedUser = { ...user, points: data.points };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      // ✅ UPDATE STREAK
      if (data.streak) {
        setStreak(data.streak);
        localStorage.setItem("streakCount", data.streak);
      }
    })
    .catch((err) => console.error("ERROR:", err));
};
return(
<DashboardLayout activePage="facilities" title="Campus Facilities" subtitle="Stay active on campus to earn rewards.">
<div style={styles.page}>

    {/* STREAK STATUS BAR */}
    <div style={styles.streakHeader}>
        <div style={styles.streakInfo}>
            <span style={{fontSize: '24px'}}>🔥</span>
            <div>
                <div style={styles.streakLabel}>Daily Streak</div>
                <div style={styles.streakValue}>{streak} Days</div>
            </div>
        </div>
        <div style={styles.pointsBadge}>
            💰 {points} Total Points
        </div>
    </div>

    <div style={styles.categoryRow}>
        <div style={{...styles.categoryBtn, background:"#F06292", color:"white"}} onClick={()=>setShowCafeModal(true)}>
            Cafeteria 🍽
        </div>
        <div style={{...styles.categoryBtn, background:"#2f6edb", color:"white"}} onClick={()=>setShowMap(true)}>
            Campus Map 📍
        </div>
    
    </div>

    <div style={styles.grid}>
  <FacilityCard 
    img={stadiumImg} 
    title="Stadium" 
    status="Open" 
    level="Moderate" 
    path="/stadium" 
    onCheckIn={() => handleCheckIn("Stadium")}
  />

  <FacilityCard 
    img={gymImg} 
    title="Gymnasium" 
    status="Open" 
    level="Moderate" 
    path="/gymnasium" 
    onCheckIn={() => handleCheckIn("Gymnasium")}
  />

  <FacilityCard 
    img={libraryImg} 
    title="University Library" 
    status="Busy" 
    level="Very Busy" 
    path="/library" 
    onCheckIn={() => handleCheckIn("Library")}
  />

  <FacilityCard 
    img={labsImg} 
    title="Labs" 
    status="Open" 
    level="Moderate" 
    path="/labs" 
    onCheckIn={() => handleCheckIn("Labs")}
  />

  <FacilityCard 
    img={guidanceImg} 
    title="Student Guidance Center" 
    status="Open" 
    level="Busy" 
    path="/guidance" 
    onCheckIn={() => handleCheckIn("Guidance Center")}
  />

  <FacilityCard 
    img={mediaImg} 
    title="Media Unit" 
    status="Open" 
    level="Moderate" 
    path="/media-unit" 
    onCheckIn={() => handleCheckIn("Media Unit")}
  />
</div>

    {/* STUDY ROOM POPUP */}

    {/* CAFETERIA POPUP */}
    {showCafeModal && (
        <ModalOverlay onClose={()=>setShowCafeModal(false)}>
            <div style={styles.modalCard}>
                <div style={styles.modalIcon}>🍽</div>
                <h2 style={styles.modalTitle}>Cafeteria Opening Hours</h2>
                <p style={styles.modalSubText}>🕗 8:00 AM – 5:00 PM</p>
                <button style={styles.modalButton} onClick={()=>setShowCafeModal(false)}>Okay</button>
            </div>
        </ModalOverlay>
    )}

    {showMap && (
        <div style={styles.overlay}>
            <div style={styles.mapCard}>
                <h2 style={{marginBottom:"10px"}}>Campus Map</h2>
                <img src={uniMap} style={{width:"100%", borderRadius:"10px"}} />
                <button style={styles.closeBtn} onClick={()=>setShowMap(false)}>Close</button>
            </div>
        </div>
    )}
</div>
</DashboardLayout>
)
}

function FacilityCard({img,title,status,level,path,onCheckIn}){
const navigate = useNavigate()
return(
<div style={styles.card}>
    <img src={img} style={styles.cardImg}/>
    <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <div style={styles.statusRow}>
            <span style={{...styles.statusBadge, background: status==="Open" ? "#22c55e" : "#ef4444"}}>
                {status}
            </span>
            <span style={styles.statusText}>● {level}</span>
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
            <button style={styles.detailsBtn} onClick={()=>navigate(path)}>Details</button>
            <button style={styles.checkInBtn} onClick={onCheckIn}>Check-in</button>
        </div>
    </div>
</div>
)
}

function ModalOverlay({children,onClose}){
    return(
    <div style={styles.modalOverlay} onClick={onClose}>
        <div onClick={(e)=>e.stopPropagation()}>{children}</div>
    </div>
    )
}

const styles={
    page:{position:"relative"},
    streakHeader: {
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '20px 25px',
        borderRadius: '18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    streakInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
    streakLabel: { fontSize: '12px', opacity: 0.7, textTransform: 'uppercase', fontWeight: 'bold' },
    streakValue: { fontSize: '22px', fontWeight: '800' },
    pointsBadge: { background: 'rgba(255,255,255,0.15)', padding: '10px 15px', borderRadius: '12px', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)' },
    
    categoryRow:{display:"flex",gap:"12px",marginBottom:"25px"},
    categoryBtn:{padding:"10px 20px",borderRadius:"12px",fontWeight:"600",cursor:"pointer", fontSize: '14px'},
    grid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"22px"},
    card:{background:"#fff",borderRadius:"14px",overflow:"hidden",boxShadow:"0 8px 20px rgba(0,0,0,0.08)"},
    cardImg:{width:"100%",height:"160px",objectFit:"cover"},
    cardBody:{padding:"16px"},
    cardTitle:{fontSize:"18px",fontWeight: "700", marginBottom:"10px", color: '#1e293b'},
    statusRow:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"15px"},
    statusBadge:{padding:"4px 10px",borderRadius:"6px",color:"#fff",fontSize:"11px",fontWeight:"600"},
    statusText:{fontSize:"13px",color:"#64748b"},
    detailsBtn:{flex: 1, padding:"10px",border:"none",borderRadius:"8px",background:"#f1f5f9",cursor:"pointer", fontWeight:"600", color: '#475569'},
    checkInBtn: {
        flex: 1, padding: "10px", border: "none", borderRadius: "8px", 
        background: "linear-gradient(135deg, #FFD700, #FFA500)", 
        color: "#000", fontWeight: "700", cursor: "pointer"
    },
    overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000},
    mapCard:{background:"#fff",padding:"25px",borderRadius:"20px",width:"850px",maxWidth:"95%"},
    closeBtn:{marginTop:"15px",padding:"10px 20px",border:"none",background:"#2f6edb",color:"#fff",borderRadius:"10px",cursor:"pointer", fontWeight: 'bold'},
    modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter: 'blur(4px)',display:"flex",alignItems:"center",justifyContent:"center", zIndex: 3000},
    modalCard:{background:"white",padding:"40px",borderRadius:"24px",width:"500px",textAlign:"center", boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'},
    modalIcon:{fontSize:"50px", marginBottom: '10px'},
    modalTitle:{fontSize: '24px', fontWeight: '800', color: '#1e293b', margin:"10px 0"},
    modalText:{color:"#64748b", lineHeight: '1.5', marginBottom: '20px'},
    modalSubText:{fontSize:"18px",fontWeight: 'bold', color:"#1e293b",marginBottom:"20px"},
    modalButton:{width: '100%', padding:"14px",background:"#2f6edb",color:"#fff",border:"none",borderRadius:"12px",cursor:"pointer", fontSize: '16px', fontWeight: 'bold'}
}

export default Facilities