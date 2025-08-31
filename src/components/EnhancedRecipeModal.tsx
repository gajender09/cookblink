import { useState } from "react";
import { X, Heart, ShoppingCart, Play, ExternalLink, ChefHat, Clock, Users, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShoppingList } from "@/hooks/useShoppingList";

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
  const { addIngredient, addMultipleIngredients } = useShoppingList();

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
    if (!url) return null;
    
    // Handle different YouTube URL formats
    let videoId = null;
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1` : null;
  };

  const embedUrl = recipe.strYoutube ? getYouTubeEmbedUrl(recipe.strYoutube) : null;

  const handleAddAllToShopping = () => {
    const ingredientsList = ingredients.map(ing => ({
      name: ing.name,
      measure: ing.measure
    }));
    addMultipleIngredients(ingredientsList);
  };

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
                  className={`transition-all duration-300 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-400'}`}
                >
                  <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-current scale-110' : 'hover:scale-110'}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleAddAllToShopping}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
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
                          <Button variant="outline" asChild className="flex-1">
                            <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Ingredients & Instructions */}
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <ShoppingCart className="w-5 h-5" />
                              Ingredients ({ingredients.length})
                            </h3>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleAddAllToShopping}
                              className="text-xs"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add All
                            </Button>
                          </div>
                           <ScrollArea className="h-40">
                            <ul className="space-y-2">
                              {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex justify-between items-center text-sm hover:bg-muted/50 p-2 rounded transition-colors group">
                                  <div className="flex-1">
                                    <span className="font-medium">{ingredient.name}</span>
                                    <span className="text-muted-foreground ml-2">- {ingredient.measure}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addIngredient(ingredient.name, ingredient.measure);
                                    }}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
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

                <TabsContent value="video" className="h-full mt-4 mx-6 mb-6 overflow-hidden">
                  <div className="h-full flex flex-col">
                    {embedUrl ? (
                      <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Video Tutorial</h3>
                          <Button variant="outline" size="sm" asChild>
                            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open in YouTube
                            </a>
                          </Button>
                        </div>
                        <div className="flex-1 bg-black rounded-lg overflow-hidden min-h-[300px] relative">
                          <iframe
                            src={embedUrl}
                            title={`${recipe.strMeal} - Cooking Video`}
                            className="absolute inset-0 w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">No Video Available</h3>
                          <p className="text-muted-foreground max-w-sm">
                            This recipe doesn't have a video tutorial yet. Check back later or try searching for cooking videos online!
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