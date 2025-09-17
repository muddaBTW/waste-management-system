import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  MapPin, 
  MessageCircle, 
  Trophy, 
  Users, 
  Brain, 
  Calendar,
  BarChart3,
  Leaf,
  Recycle,
  AlertTriangle,
  Building
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Waste Identification",
      description: "Upload photos and let our AI classify plastic, organic, e-waste, and more with disposal recommendations.",
      category: "AI-Powered",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Smart Disposal Centers",
      description: "GPS-powered location finder with routes, details, and suggestions for the best disposal options nearby.",
      category: "Navigation",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Waste Marketplace",
      description: "Connect with people to give away waste, find recyclers, and build a community waste exchange network.",
      category: "Community",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      title: "24/7 Chatbot Assistant",
      description: "Get instant answers about recycling methods, disposal centers, and environmental tips anytime.",
      category: "Support",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Trophy,
      title: "Gamification & Rewards",
      description: "Earn green points, compete on leaderboards, and unlock achievements for sustainable actions.",
      category: "Engagement",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: AlertTriangle,
      title: "Community Reports",
      description: "Report illegal dumping spots, view problem area heatmaps, and help improve your neighborhood.",
      category: "Monitoring",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Pickup Scheduling",
      description: "Request pickup for bulky waste and connect with local authorities or NGOs for collection.",
      category: "Service",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Brain,
      title: "AI Waste Prediction",
      description: "Predict common waste in your area and assist with city planning and resource allocation.",
      category: "Analytics",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: BarChart3,
      title: "Carbon Footprint Tracker",
      description: "Track CO₂ saved through recycling and visualize your personal environmental impact.",
      category: "Impact",
      gradient: "from-green-600 to-blue-500"
    },
    {
      icon: Building,
      title: "Business Waste Management",
      description: "Enterprise solutions with compliance reports, analytics dashboard, and sustainability tracking.",
      category: "Business",
      gradient: "from-gray-600 to-slate-600"
    },
    {
      icon: Leaf,
      title: "Awareness Challenges",
      description: "Weekly eco-challenges to share progress with the community and learn sustainable practices.",
      category: "Education",
      gradient: "from-lime-500 to-green-500"
    },
    {
      icon: Recycle,
      title: "NGO Integration",
      description: "Partner with certified recyclers, make direct donations, and support environmental organizations.",
      category: "Partnership",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Comprehensive Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need for
            <br />
            <span className="text-primary">Smart Waste Management</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered identification to community engagement, our platform covers every aspect 
            of modern waste management and environmental consciousness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} flex-shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          {feature.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button variant="eco" size="lg">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;