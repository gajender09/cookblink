import { Heart, Clock, Users, Star, ChefHat, Play } from "lucide-react";
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
      className="group cursor-pointer overflow-hidden bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-200"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
            isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-400'
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs">
              {recipe.strCategory}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-base line-clamp-2 text-foreground">
            {recipe.strMeal}
          </h3>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>30 min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>4 servings</span>
            </div>
            {recipe.strArea && (
              <div className="flex items-center gap-1">
                <span>{recipe.strArea}</span>
              </div>
            )}
          </div>

          <Button 
            variant="hero" 
            size="sm" 
            className="w-full"
          >
            View Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRecipeCard;