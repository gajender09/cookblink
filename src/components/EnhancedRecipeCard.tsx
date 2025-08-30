import { Heart, Clock, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface EnhancedRecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipe: Recipe) => void;
}

const EnhancedRecipeCard = ({ 
  recipe, 
  onClick, 
  isFavorite = false,
  onToggleFavorite 
}: EnhancedRecipeCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(recipe);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-card border-border hover:shadow-elevated hover:scale-102 transition-all duration-300 animate-scale-in"
      onClick={() => onClick(recipe)}
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
            isFavorite ? 'text-red-500' : 'text-muted-foreground'
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center gap-2 text-white text-xs">
            <Clock className="w-3 h-3" />
            <span>25-30 min</span>
            <Users className="w-3 h-3 ml-2" />
            <span>2-4 people</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.strMeal}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {recipe.strCategory && (
                <Badge variant="outline" className="text-xs">
                  {recipe.strCategory}
                </Badge>
              )}
              {recipe.strArea && (
                <Badge variant="secondary" className="text-xs">
                  {recipe.strArea}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span>4.5</span>
            </div>
          </div>

          <Button 
            variant="recipe" 
            size="sm" 
            className="w-full text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick(recipe);
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