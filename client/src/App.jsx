import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CourseLibrary from './pages/CourseLibrary'
import CourseModule from './pages/CourseModule'
import Assignments from './pages/Assignments'
import SquadHub from './pages/SquadHub'
import ProfilePage from './pages/ProfilePage'
import CampusLeaderboard from './pages/CampusLeaderboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Curriculum from './pages/Curriculum'
import Achievments from './pages/Achievments'
import Leaderboard from './pages/Leaderboard'
import Settings from './pages/Settings'
import SupportPage from './pages/SupportPage'
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course-module" element={<CourseModule />} />

        {/* Dashboard Layout Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseLibrary />} />
          <Route path="/community" element={<SquadHub />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/campus-leaderboard" element={<CampusLeaderboard />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/achievements" element={<Achievments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/assignments" element={<Assignments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
