import InstructorSideNavBar from "../components/InstructorSideNavBar";
import Footer from "../components/Footer";

export default function InstructorDashboardLayout({ children }) {
  return (
    <div className="bg-surface text-on-surface font-body">
      <InstructorSideNavBar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
      <div className="ml-64">
        <Footer />
      </div>
    </div>
  );
}
