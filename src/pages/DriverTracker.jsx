import { useEffect } from "react"
import { db } from "../firebase"
import { ref, set } from "firebase/database"

function DriverTracker(){

useEffect(()=>{

if(!navigator.geolocation){
alert("GPS not supported")
return
}

const watchId = navigator.geolocation.watchPosition((position)=>{

const lat = position.coords.latitude
const lng = position.coords.longitude

set(ref(db,"bus/location"),{
lat:lat,
lng:lng
})

console.log("Updated location:",lat,lng)

})

return ()=>navigator.geolocation.clearWatch(watchId)

},[])

return(

<div style={{padding:"40px"}}>

<h1>Driver Tracker</h1>

<p>GPS location is sending to Firebase...</p>

</div>

)

}

export default DriverTracker