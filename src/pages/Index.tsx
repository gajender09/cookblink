import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RecipeGrid from "@/components/RecipeGrid";
import EnhancedRecipeModal from "@/components/EnhancedRecipeModal";
import { useRecipes } from "@/hooks/useRecipes";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const {
    recipes,
    selectedRecipe,
    isLoading,
    hasSearched,
    searchByIngredients,
    getRecipeDetails,
    clearSelectedRecipe,
  } = useRecipes();

  const {
    favorites,
    isFavorite,
    toggleFavorite
  } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection onSearch={searchByIngredients} isLoading={isLoading} />
        
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
                onRecipeClick={getRecipeDetails}
                isLoading={isLoading}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </section>
        )}
      </main>

      <EnhancedRecipeModal 
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={clearSelectedRecipe}
        isFavorite={selectedRecipe ? isFavorite(selectedRecipe.idMeal) : false}
        onToggleFavorite={() => selectedRecipe && toggleFavorite(selectedRecipe)}
      />
    </div>
  );
};

export default Index;