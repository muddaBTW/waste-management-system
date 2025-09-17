import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import WasteIdentification from "@/components/WasteIdentification";
import Community from "@/components/Community";
import Education from "@/components/Education";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WasteIdentification />
      <Features />
      <HowItWorks />
      <Education />
      <Community />
      <Chatbot />
    </div>
  );
};

export default Index;
