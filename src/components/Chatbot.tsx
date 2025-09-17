import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Leaf,
  Recycle,
  Lightbulb,
  Globe,
  TreePine
} from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  category?: 'tip' | 'fact' | 'guide' | 'question';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm EcoBot 🌱 Your personal waste management assistant. Ask me about recycling, composting, or sustainable living tips!",
      isBot: true,
      timestamp: new Date(),
      category: 'guide'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): { text: string; category: 'tip' | 'fact' | 'guide' | 'question' } => {
    const message = userMessage.toLowerCase();
    
    // Plastic-related queries
    if (message.includes('plastic')) {
      return {
        text: "🌊 Plastic takes 400-1000+ years to decompose! Here are key tips:\n\n♻️ Always rinse containers before recycling\n🔄 Look for recycling codes 1-7 on plastic items\n💡 Reduce usage: Choose glass or metal alternatives\n🛍️ Use reusable bags instead of plastic ones\n\nDid you know? Recycling 1 plastic bottle saves enough energy to power a 60W bulb for 3 hours!",
        category: 'tip'
      };
    }
    
    // Organic waste queries
    if (message.includes('organic') || message.includes('compost') || message.includes('food waste')) {
      return {
        text: "🌱 Organic waste is actually carbon negative when composted properly!\n\n✅ Compostable: Fruit peels, vegetable scraps, coffee grounds, eggshells\n❌ Avoid: Meat, dairy, oils, pet waste\n🏠 Start home composting: 30% of household waste can be composted\n⚡ Benefits: Reduces methane emissions, creates nutrient-rich soil\n\nTip: A small countertop composter can handle 2-4 lbs of organic waste daily!",
        category: 'guide'
      };
    }
    
    // Paper queries
    if (message.includes('paper') || message.includes('cardboard')) {
      return {
        text: "📄 Paper can be recycled 5-7 times before fibers become too short!\n\n♻️ Clean paper only: Remove staples, tape, plastic windows\n📦 Cardboard: Flatten boxes, remove all tape and labels\n🚫 Cannot recycle: Wax-coated paper, tissues, paper towels\n💡 Reuse ideas: Gift wrapping, note paper, craft projects\n\nFun fact: Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water!",
        category: 'fact'
      };
    }
    
    // Metal queries
    if (message.includes('metal') || message.includes('aluminum') || message.includes('can')) {
      return {
        text: "🔩 Metals are the recycling champions - they can be recycled infinitely!\n\n⚡ Aluminum cans: Save 95% energy when recycled vs. new production\n🥫 Steel cans: Remove labels, rinse clean\n💡 Separate metals: Aluminum, steel, copper have different values\n🔄 Indefinite recycling: No quality loss over time\n\nAmazing fact: A recycled aluminum can returns to store shelves in just 60 days!",
        category: 'fact'
      };
    }
    
    // Carbon footprint queries
    if (message.includes('carbon') || message.includes('emission') || message.includes('footprint')) {
      return {
        text: "🌍 Your waste choices directly impact carbon emissions:\n\n📉 Plastic: 2.9 kg CO₂ per kg\n📉 Paper: 1.3 kg CO₂ per kg\n📉 Metal: 1.7 kg CO₂ per kg\n📈 Organic: -0.1 kg CO₂ per kg (carbon negative!)\n\n🎯 Reduce impact: Compost organic waste, recycle properly, choose reusable items\n\nGoal: Achieve 50% waste reduction = 2 tons less CO₂ annually per household!",
        category: 'fact'
      };
    }
    
    // Recycling tips
    if (message.includes('recycle') || message.includes('recycling')) {
      return {
        text: "♻️ Master recycling with these pro tips:\n\n🧼 Clean containers: Rinse food residue\n📱 Check local rules: Recycling varies by location\n🔢 Know the codes: Plastic numbers 1-7 indicate recyclability\n📦 Separate materials: Don't mix different types\n🚫 When in doubt, throw it out: Contamination ruins batches\n\nDownload your local recycling app for specific guidelines!",
        category: 'tip'
      };
    }
    
    // Sustainable living
    if (message.includes('sustainable') || message.includes('eco') || message.includes('green')) {
      return {
        text: "🌿 Transform your lifestyle with these sustainable swaps:\n\n🛍️ Reusable bags instead of plastic\n☕ Bring your own cup to coffee shops\n🥤 Stainless steel water bottle vs. plastic\n🍽️ Glass food containers vs. disposable\n🧽 Bamboo utensils for on-the-go\n📱 Digital receipts vs. paper\n\nSmall changes = Big impact! Start with one swap this week!",
        category: 'tip'
      };
    }
    
    // Default responses for general queries
    const defaultResponses = [
      {
        text: "🤔 Great question! Here are some key waste management principles:\n\n1️⃣ Reduce: Buy less, choose durable items\n2️⃣ Reuse: Repurpose before discarding\n3️⃣ Recycle: Follow local guidelines\n4️⃣ Rot: Compost organic materials\n\nWhat specific type of waste would you like to learn about?",
        category: 'guide' as const
      },
      {
        text: "🌱 Did you know the average person generates 4.5 pounds of waste daily?\n\nHere's how to reduce it:\n📦 Choose products with minimal packaging\n🔄 Repair instead of replacing\n🎁 Buy experiences, not things\n📱 Go digital when possible\n\nEvery small action counts toward a cleaner planet!",
        category: 'fact' as const
      },
      {
        text: "♻️ I'm here to help with all things eco-friendly! Ask me about:\n\n🗂️ Specific waste types (plastic, paper, metal, organic)\n🌍 Carbon footprint reduction\n🏠 Home composting setup\n♻️ Recycling guidelines\n🌱 Sustainable living tips\n\nWhat interests you most?",
        category: 'question' as const
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'tip': return <Lightbulb className="h-3 w-3" />;
      case 'fact': return <Globe className="h-3 w-3" />;
      case 'guide': return <TreePine className="h-3 w-3" />;
      default: return <Leaf className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'tip': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'fact': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'guide': return 'bg-green-500/20 text-green-600 border-green-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        category: botResponse.category
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] z-40">
          <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-full bg-primary/20">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                EcoBot Assistant
                <Badge variant="secondary" className="ml-auto text-xs">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages Area */}
              <div className="h-80 overflow-y-auto space-y-3 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="p-1 rounded-full bg-primary/20 self-start mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-muted/70 text-muted-foreground'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {message.category && message.isBot && (
                        <Badge 
                          variant="outline" 
                          className={`mb-2 text-xs border ${getCategoryColor(message.category)}`}
                        >
                          {getCategoryIcon(message.category)}
                          <span className="ml-1 capitalize">{message.category}</span>
                        </Badge>
                      )}
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {!message.isBot && (
                      <div className="p-1 rounded-full bg-primary/20 self-start mt-1">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="p-1 rounded-full bg-primary/20 self-start mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted/70 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about recycling, composting, sustainability..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("How to recycle plastic?")}
                  className="text-xs"
                >
                  🌊 Plastic Tips
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Start composting at home")}
                  className="text-xs"
                >
                  🌱 Composting
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Reduce carbon footprint")}
                  className="text-xs"
                >
                  🌍 Carbon Tips
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;