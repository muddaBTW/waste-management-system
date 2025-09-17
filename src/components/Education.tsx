import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Award, 
  ChevronRight, 
  CheckCircle, 
  Trophy,
  Target,
  Lightbulb,
  Leaf,
  Recycle,
  TreePine,
  Globe,
  Zap,
  Heart
} from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface SustainabilityTip {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'reduce' | 'reuse' | 'recycle' | 'energy' | 'water';
  icon: any;
}

const Education = () => {
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'How long does it take for a plastic bottle to decompose naturally?',
      options: ['50 years', '100 years', '450+ years', '10 years'],
      correct: 2,
      explanation: 'Plastic bottles take 450+ years to decompose, which is why recycling is so important!',
      points: 10
    },
    {
      id: 'q2',
      question: 'What percentage of energy is saved when recycling aluminum cans?',
      options: ['50%', '75%', '95%', '25%'],
      correct: 2,
      explanation: 'Recycling aluminum saves 95% of the energy needed to make new cans from raw materials!',
      points: 15
    },
    {
      id: 'q3',
      question: 'Which waste type actually reduces carbon emissions when properly managed?',
      options: ['Plastic', 'Organic/Food waste', 'Paper', 'Metal'],
      correct: 1,
      explanation: 'Organic waste is carbon negative when composted, turning waste into valuable soil nutrients!',
      points: 20
    },
    {
      id: 'q4',
      question: 'How many times can paper be recycled before the fibers become too short?',
      options: ['3-4 times', '5-7 times', '10+ times', 'Infinitely'],
      correct: 1,
      explanation: 'Paper can be recycled 5-7 times before the fibers become too short to make new paper.',
      points: 10
    },
    {
      id: 'q5',
      question: 'What is the best way to clean containers before recycling?',
      options: ['Hot soapy water', 'Just rinse with water', 'Use bleach', 'No cleaning needed'],
      correct: 1,
      explanation: 'A simple rinse with water is sufficient - it removes food residue without wasting resources!',
      points: 10
    }
  ];

  const sustainabilityTips: SustainabilityTip[] = [
    {
      id: 't1',
      title: 'Start Composting Today',
      description: 'Turn 30% of your household waste into nutrient-rich soil. Use a simple bin or countertop composter.',
      impact: 'Reduces 2 tons CO₂ annually',
      difficulty: 'Easy',
      category: 'reduce',
      icon: Leaf
    },
    {
      id: 't2',
      title: 'Master the Art of Reusing',
      description: 'Glass jars become storage, plastic containers become planters. Get creative before discarding!',
      impact: 'Saves $200+ yearly',
      difficulty: 'Easy',
      category: 'reuse',
      icon: Recycle
    },
    {
      id: 't3',
      title: 'Go Digital First',
      description: 'Choose digital receipts, bills, and subscriptions. One less paper trail at a time.',
      impact: 'Saves 40 lbs paper/year',
      difficulty: 'Easy',
      category: 'reduce',
      icon: Zap
    },
    {
      id: 't4',
      title: 'Smart Water Usage',
      description: 'Fix leaks, take shorter showers, and collect rainwater for plants. Every drop counts!',
      impact: 'Saves 3,000 gallons/year',
      difficulty: 'Medium',
      category: 'water',
      icon: Globe
    },
    {
      id: 't5',
      title: 'Energy Efficiency Champion',
      description: 'LED bulbs, unplug devices, and smart thermostats. Small changes, massive impact.',
      impact: 'Reduces 1.5 tons CO₂/year',
      difficulty: 'Medium',
      category: 'energy',
      icon: TreePine
    },
    {
      id: 't6',
      title: 'Zero Waste Shopping',
      description: 'Bring your own bags, containers, and bottles. Refuse single-use items whenever possible.',
      impact: '90% less plastic waste',
      difficulty: 'Hard',
      category: 'reduce',
      icon: Heart
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reduce': return 'bg-red-500/20 text-red-600 border-red-500/30';
      case 'reuse': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'recycle': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'energy': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'water': return 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-600';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-600';
      case 'Hard': return 'bg-red-500/20 text-red-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  const startQuiz = (quiz: QuizQuestion) => {
    setActiveQuiz(quiz);
    setCurrentAnswer(null);
    setShowResult(false);
  };

  const submitAnswer = () => {
    if (currentAnswer === null || !activeQuiz) return;

    setShowResult(true);
    if (currentAnswer === activeQuiz.correct) {
      setScore(prev => prev + activeQuiz.points);
      if (!completedQuizzes.includes(activeQuiz.id)) {
        setCompletedQuizzes(prev => [...prev, activeQuiz.id]);
      }
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setCurrentAnswer(null);
    setShowResult(false);
  };

  const totalPossibleScore = quizQuestions.reduce((sum, quiz) => sum + quiz.points, 0);
  const progressPercentage = (score / totalPossibleScore) * 100;

  return (
    <section id="education" className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Learn & Grow</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Eco Education
            <br />
            <span className="text-primary">Hub</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master sustainable living through interactive quizzes, practical tips, and evidence-based 
            environmental education. Knowledge is the first step to positive change.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                Your Learning Progress
                <Badge variant="secondary" className="ml-auto">
                  {completedQuizzes.length}/{quizQuestions.length} Completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Knowledge Score</span>
                  <span className="text-sm text-muted-foreground">{score}/{totalPossibleScore} points</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Goal: Master all eco topics
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Reward: Eco Champion Badge
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Interactive Quizzes */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                Eco Challenge Quizzes
              </h3>
              <div className="space-y-4">
                {quizQuestions.map((quiz) => (
                  <Card key={quiz.id} className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{quiz.question}</h4>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">
                              {quiz.points} points
                            </Badge>
                            {completedQuizzes.includes(quiz.id) && (
                              <Badge className="text-xs bg-green-500/20 text-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => startQuiz(quiz)}
                          variant="outline"
                          size="sm"
                        >
                          {completedQuizzes.includes(quiz.id) ? 'Retake' : 'Start'}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sustainability Tips */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TreePine className="h-6 w-6 text-primary" />
                Daily Eco Actions
              </h3>
              <div className="space-y-4">
                {sustainabilityTips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <Card key={tip.id} className="bg-card/80 backdrop-blur-sm border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/20">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{tip.title}</h4>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getCategoryColor(tip.category)}`}
                              >
                                {tip.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-600">
                                💚 {tip.impact}
                              </span>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getDifficultyColor(tip.difficulty)}`}
                              >
                                {tip.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Modal */}
        {activeQuiz && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl bg-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Eco Challenge
                  </div>
                  <Badge variant="secondary">{activeQuiz.points} points</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-lg font-semibold">{activeQuiz.question}</h3>
                
                <div className="space-y-3">
                  {activeQuiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={currentAnswer === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => setCurrentAnswer(index)}
                      disabled={showResult}
                    >
                      <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showResult && index === activeQuiz.correct && (
                        <CheckCircle className="h-5 w-5 ml-auto text-green-500" />
                      )}
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <div className={`p-4 rounded-lg ${
                    currentAnswer === activeQuiz.correct 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}>
                    <p className={`font-semibold mb-2 ${
                      currentAnswer === activeQuiz.correct ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentAnswer === activeQuiz.correct ? '🎉 Correct!' : '❌ Incorrect'}
                    </p>
                    <p className="text-sm text-muted-foreground">{activeQuiz.explanation}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {!showResult ? (
                    <Button
                      onClick={submitAnswer}
                      disabled={currentAnswer === null}
                      className="flex-1"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button onClick={closeQuiz} variant="eco" className="flex-1">
                      Continue Learning
                    </Button>
                  )}
                  <Button onClick={closeQuiz} variant="outline">
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;