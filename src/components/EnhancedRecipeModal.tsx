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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-4 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                  {recipe.strMeal}
                </DialogTitle>
                <div className="flex flex-wrap gap-2">
                  {recipe.strCategory && (
                    <Badge variant="secondary" className="text-xs">
                      {recipe.strCategory}
                    </Badge>
                  )}
                  {recipe.strArea && (
                    <Badge variant="outline" className="text-xs">
                      {recipe.strArea}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={`h-8 w-8 ${isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
                <TabsTrigger value="overview">Recipe</TabsTrigger>
                <TabsTrigger value="cooking">Instructions</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="overview" className="h-full mt-4 mx-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4 h-full">
                    {/* Recipe Image */}
                    <div className="space-y-3">
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {recipe.strYoutube && (
                          <Button variant="outline" className="flex-1" asChild>
                            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4 mr-2" />
                              Watch Video
                            </a>
                          </Button>
                        )}
                        {recipe.strSource && (
                          <Button variant="outline" asChild className="flex-1">
                            <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-3">
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-base">
                              Ingredients ({ingredients.length})
                            </h3>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleAddAllToShopping}
                              className="text-xs h-7"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add All
                            </Button>
                          </div>
                          <ScrollArea className="h-64">
                            <ul className="space-y-1">
                              {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex justify-between items-center text-sm hover:bg-muted/50 p-2 rounded transition-colors group">
                                  <div className="flex-1">
                                    <span className="font-medium">{ingredient.name}</span>
                                    {ingredient.measure && (
                                      <span className="text-muted-foreground text-xs ml-2">
                                        {ingredient.measure}
                                      </span>
                                    )}
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
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cooking" className="h-full mt-4 mx-4 mb-4">
                  <Card className="h-full">
                    <CardContent className="p-4 h-full flex flex-col">
                      <h3 className="font-semibold text-base mb-3">Instructions</h3>
                      <ScrollArea className="flex-1">
                        <div className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                          {recipe.strInstructions}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
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