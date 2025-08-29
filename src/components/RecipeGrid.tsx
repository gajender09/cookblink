import RecipeCard from "./RecipeCard";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  isLoading?: boolean;
}

const RecipeGrid = ({ recipes, onRecipeClick, isLoading = false }: RecipeGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg h-48 mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No recipes found</h3>
        <p className="text-muted-foreground">Try searching for a different ingredient!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={onRecipeClick}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;