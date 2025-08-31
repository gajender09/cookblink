// Custom hook for recipe management with optimized state handling
import { useState, useCallback } from 'react';
import { apiService, Recipe, RecipeDetails } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface UseRecipesReturn {
  recipes: Recipe[];
  selectedRecipe: RecipeDetails | null;
  isLoading: boolean;
  hasSearched: boolean;
  searchByIngredients: (ingredients: string[]) => Promise<void>;
  getRecipeDetails: (recipe: Recipe) => Promise<void>;
  clearSelectedRecipe: () => void;
  clearResults: () => void;
}

export const useRecipes = (): UseRecipesReturn => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchByIngredients = useCallback(async (ingredients: string[]) => {
    if (ingredients.length === 0) return;

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const result = ingredients.length === 1 
        ? await apiService.searchByIngredient(ingredients[0])
        : await apiService.searchByMultipleIngredients(ingredients);

      if (result.success) {
        setRecipes(result.data || []);
        
        if (result.data && result.data.length > 0) {
          toast({
            title: "Recipes found!",
            description: `Found ${result.data.length} delicious recipes${ingredients.length > 1 ? ` matching your ingredients` : ` for "${ingredients[0]}"`}`,
          });
        } else {
          toast({
            title: "No recipes found",
            description: `No recipes found for "${ingredients.join(', ')}". Try different ingredients!`,
            variant: "destructive",
          });
        }
      } else {
        setRecipes([]);
        toast({
          title: "Search failed",
          description: result.error || "Unable to find recipes. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setRecipes([]);
      toast({
        title: "Search failed",
        description: "Unable to find recipes. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getRecipeDetails = useCallback(async (recipe: Recipe) => {
    setIsLoading(true);
    
    try {
      const result = await apiService.getRecipeDetails(recipe.idMeal);
      
      if (result.success && result.data) {
        setSelectedRecipe(result.data);
      } else {
        toast({
          title: "Error loading recipe",
          description: result.error || "Recipe details not found.",
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
  }, [toast]);

  const clearSelectedRecipe = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  const clearResults = useCallback(() => {
    setRecipes([]);
    setHasSearched(false);
    setSelectedRecipe(null);
  }, []);

  return {
    recipes,
    selectedRecipe,
    isLoading,
    hasSearched,
    searchByIngredients,
    getRecipeDetails,
    clearSelectedRecipe,
    clearResults
  };
};