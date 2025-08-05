import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <Benefits />
        <EmailCapture />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
