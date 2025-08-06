import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FloatingCircles from "@/components/FloatingCircles";
import EmailCapture from "@/components/EmailCapture";
import FAQ from "@/components/FAQ";
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
        <About />
        <HowItWorks />
        <Benefits />
        <div className="relative">
          <FloatingCircles variant="accent" />
          <EmailCapture />
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
