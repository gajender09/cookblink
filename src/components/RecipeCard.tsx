import { Clock, MapPin, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <Card 
      className="group cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50 overflow-hidden"
      onClick={() => onClick(recipe)}
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {recipe.strCategory && (
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{recipe.strCategory}</span>
            </div>
          )}
          
          {recipe.strArea && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{recipe.strArea}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Quick & Easy</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;