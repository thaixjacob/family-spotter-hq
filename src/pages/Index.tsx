import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FloatingCircles from "@/components/FloatingCircles";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="relative">
          <FloatingCircles variant="primary" />
          <HeroSection />
        </div>
        <HowItWorks />
        <Benefits />
        <div className="relative">
          <FloatingCircles variant="accent" />
          <EmailCapture />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
