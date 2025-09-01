// Custom hook for favorites management with optimized operations
import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/services/api';
import { getFavorites, addToFavorites, removeFromFavorites, isFavorite } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

export interface UseFavoritesReturn {
  favorites: string[];
  favoritesData: Recipe[];
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
  clearFavorites: () => void;
}

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesData, setFavoritesData] = useState<Recipe[]>([]);
  const { toast } = useToast();

  // Load favorites on mount and listen for storage changes
  useEffect(() => {
    const loadedFavorites = getFavorites();
    setFavoritesData(loadedFavorites);
    setFavorites(loadedFavorites.map(fav => fav.idMeal));

    // Listen for storage changes from other tabs/components
    const handleStorageChange = () => {
      const updatedFavorites = getFavorites();
      setFavoritesData(updatedFavorites);
      setFavorites(updatedFavorites.map(fav => fav.idMeal));
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-page updates
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  const checkIsFavorite = useCallback((recipeId: string): boolean => {
    return favorites.includes(recipeId);
  }, [favorites]);

  const toggleFavorite = useCallback((recipe: Recipe) => {
    const isCurrentlyFavorite = checkIsFavorite(recipe.idMeal);
    
    try {
      if (isCurrentlyFavorite) {
        removeFromFavorites(recipe.idMeal);
        const newFavorites = favorites.filter(id => id !== recipe.idMeal);
        const newFavoritesData = favoritesData.filter(fav => fav.idMeal !== recipe.idMeal);
        setFavorites(newFavorites);
        setFavoritesData(newFavoritesData);
        
        toast({
          title: "Removed from favorites",
          description: `${recipe.strMeal} removed from your favorites`,
        });
      } else {
        addToFavorites(recipe);
        const newFavorites = [...favorites, recipe.idMeal];
        const newFavoritesData = [...favoritesData, recipe];
        setFavorites(newFavorites);
        setFavoritesData(newFavoritesData);
        
        toast({
          title: "Added to favorites",
          description: `${recipe.strMeal} added to your favorites`,
        });
      }

      // Dispatch custom event to update all instances
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  }, [checkIsFavorite, toast, favorites, favoritesData]);

  const clearFavorites = useCallback(() => {
    try {
      // Clear all favorites from storage
      favorites.forEach(id => removeFromFavorites(id));
      setFavorites([]);
      setFavoritesData([]);
      
      toast({
        title: "Favorites cleared",
        description: "All favorites have been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear favorites",
        variant: "destructive",
      });
    }
  }, [favorites, toast]);

  return {
    favorites,
    favoritesData,
    isFavorite: checkIsFavorite,
    toggleFavorite,
    clearFavorites
  };
};