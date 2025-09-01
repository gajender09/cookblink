import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import RecipeGrid from "@/components/RecipeGrid";
import EnhancedRecipeModal from "@/components/EnhancedRecipeModal";
import { useRecipes } from "@/hooks/useRecipes";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const recipesRef = useRef<HTMLDivElement>(null);
  
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

  const handleNavigateToSection = (section: string) => {
    setCurrentSection(section);
    
    if (section === 'recipes' && recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigateToSection={handleNavigateToSection} />
      
      <main className="overflow-hidden">
        {/* Hero Section */}
        <HeroSection onSearch={searchByIngredients} isLoading={isLoading} />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Recipe Results Section */}
        {hasSearched && (
          <section ref={recipesRef} className="py-16 px-4 bg-muted/30" id="recipes">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Recipe Results
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  {recipes.length > 0 
                    ? `Found ${recipes.length} recipes for your search` 
                    : "No recipes found. Try different ingredients!"}
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

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12 px-4">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CookBlink
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Transform your cooking experience with AI-powered recipe discovery
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 CookBlink. Made with ❤️ for food lovers everywhere.
            </p>
          </div>
        </footer>
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