import { Heart, Clock, Users, Star, ChefHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/services/api";

interface EnhancedRecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipe: Recipe) => void;
  loading?: boolean;
}

const EnhancedRecipeCard = ({ 
  recipe, 
  onClick, 
  isFavorite = false,
  onToggleFavorite,
  loading = false
}: EnhancedRecipeCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!loading) {
      onToggleFavorite?.(recipe);
    }
  };

  const handleCardClick = () => {
    if (!loading) {
      onClick(recipe);
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden animate-pulse">
        <div className="aspect-[4/3] bg-muted" />
        <CardContent className="p-4 space-y-3">
          <div className="h-4 bg-muted rounded" />
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="h-5 w-20 bg-muted rounded" />
          </div>
          <div className="h-8 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:border-border hover:shadow-elegant transition-all duration-500 animate-fade-in"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-background/90 backdrop-blur-md hover:bg-background hover:scale-110 border border-border/20 transition-all duration-300 ${
            isFavorite ? 'text-red-500 shadow-glow' : 'text-muted-foreground hover:text-red-400'
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${isFavorite ? 'fill-current scale-110' : 'hover:scale-110'}`} />
        </Button>

        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md border-border/20 text-xs font-medium">
              <ChefHat className="w-3 h-3 mr-1" />
              {recipe.strCategory}
            </Badge>
          </div>
        )}

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>4 servings</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="font-medium">4.8</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
              {recipe.strMeal}
            </h3>
            
            <div className="flex items-center gap-2">
              {recipe.strArea && (
                <Badge variant="outline" className="text-xs border-primary/20 text-primary/80 hover:bg-primary/10">
                  {recipe.strArea}
                </Badge>
              )}
              <div className="flex-1" />
              <div className="text-xs text-muted-foreground font-medium">
                Recipe #{recipe.idMeal.slice(-3)}
              </div>
            </div>
          </div>

          <Button 
            variant="hero" 
            size="sm" 
            className="w-full group-hover:scale-105 transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            View Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRecipeCard;