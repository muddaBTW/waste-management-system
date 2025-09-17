import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, MapPin, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-earth relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/70"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="animate-float absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
        <div className="animate-float absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="animate-float absolute bottom-40 left-1/4 w-20 h-20 bg-accent/20 rounded-full blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-primary-foreground/20">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">AI-Powered Waste Management</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Smart Waste
            <br />
            <span className="bg-gradient-to-r from-primary-glow to-primary-foreground bg-clip-text text-transparent">
              Management
            </span>
            <br />
            for a Cleaner World
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform how you handle waste with AI-powered identification, smart disposal routing, 
            community engagement, and real-time environmental impact tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="xl" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20">
              <Camera className="h-8 w-8 text-primary-foreground mb-4 mx-auto" />
              <h3 className="font-semibold text-primary-foreground mb-2">AI Identification</h3>
              <p className="text-sm text-primary-foreground/80">Instantly identify waste types and get recycling guidance</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20">
              <MapPin className="h-8 w-8 text-primary-foreground mb-4 mx-auto" />
              <h3 className="font-semibold text-primary-foreground mb-2">Smart Routing</h3>
              <p className="text-sm text-primary-foreground/80">Find optimal disposal and recycling centers nearby</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20">
              <Users className="h-8 w-8 text-primary-foreground mb-4 mx-auto" />
              <h3 className="font-semibold text-primary-foreground mb-2">Community Hub</h3>
              <p className="text-sm text-primary-foreground/80">Connect, share, and earn rewards for eco-friendly actions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;