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
      className="group cursor-pointer overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-elevated hover:scale-[1.02] transition-all duration-500 animate-scale-in"
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
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </div>
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 border-0 ${
            isFavorite ? 'text-red-500 scale-110' : 'text-white hover:text-red-400 hover:scale-110'
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-black/30 backdrop-blur-sm text-white border-0 px-3 py-1">
              <ChefHat className="w-3 h-3 mr-1" />
              {recipe.strCategory}
            </Badge>
          </div>
        )}

        {/* Bottom Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h3 className="font-bold text-xl text-white line-clamp-2 drop-shadow-lg mb-2">
            {recipe.strMeal}
          </h3>
          <div className="flex items-center gap-4 text-sm text-white/90">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>30-45 min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>2-4 servings</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="font-medium">4.8</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {recipe.strArea && (
              <Badge variant="outline" className="text-xs">
                {recipe.strArea} Cuisine
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              Recipe #{recipe.idMeal.slice(-3)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            A delicious {recipe.strArea?.toLowerCase() || ''} recipe that's perfect for any occasion. 
            Easy to make with simple ingredients.
          </p>

          <Button 
            variant="hero" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            Cook This Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRecipeCard;