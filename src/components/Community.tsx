import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, MapPin, Star, TrendingUp, Heart } from "lucide-react";

const Community = () => {
  const leaderboard = [
    { name: "Sarah Green", points: 2847, rank: 1, location: "San Francisco" },
    { name: "Mike Earth", points: 2635, rank: 2, location: "Portland" },
    { name: "Emma Leaf", points: 2492, rank: 3, location: "Seattle" },
    { name: "John Recycle", points: 2338, rank: 4, location: "Austin" },
    { name: "Lisa Pure", points: 2156, rank: 5, location: "Denver" }
  ];

  const communityStats = [
    {
      icon: Users,
      label: "Active Members",
      value: "127K+",
      change: "+12%"
    },
    {
      icon: Trophy,
      label: "Total Points Earned",
      value: "2.4M",
      change: "+24%"
    },
    {
      icon: MapPin,
      label: "Cities Covered",
      value: "850+",
      change: "+8%"
    },
    {
      icon: Heart,
      label: "Waste Items Recycled",
      value: "1.8M",
      change: "+35%"
    }
  ];

  const recentActivities = [
    {
      user: "Sarah G.",
      action: "recycled 15 plastic bottles",
      points: 75,
      time: "2 hours ago"
    },
    {
      user: "Mike E.",
      action: "reported illegal dumping site",
      points: 100,
      time: "4 hours ago"
    },
    {
      user: "Emma L.",
      action: "completed weekly eco-challenge",
      points: 150,
      time: "6 hours ago"
    },
    {
      user: "John R.",
      action: "helped newcomer find recycling center",
      points: 50,
      time: "8 hours ago"
    }
  ];

  return (
    <section id="community" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-6">
            <Users className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Community Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing
            <br />
            <span className="text-secondary">Eco-Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded individuals, share your progress, and make a collective impact 
            on environmental sustainability through gamified community engagement.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center bg-gradient-nature border-0">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-secondary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500 font-medium">{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Leaderboard */}
          <div>
            <Card className="bg-card/80 backdrop-blur-sm border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Top Eco-Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.rank <= 3 ? 'bg-gradient-eco text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        #{user.rank}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="nature" className="w-full mt-6">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card className="bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-accent" />
                  Recent Community Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-accent/10 text-accent text-xs">
                          {activity.user.split(' ')[0][0]}{activity.user.split(' ')[1]?.[0] || ''}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            +{activity.points} points
                          </Badge>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="earth" className="w-full mt-6">
                  Join the Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;