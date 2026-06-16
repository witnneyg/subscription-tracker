import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import FeaturesSection from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import PlansSection from "../components/landing/PlansSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PlansSection />
      </main>
      <Footer />
    </div>
  );
}
