import { BrowserRouter, Routes, Route } from "react-router-dom"

import Startup from "./pages/Startup"
import RoleSelect from "./pages/RoleSelect"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Help from "./pages/Help"
import ContactSupport from "./pages/ContactSupport.jsx"
import ReportIssue from "./pages/ReportIssue"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

import Facilities from "./pages/Facilities"
import Gymnasium from "./pages/Gymnasium"
import Stadium from "./pages/Stadium"
import Library from "./pages/Library"
import Labs from "./pages/Labs"
import Guidance from "./pages/Guidance"
import MediaUnit from "./pages/MediaUnit"
import Transit from "./pages/transit"
import StudyRooms from "./pages/StudyRooms"
import Explore from "./pages/Explore"
import ClubDetails from "./pages/ClubDetails"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminClubs from "./pages/admin/AdminClubs"
import AdminAnnouncements from "./pages/admin/AdminAnnouncements"
import AdminSystemUpdates from "./pages/admin/AdminSystemUpdates"
import AdminProfile from "./pages/admin/AdminProfile"

// ✅ FIXED IMPORTS
import ResearchHub from "./pages/research/ResearchHub"
import EthicsService from "./pages/research/EthicsService"
import ResearchGuidance from "./pages/research/ResearchGuidance"
import ResearchCouncil from "./pages/research/ResearchCouncil"
import ResearchOpportunities from "./pages/research/ResearchOpportunities"

import Clubs from "./pages/Clubs"
import Rewards from "./pages/Rewards"
import DriverTracker from "./pages/DriverTracker"
import AdminResearch from "./pages/admin/AdminResearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Startup />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/help" element={<Help />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/report-issue" element={<ReportIssue />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gymnasium" element={<Gymnasium />} />
        <Route path="/stadium" element={<Stadium />} />
        <Route path="/library" element={<Library />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/guidance" element={<Guidance />} />
        <Route path="/media-unit" element={<MediaUnit />} />

        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubdetails" element={<ClubDetails />} />

        <Route path="/rewards" element={<Rewards />} />
        <Route path="/transit" element={<Transit />} />
        <Route path="/driver" element={<DriverTracker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/studyrooms" element={<StudyRooms />} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clubs" element={<AdminClubs />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/system-updates" element={<AdminSystemUpdates />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* ✅ RESEARCH HUB */}
        <Route path="/research" element={<ResearchHub />} />
        <Route path="/research/ethics" element={<EthicsService />} />
        <Route path="/research/guidance" element={<ResearchGuidance />} />
        <Route path="/research/council" element={<ResearchCouncil />} />
        <Route path="/research/opportunities" element={<ResearchOpportunities />} />
        <Route path="/admin/research" element={<AdminResearch />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App