import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Smartphone, MapPin, Users, Award } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Create Your Profile",
      description: "Sign up and set your location preferences. Complete your eco-profile to get personalized recommendations.",
      step: "01"
    },
    {
      icon: Camera,
      title: "Snap & Identify",
      description: "Take a photo of your waste item. Our AI instantly identifies the type and provides disposal methods.",
      step: "02"
    },
    {
      icon: MapPin,
      title: "Find Disposal Centers",
      description: "Get directions to the nearest recycling centers, disposal facilities, or community collection points.",
      step: "03"
    },
    {
      icon: Users,
      title: "Connect & Share",
      description: "Join the marketplace to give away items, connect with recyclers, and participate in community challenges.",
      step: "04"
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Collect green points for every eco-friendly action, climb leaderboards, and unlock exclusive rewards.",
      step: "05"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-nature relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-6 gap-4 h-full">
          {[...Array(48)].map((_, i) => (
            <div key={i} className="bg-primary/20 rounded-full animate-pulse-eco" style={{ animationDelay: `${i * 100}ms` }}></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
            <ArrowRight className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with smart waste management in just 5 simple steps. 
            Join thousands of users making a positive environmental impact.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Step Number - Always on the left for even, right for odd */}
                  <div className="hidden md:block">
                    <div className="w-24 h-24 rounded-full bg-gradient-eco flex items-center justify-center text-2xl font-bold text-primary-foreground animate-glow">
                      {step.step}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent mt-32"></div>
                  )}

                  {/* Content Card */}
                  <div className="flex-1">
                    <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="md:hidden w-16 h-16 rounded-full bg-gradient-eco flex items-center justify-center text-lg font-bold text-primary-foreground">
                            {step.step}
                          </div>
                          <div className="p-4 bg-primary/10 rounded-xl">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="xl" className="group">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;