import { useNavigate } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import guidanceImg from "../assets/counseling.jpeg"

function Guidance(){

const navigate = useNavigate()

return(

<DashboardLayout
activePage="facilities"
title="Student Guidance Center"
subtitle=""
>

<div style={styles.container}>

{/* BACKGROUND BUBBLES */}

<div style={styles.bubbles}>
<span style={{...styles.dot,top:"8%",left:"12%",width:8,height:8,background:"#2f6edb"}}/>
<span style={{...styles.dot,top:"12%",left:"25%",width:6,height:6,background:"#f4b400"}}/>
<span style={{...styles.dot,top:"18%",left:"18%",width:12,height:12,background:"#2f6edb",opacity:0.4}}/>

<span style={{...styles.dot,bottom:"30%",left:"15%",width:7,height:7,background:"#2f6edb"}}/>
<span style={{...styles.dot,bottom:"20%",left:"35%",width:12,height:12,background:"#f4b400",opacity:0.5}}/>

<span style={{...styles.dot,top:"15%",right:"15%",width:6,height:6,background:"#f4b400"}}/>
<span style={{...styles.dot,top:"20%",right:"8%",width:4,height:4,background:"#2f6edb"}}/>

<span style={{...styles.dot,bottom:"25%",right:"18%",width:10,height:10,background:"#f4b400",opacity:0.6}}/>
<span style={{...styles.dot,bottom:"15%",right:"8%",width:6,height:6,background:"#f4b400"}}/>
<span style={{...styles.dot,bottom:"18%",right:"22%",width:4,height:4,background:"#2f6edb"}}/>
</div>

<div
style={styles.back}
onClick={()=>navigate("/facilities")}
>
← Back to Facilities
</div>

<h1 style={styles.pageTitle}>
Student Guidance Center
</h1>

<div style={styles.grid}>

{/* LEFT */}

<div>

<img src={guidanceImg} style={styles.image}/>

<h2 style={styles.sectionTitle}>
Student Guidance Center
</h2>

<div style={styles.aboutBox}>

<h3>About the Student Guidance Center</h3>

<p>
The Student Guidance Center supports students with academic advice,
personal counselling, wellbeing guidance and university-related
support services.
</p>

<p>
Students can visit the center for help with study stress,
personal concerns and general university guidance
in a confidential environment.
</p>

</div>

</div>

{/* RIGHT PANEL */}

<div style={styles.infoCard}>

<h3>Student Guidance Center</h3>

<div style={styles.openBadge}>
OPEN
</div>

<hr/>

<div style={styles.infoSection}>

<h4>Opening Hours</h4>

<p>Mon – Fri : 8.00 AM – 5.00 PM</p>
<p>Weekends – Closed</p>

</div>

<hr/>

<div style={styles.infoSection}>

<h4>Crowd Level</h4>

<p>Status: Very Busy</p>

<p style={{color:"#ef4444"}}>
🔴 Live Occupancy
</p>

</div>

<button style={styles.navBtn}>
📍 Navigate
</button>

<button style={styles.checkBtn}>
🎟 Check In (+10pts)
</button>

</div>

</div>

<div style={styles.footer}>
© 2026 Engage360, All rights reserved
</div>

</div>

</DashboardLayout>

)

}

const styles={

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
}

}

export default Guidance