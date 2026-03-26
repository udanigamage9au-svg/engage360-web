import { useNavigate } from "react-router-dom"
import { useState } from "react" // ✅ THIS WAS MISSING
import DashboardLayout from "./DashboardLayout"

import uniMap from "../assets/uniMap.png"
import gymImg from "../assets/gymnasium.jpg"

function Gymnasium(){

const navigate = useNavigate()
const [showMap,setShowMap] = useState(false)
const [points,setPoints] = useState(1050)

return(

<DashboardLayout
activePage="facilities"
title=""
subtitle=""
>

<div style={{...styles.container, zIndex:1}}>

{/* BACK BUTTON */}

<div 
style={styles.back}
onClick={()=>navigate("/facilities")}
>
← Back to Facilities
</div>

<h1 style={styles.pageTitle}>Gymnasium</h1>

<div style={styles.grid}>

{/* LEFT SIDE */}

<div>

<img src={gymImg} style={styles.image}/>

<div style={styles.aboutBox}>

<h3>About the Gymnasium</h3>

<p>
Our gymnasium offers modern fitness equipment including
treadmills, ellipticals, weight machines and free weights.
</p>

<p>
Show your student ID at the front desk for access.
Follow all gym rules and safety guidelines.
</p>

</div>

</div>

{/* RIGHT PANEL */}

<div style={{...styles.infoCard, zIndex:2}}>

<h3>Gymnasium</h3>

<div style={styles.openBadge}>OPEN</div>

<hr/>

<div style={styles.infoSection}>

<h4>⏱ Opening Hours</h4>

<p>Mon – Fri : 6.00 AM – 11.00 PM</p>
<p>Weekends – 8.00 AM – 9.00 PM</p>

</div>

<hr/>

<div style={styles.infoSection}>

<h4>○ Crowd Level</h4>

<p>Status: Moderate</p>
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

const styles={

container:{
padding:"10px",
position:"relative"
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

export default Gymnasium
