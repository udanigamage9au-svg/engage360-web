import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Login1 from "./pages/Login1"
import Dashboard from "./pages/Dashboard"
import Facilities from "./pages/Facilities"
import Map from "./pages/Map"
import Rewards from "./pages/Rewards"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/map" element={<Map />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App