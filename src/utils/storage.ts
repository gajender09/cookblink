interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

export interface ShoppingItem {
  id: string;
  ingredient: string;
  measure: string;
  checked: boolean;
}

// Favorites management
export const getFavorites = (): Recipe[] => {
  try {
    const favorites = localStorage.getItem('cookblink-favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addToFavorites = (recipe: Recipe): void => {
  try {
    const favorites = getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, recipe];
      localStorage.setItem('cookblink-favorites', JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (recipeId: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== recipeId);
    localStorage.setItem('cookblink-favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const isFavorite = (recipeId: string): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.idMeal === recipeId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Shopping list management
export const getShoppingList = (): ShoppingItem[] => {
  try {
    const shoppingList = localStorage.getItem('cookblink-shopping-list');
    return shoppingList ? JSON.parse(shoppingList) : [];
  } catch (error) {
    console.error('Error loading shopping list:', error);
    return [];
  }
};

export const addToShoppingList = (ingredient: string, measure: string): void => {
  try {
    const shoppingList = getShoppingList();
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      ingredient,
      measure,
      checked: false
    };
    
    const updatedList = [...shoppingList, newItem];
    localStorage.setItem('cookblink-shopping-list', JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error adding to shopping list:', error);
  }
};

export const updateShoppingItem = (id: string, checked: boolean): void => {
  try {
    const shoppingList = getShoppingList();
    const updatedList = shoppingList.map(item => 
      item.id === id ? { ...item, checked } : item
    );
    localStorage.setItem('cookblink-shopping-list', JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error updating shopping item:', error);
  }
};

export const removeFromShoppingList = (id: string): void => {
  try {
    const shoppingList = getShoppingList();
    const updatedList = shoppingList.filter(item => item.id !== id);
    localStorage.setItem('cookblink-shopping-list', JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error removing from shopping list:', error);
  }
};

export const clearShoppingList = (): void => {
  try {
    localStorage.setItem('cookblink-shopping-list', JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing shopping list:', error);
  }
};