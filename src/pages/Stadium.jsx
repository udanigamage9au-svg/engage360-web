import { useNavigate } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import { useState } from "react"

import uniMap from "../assets/uniMap.png"
import stadiumImg from "../assets/stadium.jpg"

function Stadium(){

  const navigate = useNavigate()
  const [showMap,setShowMap] = useState(false)
  const [points,setPoints] = useState(1050)

  return(

    <DashboardLayout
      activePage="facilities"
      title=""
      subtitle=""
    >

      <div style={styles.container}>

        {/* BACK */}
        <div
          style={styles.back}
          onClick={()=>navigate("/facilities")}
        >
          ← Back to Facilities
        </div>

        <h1 style={styles.pageTitle}>Stadium</h1>

        <div style={styles.grid}>

          {/* LEFT */}
          <div>

            <img src={stadiumImg} style={styles.image}/>

            <div style={styles.aboutBox}>
              <h3>About the Stadium</h3>

              <p>
                The university stadium hosts athletic events, football matches,
                training sessions and recreational sports activities.
              </p>

              <p>
                Students are encouraged to use the stadium for jogging,
                practice sessions and university sports programs.
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div style={styles.infoCard}>

            <h3>Stadium</h3>

            <div style={styles.openBadge}>OPEN</div>

            <hr/>

            <div style={styles.infoSection}>
              <h4>⏱ Opening Hours</h4>
              <p>Mon – Fri : 6.00 AM – 9.00 PM</p>
              <p>Weekends – 7.00 AM – 8.00 PM</p>
            </div>

            <hr/>

            <div style={styles.infoSection}>
              <h4>○ Crowd Level</h4>
              <p>Status: Moderate</p>
              <p style={styles.live}>🟢 Live Occupancy</p>
            </div>

            {/* NAV BUTTON */}
            <button
              style={styles.navBtn}
              onClick={()=>{
                console.log("Navigate clicked")
                setShowMap(true)
              }}
            >
              📍 Navigate
            </button>

            {/* CHECK-IN BUTTON */}
            <button
              style={styles.checkBtn}
              onClick={()=>{
                console.log("Check-in clicked")
                setPoints(prev => prev + 3)
              }}
            >
              ✔ Check In (+3pts)
            </button>

            {/* SHOW POINTS */}
            <p style={{marginTop:"10px", fontWeight:"600"}}>
              Total Points: {points}
            </p>

          </div>

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          © 2026 Engage360, All rights reserved
        </div>

      </div>


      {/* MAP POPUP */}
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
  position:"relative",
  zIndex:10
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

aboutBox:{
  marginTop:"10px",
  background:"#f5f5f5",
  padding:"15px",
  borderRadius:"8px"
},

infoCard:{
  background:"#f7f7f7",
  padding:"20px",
  borderRadius:"12px",
  position:"relative",
  zIndex:20
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

export default Stadium