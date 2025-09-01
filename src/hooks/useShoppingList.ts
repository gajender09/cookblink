// Custom hook for shopping list management
import { useState, useEffect, useCallback } from 'react';
import { 
  getShoppingList, 
  addToShoppingList, 
  updateShoppingItem, 
  removeFromShoppingList, 
  clearShoppingList,
  ShoppingItem 
} from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

export interface UseShoppingListReturn {
  shoppingList: ShoppingItem[];
  addIngredient: (ingredient: string, measure: string) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearList: () => void;
  addMultipleIngredients: (ingredients: Array<{ name: string; measure: string }>) => void;
}

export const useShoppingList = (): UseShoppingListReturn => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const { toast } = useToast();

  // Load shopping list on mount and listen for changes
  useEffect(() => {
    const loadedList = getShoppingList();
    setShoppingList(loadedList);

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedList = getShoppingList();
      setShoppingList(updatedList);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('shoppingListUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('shoppingListUpdated', handleStorageChange);
    };
  }, []);

  const addIngredient = useCallback((ingredient: string, measure: string) => {
    try {
      // Check if ingredient already exists
      const existingItem = shoppingList.find(
        item => item.ingredient.toLowerCase() === ingredient.toLowerCase()
      );

      if (existingItem) {
        toast({
          title: "Item already in list",
          description: `${ingredient} is already in your shopping list`,
          variant: "destructive",
        });
        return;
      }

      addToShoppingList(ingredient, measure);
      const updatedList = getShoppingList();
      setShoppingList(updatedList);
      
      toast({
        title: "Added to shopping list",
        description: `${ingredient} added to your shopping list`,
      });

      // Dispatch custom event to update all instances
      window.dispatchEvent(new Event('shoppingListUpdated'));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to shopping list",
        variant: "destructive",
      });
    }
  }, [shoppingList, toast]);

  const addMultipleIngredients = useCallback((ingredients: Array<{ name: string; measure: string }>) => {
    try {
      let addedCount = 0;
      
      ingredients.forEach(({ name, measure }) => {
        const existingItem = shoppingList.find(
          item => item.ingredient.toLowerCase() === name.toLowerCase()
        );

        if (!existingItem) {
          addToShoppingList(name, measure);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        const updatedList = getShoppingList();
        setShoppingList(updatedList);
        
        toast({
          title: "Added to shopping list",
          description: `${addedCount} ingredient${addedCount > 1 ? 's' : ''} added to your shopping list`,
        });

        // Dispatch custom event to update all instances
        window.dispatchEvent(new Event('shoppingListUpdated'));
      } else {
        toast({
          title: "No new items",
          description: "All ingredients are already in your shopping list",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add ingredients to shopping list",
        variant: "destructive",
      });
    }
  }, [shoppingList, toast]);

  const toggleItem = useCallback((id: string) => {
    try {
      const item = shoppingList.find(item => item.id === id);
      if (item) {
        updateShoppingItem(id, !item.checked);
        setShoppingList(prev => 
          prev.map(item => 
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update shopping list item",
        variant: "destructive",
      });
    }
  }, [shoppingList, toast]);

  const removeItem = useCallback((id: string) => {
    try {
      removeFromShoppingList(id);
      setShoppingList(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item removed",
        description: "Item removed from shopping list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from shopping list",
        variant: "destructive",
      });
    }
  }, [toast]);

  const clearList = useCallback(() => {
    try {
      clearShoppingList();
      setShoppingList([]);
      
      toast({
        title: "Shopping list cleared",
        description: "All items removed from shopping list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear shopping list",
        variant: "destructive",
      });
    }
  }, [toast]);

  return {
    shoppingList,
    addIngredient,
    toggleItem,
    removeItem,
    clearList,
    addMultipleIngredients
  };
};