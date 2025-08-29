import { X, Clock, MapPin, Tag, ExternalLink, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface RecipeModalProps {
  recipe: RecipeDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || "" });
    }
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background border-border">
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden rounded-t-lg">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {recipe.strMeal}
              </DialogTitle>
              
              <div className="flex flex-wrap gap-2">
                {recipe.strCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {recipe.strCategory}
                  </Badge>
                )}
                
                {recipe.strArea && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {recipe.strArea}
                  </Badge>
                )}
                
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Quick & Easy
                </Badge>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Ingredients
                </h3>
                <div className="space-y-2 bg-gradient-accent p-4 rounded-lg border border-border">
                  {ingredients.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.ingredient}</span>
                      <span className="text-muted-foreground font-medium">{item.measure}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Instructions
                </h3>
                <ScrollArea className="h-48 bg-gradient-accent p-4 rounded-lg border border-border custom-scrollbar">
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {recipe.strInstructions}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
              {recipe.strYoutube && (
                <Button
                  onClick={() => window.open(recipe.strYoutube, '_blank')}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch Video
                </Button>
              )}
              
              {recipe.strSource && (
                <Button
                  onClick={() => window.open(recipe.strSource, '_blank')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Original Source
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;