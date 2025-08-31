// API Service Layer - Centralized API management with caching and error handling
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

export interface RecipeDetails extends Recipe {
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class ApiService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<ApiResponse<T>> {
    try {
      // Check cache first
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return { success: true, data: cached.data };
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the response
      cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return { success: true, data };
    } catch (error) {
      console.error('API fetch error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async searchByIngredient(ingredient: string): Promise<ApiResponse<Recipe[]>> {
    const cacheKey = `search_${ingredient.toLowerCase()}`;
    const url = `${this.baseUrl}/filter.php?i=${encodeURIComponent(ingredient)}`;
    
    const result = await this.fetchWithCache<{ meals: Recipe[] | null }>(url, cacheKey);
    
    if (result.success) {
      return {
        success: true,
        data: result.data?.meals || []
      };
    }

    return { success: false, error: result.error };
  }

  async searchByMultipleIngredients(ingredients: string[]): Promise<ApiResponse<Recipe[]>> {
    // For multiple ingredients, we'll search for each and find intersections
    const promises = ingredients.map(ingredient => this.searchByIngredient(ingredient));
    const results = await Promise.all(promises);
    
    // Check if any request failed
    const failedResult = results.find(result => !result.success);
    if (failedResult) {
      return { success: false, error: failedResult.error };
    }

    // Find recipes that contain the most ingredients
    const allRecipes = results.map(result => result.data || []);
    if (allRecipes.length === 0) {
      return { success: true, data: [] };
    }

    // Score recipes by how many ingredients they match
    const recipeScores = new Map<string, { recipe: Recipe; score: number }>();
    
    allRecipes.forEach((recipes, ingredientIndex) => {
      recipes.forEach(recipe => {
        const existing = recipeScores.get(recipe.idMeal);
        if (existing) {
          existing.score += 1;
        } else {
          recipeScores.set(recipe.idMeal, { recipe, score: 1 });
        }
      });
    });

    // Sort by score (highest first) and return
    const sortedRecipes = Array.from(recipeScores.values())
      .sort((a, b) => b.score - a.score)
      .map(item => item.recipe);

    return { success: true, data: sortedRecipes };
  }

  async getRecipeDetails(id: string): Promise<ApiResponse<RecipeDetails>> {
    const cacheKey = `details_${id}`;
    const url = `${this.baseUrl}/lookup.php?i=${id}`;
    
    const result = await this.fetchWithCache<{ meals: RecipeDetails[] | null }>(url, cacheKey);
    
    if (result.success && result.data?.meals?.[0]) {
      return {
        success: true,
        data: result.data.meals[0]
      };
    }

    return {
      success: false,
      error: 'Recipe not found'
    };
  }

  async searchByName(name: string): Promise<ApiResponse<Recipe[]>> {
    const cacheKey = `name_${name.toLowerCase()}`;
    const url = `${this.baseUrl}/search.php?s=${encodeURIComponent(name)}`;
    
    const result = await this.fetchWithCache<{ meals: Recipe[] | null }>(url, cacheKey);
    
    if (result.success) {
      return {
        success: true,
        data: result.data?.meals || []
      };
    }

    return { success: false, error: result.error };
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache(): void {
    cache.clear();
  }
}

export const apiService = new ApiService();