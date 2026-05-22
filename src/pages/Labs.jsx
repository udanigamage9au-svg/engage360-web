import { useNavigate } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import { useState } from "react" 

import labsImg from "../assets/labs.jpg"
import uniMap from "../assets/uniMap.png"

function Labs() {

  const navigate = useNavigate()
  const [showMap,setShowMap] = useState(false)
  const [points,setPoints] = useState(1050)

  return (
    <DashboardLayout
      activePage="facilities"
      title="Labs"
      subtitle=""
    >

      <div style={{...styles.container, zIndex:1}}> {/* ✅ FIX */}

        {/* BACKGROUND BUBBLES */}
        <div style={styles.bubbles}>
          <span style={{...styles.dot, top:"8%", left:"12%", width:8, height:8, background:"#2f6edb"}} />
          <span style={{...styles.dot, top:"12%", left:"25%", width:6, height:6, background:"#f4b400"}} />
          <span style={{...styles.dot, top:"18%", left:"18%", width:12, height:12, background:"#2f6edb", opacity:0.4}} />

          <span style={{...styles.dot, bottom:"30%", left:"15%", width:7, height:7, background:"#2f6edb"}} />
          <span style={{...styles.dot, bottom:"20%", left:"35%", width:12, height:12, background:"#f4b400", opacity:0.5}} />

          <span style={{...styles.dot, top:"15%", right:"15%", width:6, height:6, background:"#f4b400"}} />
          <span style={{...styles.dot, top:"20%", right:"8%", width:4, height:4, background:"#2f6edb"}} />

          <span style={{...styles.dot, bottom:"25%", right:"18%", width:10, height:10, background:"#f4b400", opacity:0.6}} />
          <span style={{...styles.dot, bottom:"15%", right:"8%", width:6, height:6, background:"#f4b400"}} />
          <span style={{...styles.dot, bottom:"18%", right:"22%", width:4, height:4, background:"#2f6edb"}} />
        </div>

        {/* BACK */}
        <div
          style={styles.back}
          onClick={() => navigate("/facilities")}
        >
          ← Back to Facilities
        </div>

        <h1 style={styles.pageTitle}>Labs</h1>

        <div style={styles.grid}>

          {/* LEFT */}
          <div>

            <img src={labsImg} style={styles.image} />

            <h2 style={styles.sectionTitle}>Labs</h2>

            <div style={styles.aboutBox}>
              <h3>About the Labs</h3>

              <p>
                Our campus laboratories are equipped with modern equipment
                and are available for classroom instruction and research.
              </p>

              <p>
                Access is restricted to authorized students and staff.
                Present your student ID at the front desk before entering.
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div style={{...styles.infoCard, position:"relative", zIndex:2}}> {/* ✅ FIX */}

            <h3>Labs</h3>

            <div style={styles.openBadge}>OPEN</div>

            <hr />

            <div style={styles.infoSection}>
              <h4>Working Hours</h4>
              <p>Mon – Fri : 8.00 AM – 9.00 PM</p>
              <p>Weekends – 9.00 AM – 5.00 PM</p>
            </div>

            <hr />

            <div style={styles.infoSection}>
              <h4>Crowd Level</h4>
              <p>Status: Quiet</p>
              <p style={styles.live}>🟢 Live Occupancy</p>
            </div>

            {/* BUTTONS */}
            <button
              style={styles.navBtn}
              onClick={()=>setShowMap(true)}
            >
              📍 Navigate
            </button>

            
            <p style={{marginTop:"10px", fontWeight:"600"}}>
              Points: {points}
            </p>

          </div>

        </div>


      </div>

      {/*  MAP POPUP */}
      {showMap && (

        <div style={styles.overlay}>

          <div style={styles.mapCard}>

            <h2>Campus Map</h2>

            <img
              src={uniMap}
              style={styles.mapImage}
            />

            <button
              style={styles.closeBtn}
              onClick={()=>setShowMap(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </DashboardLayout>
  )
}

const styles = {

container:{
padding:"10px",
position:"relative"
},

bubbles:{
position:"absolute",
inset:0,
pointerEvents:"none",
zIndex:0
},

dot:{
position:"absolute",
borderRadius:"50%",
opacity:0.7
},

back:{
cursor:"pointer",
marginBottom:"10px",
color:"#333"
},

pageTitle:{
fontSize:"32px",
marginBottom:"20px"
},

grid:{
display:"grid",
gridTemplateColumns:"2fr 1fr",
gap:"30px"
},

image:{
width:"100%",
borderRadius:"10px"
},

sectionTitle:{
marginTop:"15px"
},

aboutBox:{
marginTop:"10px",
background:"#f5f5f5",
padding:"15px",
borderRadius:"8px"
},

infoCard:{
background:"#f7f7f7",
padding:"20px",
borderRadius:"12px"
},

openBadge:{
background:"#22c55e",
color:"white",
padding:"4px 10px",
borderRadius:"6px",
display:"inline-block",
marginTop:"5px"
},

infoSection:{
marginTop:"15px"
},

live:{
color:"#16a34a"
},

navBtn:{
width:"100%",
marginTop:"20px",
padding:"10px",
background:"#3b82f6",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
},

checkBtn:{
width:"100%",
marginTop:"10px",
padding:"10px",
background:"#f4b400",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
},

footer:{
textAlign:"center",
marginTop:"40px",
fontSize:"12px",
color:"#666"
},

/* MAP */

overlay:{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.6)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:9999
},

mapCard:{
background:"#fff",
padding:"20px",
borderRadius:"12px",
width:"800px",
maxWidth:"90%"
},

mapImage:{
width:"100%",
borderRadius:"10px"
},

closeBtn:{
marginTop:"10px",
padding:"8px 15px",
background:"#2f6edb",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

}

export default Labs