import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import WasteIdentification from "@/components/WasteIdentification";
import Community from "@/components/Community";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WasteIdentification />
      <Features />
      <HowItWorks />
      <Community />
    </div>
  );
};

export default Index;
