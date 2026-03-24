import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet"; // 🔥 This line fixes the "L is not defined" error
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

function BusTracker() {
  const [busPosition, setBusPosition] = useState([6.915556, 79.959544]);

  useEffect(() => {
    const busRef = ref(db, "bus/location");
    onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBusPosition([data.lat, data.lng]);
      }
    });
  }, []);

  return (
    <MapContainer
      center={[6.98, 80.02]}
      zoom={11}
      style={{ height: "450px", width: "100%", borderRadius: "14px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Start Location */}
      <Marker position={[7.0873, 79.9992]} icon={startIcon}>
        <Popup>📍 Gampaha Bus Station</Popup>
      </Marker>

      {/* End Location */}
      <Marker position={[6.915556, 79.959544]} icon={endIcon}>
        <Popup>📍 CINEC Campus Malabe</Popup>
      </Marker>

      {/* Live Bus */}
      <Marker position={busPosition} icon={busIcon}>
        <Popup>🚌 Campus Shuttle</Popup>
      </Marker>
    </MapContainer>
  );
}

export default BusTracker;