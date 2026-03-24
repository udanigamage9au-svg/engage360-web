import { useNavigate } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import { useState } from "react" // ✅ MISSING IMPORT FIXED

import uniMap from "../assets/uniMap.png"
import libraryImg from "../assets/library.jpg"

function Library(){

const navigate = useNavigate()
const [showMap,setShowMap] = useState(false)
const [points,setPoints] = useState(1050)

return(

<DashboardLayout
activePage="facilities"
title=""
subtitle=""
>

<div style={{...styles.container, position:"relative", zIndex:1}}> {/* ✅ FIX */}

{/* BACK BUTTON */}

<div
style={styles.back}
onClick={()=>navigate("/facilities")}
>
← Back to Facilities
</div>

<h1 style={styles.pageTitle}>University Library</h1>

<div style={styles.grid}>

{/* LEFT */}

<div>

<img src={libraryImg} style={styles.image}/>

<h2 style={styles.sectionTitle}>University Library</h2>

<div style={styles.aboutBox}>

<h3>About University Library</h3>

<p>
The University Library provides a wide range of academic resources
and study facilities to support student learning and research.
</p>

<p>
It offers access to books, journals, digital databases and quiet
study areas for individual and group work.
Students can use computers, Wi-Fi and printing services within
the library.
</p>

<p>
Library staff are available to assist with finding resources,
research guidance and general academic support.
</p>

</div>

</div>

{/* RIGHT */}

<div style={{...styles.infoCard, position:"relative", zIndex:2}}> {/* ✅ FIX */}

<h3>University Library</h3>

<div style={styles.openBadge}>OPEN</div>

<hr/>

<div style={styles.infoSection}>

<h4>⏱ Working Hours</h4>

<p>Mon – Fri : 8.00 AM – 6.00 PM</p>
<p>Weekends – 9.00 AM – 1.00 PM</p>

</div>

<hr/>

<div style={styles.infoSection}>

<h4>○ Facilities & Services</h4>

<ul style={styles.facilityList}>
<li>Computer Labs</li>
<li>IT Support Helpdesk</li>
<li>Research Areas</li>
</ul>

</div>

{/* BUTTONS */}

<button
style={styles.navBtn}
onClick={()=>{
  console.log("Navigate clicked")
  setShowMap(true)
}}
>
📍 Navigate
</button>

<button
style={styles.checkBtn}
onClick={()=>{
  console.log("Check-in clicked")
  setPoints(prev => prev + 3)
}}
>
✔ Check In (+3pts)
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

{/* ✅ MAP POPUP (YOU MISSED THIS BEFORE) */}

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
padding:"10px"
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
borderRadius:"12px",
height:"fit-content"
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

facilityList:{
marginTop:"10px",
paddingLeft:"20px"
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

export default Library