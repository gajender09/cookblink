import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RecipeGrid from "@/components/RecipeGrid";
import EnhancedRecipeModal from "@/components/EnhancedRecipeModal";
import { getFavorites, addToFavorites, removeFromFavorites, isFavorite } from "@/utils/storage";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface RecipeDetails extends Recipe {
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: any;
}


const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadedFavorites = getFavorites();
    setFavorites(loadedFavorites.map(fav => fav.idMeal));
  }, []);

  const handleSearch = async (ingredients: string[]) => {
    const ingredient = ingredients[0]; // For now, use first ingredient
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
        toast({
          title: "Recipes found!",
          description: `Found ${data.meals.length} delicious recipes for "${ingredient}"`,
        });
      } else {
        setRecipes([]);
        toast({
          title: "No recipes found",
          description: `No recipes found for "${ingredient}". Try a different ingredient!`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Unable to find recipes. Please try again.",
        variant: "destructive",
      });
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = async (recipe: Recipe) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
      const data = await response.json();
      
      if (data.meals && data.meals[0]) {
        setSelectedRecipe(data.meals[0]);
      } else {
        toast({
          title: "Error loading recipe",
          description: "Recipe details not found.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error loading recipe",
        description: "Unable to load recipe details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
      setFavorites(prev => prev.filter(id => id !== recipe.idMeal));
      toast({
        title: "Removed from favorites",
        description: `${recipe.strMeal} removed from your favorites`,
      });
    } else {
      addToFavorites(recipe);
      setFavorites(prev => [...prev, recipe.idMeal]);
      toast({
        title: "Added to favorites",
        description: `${recipe.strMeal} added to your favorites`,
      });
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection onSearch={handleSearch} isLoading={isLoading} />
        
        {hasSearched && (
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground text-center mb-2">
                  Recipe Results
                </h2>
                <p className="text-muted-foreground text-center">
                  {recipes.length > 0 
                    ? `Found ${recipes.length} delicious recipes for you` 
                    : "No recipes found"}
                </p>
              </div>
              
              <RecipeGrid 
                recipes={recipes}
                onRecipeClick={handleRecipeClick}
                isLoading={isLoading}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </section>
        )}
      </main>

      <EnhancedRecipeModal 
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={closeModal}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.idMeal) : false}
        onToggleFavorite={() => selectedRecipe && handleToggleFavorite(selectedRecipe)}
      />
    </div>
  );
};

export default Index;