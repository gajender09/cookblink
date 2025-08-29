import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RecipeGrid from "@/components/RecipeGrid";
import RecipeModal from "@/components/RecipeModal";
import pastaImage from "@/assets/pasta-recipe.jpg";
import chickenImage from "@/assets/chicken-recipe.jpg";
import saladImage from "@/assets/salad-recipe.jpg";

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

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    idMeal: "1",
    strMeal: "Creamy Garlic Pasta",
    strMealThumb: pastaImage,
    strCategory: "Pasta",
    strArea: "Italian"
  },
  {
    idMeal: "2", 
    strMeal: "Grilled Chicken with Herbs",
    strMealThumb: chickenImage,
    strCategory: "Chicken",
    strArea: "American"
  },
  {
    idMeal: "3",
    strMeal: "Fresh Garden Salad",
    strMealThumb: saladImage,
    strCategory: "Salad",
    strArea: "Mediterranean"
  }
];

const mockRecipeDetails: RecipeDetails = {
  idMeal: "1",
  strMeal: "Creamy Garlic Pasta",
  strMealThumb: pastaImage,
  strCategory: "Pasta",
  strArea: "Italian",
  strInstructions: `1. Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente.

2. While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and cook for 1 minute until fragrant.

3. Add heavy cream to the skillet and bring to a gentle simmer. Let it reduce slightly, about 2-3 minutes.

4. Add grated Parmesan cheese and whisk until melted and smooth. Season with salt, pepper, and red pepper flakes.

5. Drain pasta, reserving 1/2 cup pasta water. Add pasta to the cream sauce and toss to combine.

6. If sauce is too thick, add pasta water gradually until desired consistency is reached.

7. Remove from heat and garnish with fresh parsley and additional Parmesan cheese.

8. Serve immediately while hot. Enjoy your delicious homemade creamy garlic pasta!`,
  strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  strIngredient1: "Pasta",
  strMeasure1: "500g",
  strIngredient2: "Heavy Cream", 
  strMeasure2: "1 cup",
  strIngredient3: "Garlic",
  strMeasure3: "4 cloves",
  strIngredient4: "Parmesan Cheese",
  strMeasure4: "1 cup grated",
  strIngredient5: "Olive Oil",
  strMeasure5: "2 tbsp",
  strIngredient6: "Fresh Parsley",
  strMeasure6: "2 tbsp chopped"
};

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (ingredient: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, show mock data
      setRecipes(mockRecipes);
      
      toast({
        title: "Recipes found!",
        description: `Found ${mockRecipes.length} delicious recipes for "${ingredient}"`,
      });
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
      // Simulate API call for recipe details
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, show mock details (in real app, fetch from TheMealDB)
      setSelectedRecipe(mockRecipeDetails);
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
              />
            </div>
          </section>
        )}
      </main>

      <RecipeModal 
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={closeModal}
      />
    </div>
  );
};

export default Index;