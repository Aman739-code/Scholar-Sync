import SideNavBar from "../components/SideNavBar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-surface text-on-surface font-body">
      <SideNavBar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
      <div className="ml-64">
        <Footer />
      </div>
    </div>
  );
}
