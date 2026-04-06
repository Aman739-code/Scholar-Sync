import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="bg-background text-on-surface font-body scroll-smooth min-h-screen flex flex-col">
      <TopNavBar />
      <main className="pt-20 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
