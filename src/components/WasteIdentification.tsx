import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Recycle,
  Trash2,
  Leaf,
  RotateCcw
} from "lucide-react";
import axios from "axios";

interface Prediction {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RoboflowResponse {
  predictions: Prediction[];
  inference_id: string;
}

const WasteIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const ROBOFLOW_API_KEY = "saZh3UrJiYIjLwyb9sJp";
  const MODEL_ID = "waste-segregation-jbite/1";

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPredictions([]);
    }
  };

  const predictWaste = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      // Convert image to base64
      const base64 = await convertToBase64(selectedImage);
      
      const response = await axios.post<RoboflowResponse>(
        `https://detect.roboflow.com/${MODEL_ID}`,
        base64,
        {
          params: {
            api_key: ROBOFLOW_API_KEY,
            confidence: 0.3,
            overlap: 0.5
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      setPredictions(response.data.predictions || []);
      
      if (response.data.predictions.length === 0) {
        toast({
          title: "No waste detected",
          description: "Try uploading a clearer image of waste items",
        });
      } else {
        toast({
          title: "Analysis complete!",
          description: `Detected ${response.data.predictions.length} waste item(s)`,
        });
      }
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Analysis failed",
        description: "Please try again with a different image",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.onerror = reject;
    });
  };

  const getWasteTypeIcon = (wasteType: string) => {
    const type = wasteType.toLowerCase();
    if (type.includes('plastic') || type.includes('bottle')) return Recycle;
    if (type.includes('organic') || type.includes('food')) return Leaf;
    return Trash2;
  };

  const getWasteTypeColor = (wasteType: string) => {
    const type = wasteType.toLowerCase();
    if (type.includes('plastic') || type.includes('bottle')) return 'from-blue-500 to-cyan-500';
    if (type.includes('organic') || type.includes('food')) return 'from-green-500 to-emerald-500';
    if (type.includes('paper')) return 'from-yellow-500 to-orange-500';
    if (type.includes('metal')) return 'from-gray-500 to-slate-500';
    return 'from-red-500 to-pink-500';
  };

  const getWasteDetails = (wasteType: string) => {
    const type = wasteType.toLowerCase();
    
    const wasteInfo = {
      plastic: {
        disposal: "♻️ Rinse clean and place in recycling bin",
        carbonEmission: "2.9 kg CO₂ per kg of plastic waste",
        recycling: "Can be recycled into new bottles, clothing fibers, carpet, and outdoor furniture",
        reuse: "Use as planters, storage containers, or craft materials before recycling",
        decomposition: "Takes 400-1000+ years to decompose naturally",
        tips: "Remove labels and caps, clean thoroughly before recycling"
      },
      organic: {
        disposal: "🌱 Perfect for composting bin or organic waste collection",
        carbonEmission: "0.1 kg CO₂ per kg (actually carbon negative when composted)",
        recycling: "Composting creates nutrient-rich soil amendment",
        reuse: "Use food scraps for composting, vegetable peels for natural cleaning",
        decomposition: "2 weeks to 6 months in proper composting conditions",
        tips: "Keep separate from other waste, start home composting to reduce emissions"
      },
      paper: {
        disposal: "📄 Clean paper goes to recycling bin",
        carbonEmission: "1.3 kg CO₂ per kg of paper waste",
        recycling: "Can be recycled 5-7 times into new paper products, cardboard, or tissue",
        reuse: "Use for wrapping, note-taking, origami, or shredded for packaging",
        decomposition: "2-6 weeks when properly composted",
        tips: "Remove plastic windows, staples, and tape before recycling"
      },
      metal: {
        disposal: "🔩 Recyclable - rinse and check local guidelines",
        carbonEmission: "1.7 kg CO₂ per kg of metal waste",
        recycling: "Can be recycled indefinitely without quality loss - aluminum, steel, copper",
        reuse: "Perfect for DIY projects, planters, storage, or artistic creations",
        decomposition: "50-200+ years depending on metal type",
        tips: "Separate different metals, clean food residue, aluminum saves 95% energy when recycled"
      },
      glass: {
        disposal: "🥛 Rinse and place in glass recycling bin",
        carbonEmission: "0.5 kg CO₂ per kg of glass waste",
        recycling: "Can be recycled endlessly without quality loss into new bottles and jars",
        reuse: "Perfect for storage containers, vases, candle holders, or terrariums",
        decomposition: "1 million+ years to decompose naturally",
        tips: "Remove lids and caps, separate by color if required locally"
      }
    };

    // Match waste type to info
    if (type.includes('plastic') || type.includes('bottle')) return wasteInfo.plastic;
    if (type.includes('organic') || type.includes('food') || type.includes('compost')) return wasteInfo.organic;
    if (type.includes('paper') || type.includes('cardboard')) return wasteInfo.paper;
    if (type.includes('metal') || type.includes('aluminum') || type.includes('can')) return wasteInfo.metal;
    if (type.includes('glass') || type.includes('jar')) return wasteInfo.glass;
    
    return {
      disposal: "🗑️ Check local disposal guidelines",
      carbonEmission: "1.2 kg CO₂ per kg (average mixed waste)",
      recycling: "Check with local recycling center for specific guidelines",
      reuse: "Consider creative reuse options before disposal",
      decomposition: "Varies greatly depending on materials",
      tips: "When in doubt, contact your local waste management authority"
    };
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setPredictions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="ai-identification" className="py-24 bg-gradient-nature">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Smart Waste
            <br />
            <span className="text-primary">Identification</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your waste items and let our AI identify the type and provide 
            instant disposal recommendations for proper recycling.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Upload className="h-6 w-6 text-primary" />
                  Upload Waste Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-16 w-16 text-primary/50 mx-auto" />
                      <div>
                        <p className="text-lg font-medium">Click to upload an image</p>
                        <p className="text-sm text-muted-foreground">
                          Supports JPG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                <div className="flex gap-3">
                  <Button
                    onClick={predictWaste}
                    disabled={!selectedImage || isLoading}
                    variant="eco"
                    size="lg"
                    className="flex-1"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    )}
                    {isLoading ? "Analyzing..." : "Identify Waste"}
                  </Button>
                  
                  {(selectedImage || predictions.length > 0) && (
                    <Button
                      onClick={resetAnalysis}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-secondary" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {predictions.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Detected {predictions.length} waste item(s):
                    </p>
                    {predictions.map((prediction, index) => {
                      const Icon = getWasteTypeIcon(prediction.class);
                      const colorGradient = getWasteTypeColor(prediction.class);
                      
                      return (
                        <div key={index} className="border border-border rounded-lg p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${colorGradient}`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold capitalize">{prediction.class}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {(prediction.confidence * 100).toFixed(1)}% confidence
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          {(() => {
                            const wasteDetails = getWasteDetails(prediction.class);
                            return (
                              <div className="space-y-4">
                                {/* Disposal Instructions */}
                                <div className="bg-muted/50 p-4 rounded-lg">
                                  <p className="text-sm font-medium mb-2 text-primary">🎯 Disposal Instructions:</p>
                                  <p className="text-sm text-muted-foreground">{wasteDetails.disposal}</p>
                                </div>

                                {/* Environmental Impact */}
                                <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                                  <p className="text-sm font-medium mb-2 text-destructive">🌍 Carbon Footprint:</p>
                                  <p className="text-sm text-muted-foreground">{wasteDetails.carbonEmission}</p>
                                  <p className="text-xs text-muted-foreground mt-1">⏱️ Decomposition: {wasteDetails.decomposition}</p>
                                </div>

                                {/* Recycling & Reuse Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                    <p className="text-sm font-medium mb-2 text-green-600">♻️ Recycling:</p>
                                    <p className="text-xs text-muted-foreground">{wasteDetails.recycling}</p>
                                  </div>
                                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                                    <p className="text-sm font-medium mb-2 text-blue-600">🔄 Reuse Ideas:</p>
                                    <p className="text-xs text-muted-foreground">{wasteDetails.reuse}</p>
                                  </div>
                                </div>

                                {/* Pro Tips */}
                                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                                  <p className="text-sm font-medium mb-2 text-yellow-600">💡 Pro Tips:</p>
                                  <p className="text-xs text-muted-foreground">{wasteDetails.tips}</p>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to see AI analysis results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteIdentification;