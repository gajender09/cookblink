import { useState } from "react";
import { X, Heart, ShoppingCart, Play, ExternalLink, ChefHat, Clock, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: any;
}

interface EnhancedRecipeModalProps {
  recipe: RecipeDetails | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const EnhancedRecipeModal = ({ 
  recipe, 
  isOpen, 
  onClose, 
  isFavorite = false,
  onToggleFavorite 
}: EnhancedRecipeModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentStep, setCurrentStep] = useState(0);

  if (!recipe) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ""
      });
    }
  }

  // Split instructions into steps
  const instructions = recipe.strInstructions || "";
  const steps = instructions.split(/\n|\r\n|\d+\./).filter(step => step.trim().length > 0);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = recipe.strYoutube ? getYouTubeEmbedUrl(recipe.strYoutube) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl font-bold text-foreground mb-2 line-clamp-2">
                  {recipe.strMeal}
                </DialogTitle>
                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.strCategory && (
                    <Badge variant="secondary">
                      <ChefHat className="w-3 h-3 mr-1" />
                      {recipe.strCategory}
                    </Badge>
                  )}
                  {recipe.strArea && (
                    <Badge variant="outline">
                      {recipe.strArea}
                    </Badge>
                  )}
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    30-45 min
                  </Badge>
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    2-4 servings
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={isFavorite ? 'text-red-500' : 'text-muted-foreground'}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mx-6 mt-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cooking">Step-by-Step</TabsTrigger>
                <TabsTrigger value="video">Watch & Learn</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="overview" className="h-full mt-4 mx-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    {/* Recipe Image */}
                    <div className="space-y-4">
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-64 object-cover rounded-lg shadow-card"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {recipe.strYoutube && (
                          <Button variant="hero" className="flex-1" onClick={() => setActiveTab("video")}>
                            <Play className="w-4 h-4 mr-2" />
                            Watch Video
                          </Button>
                        )}
                        {recipe.strSource && (
                          <Button variant="outline" asChild>
                            <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Ingredients & Instructions */}
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Ingredients ({ingredients.length})
                          </h3>
                          <ScrollArea className="h-40">
                            <ul className="space-y-2">
                              {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex justify-between items-center text-sm">
                                  <span className="font-medium">{ingredient.name}</span>
                                  <span className="text-muted-foreground">{ingredient.measure}</span>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                          <ScrollArea className="h-48">
                            <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                              {recipe.strInstructions}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cooking" className="h-full mt-4 mx-6 mb-6">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Guided Cooking Mode</h3>
                      <div className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {steps.length}
                      </div>
                    </div>

                    <Card className="flex-1 flex flex-col">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center max-w-2xl">
                            <div className="text-3xl font-bold text-primary mb-2">
                              Step {currentStep + 1}
                            </div>
                            <p className="text-lg leading-relaxed">
                              {steps[currentStep]?.trim()}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                          </Button>

                          <div className="flex gap-1">
                            {steps.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === currentStep ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>

                          <Button
                            variant="hero"
                            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                            disabled={currentStep === steps.length - 1}
                          >
                            Next
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="h-full mt-4 mx-6 mb-6">
                  <div className="h-full flex flex-col">
                    {embedUrl ? (
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Video Tutorial</h3>
                        <div className="flex-1 bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={embedUrl}
                            title={recipe.strMeal}
                            className="w-full h-full"
                            allowFullScreen
                            frameBorder="0"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No Video Available</h3>
                          <p className="text-muted-foreground">
                            This recipe doesn't have a video tutorial yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedRecipeModal;