import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GradesPage from "./pages/GradesPage";
import LibraryPage from "./pages/LibraryPage";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        {/* Public routes — TopNavBar + Footer */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><SignupPage /></PublicLayout>} />

        {/* Dashboard routes — SideNavBar + Footer */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/courses" element={<DashboardLayout><CoursesPage /></DashboardLayout>} />
        <Route path="/assignments" element={<DashboardLayout><AssignmentsPage /></DashboardLayout>} />
        <Route path="/grades" element={<DashboardLayout><GradesPage /></DashboardLayout>} />
        <Route path="/library" element={<DashboardLayout><LibraryPage /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
