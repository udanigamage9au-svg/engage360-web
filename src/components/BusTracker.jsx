import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

// Bus icon
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Start icon
const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28]
});

// End icon
const endIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28]
});

// This component lives INSIDE MapContainer so it can access the map instance
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15); // zoom 15 = street level
    }
  }, [position]);
  return null;
}

function BusTracker() {
  const [busPosition, setBusPosition] = useState(null); // null until Firebase loads

  useEffect(() => {
    const busRef = ref(db, "bus/location");
    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.lat && data.lng) {
        setBusPosition([data.lat, data.lng]);
      }
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  return (
    <div>
      {/* Status bar above the map */}
      <div style={{
        padding: "10px 16px",
        marginBottom: "10px",
        borderRadius: "10px",
        background: busPosition ? "#dcfce7" : "#fef9c3",
        color: busPosition ? "#166534" : "#854d0e",
        fontWeight: "600",
        fontSize: "14px"
      }}>
        {busPosition
          ? `🚌 Bus is LIVE — ${busPosition[0].toFixed(5)}, ${busPosition[1].toFixed(5)}`
          : "⏳ Waiting for bus location..."}
      </div>

      <MapContainer
        center={[7.0035, 79.9897]} // center of the route (between Gampaha and Malabe)
        zoom={12}
        style={{ height: "450px", width: "100%", borderRadius: "14px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Auto-fly to bus position when it updates */}
        {busPosition && <FlyToLocation position={busPosition} />}

        {/* Start Location */}
        <Marker position={[7.0873, 79.9992]} icon={startIcon}>
          <Popup>📍 Gampaha Bus Station</Popup>
        </Marker>

        {/* End Location */}
        <Marker position={[6.915556, 79.959544]} icon={endIcon}>
          <Popup>📍 CINEC Campus Malabe</Popup>
        </Marker>

        {/* Live Bus — only show when position is loaded from Firebase */}
        {busPosition && (
          <Marker position={busPosition} icon={busIcon}>
            <Popup>🚌 Campus Shuttle — Live Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default BusTracker;
