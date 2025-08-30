import { useState } from "react";
import { Search, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface EnhancedSearchBarProps {
  onSearch: (ingredients: string[]) => void;
  isLoading?: boolean;
}

const EnhancedSearchBar = ({ onSearch, isLoading = false }: EnhancedSearchBarProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = () => {
    const trimmed = currentInput.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentInput("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleSearch = () => {
    const allIngredients = [...ingredients];
    if (currentInput.trim()) {
      const trimmed = currentInput.trim().toLowerCase();
      if (!allIngredients.includes(trimmed)) {
        allIngredients.push(trimmed);
      }
    }
    if (allIngredients.length > 0) {
      onSearch(allIngredients);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentInput.trim()) {
        addIngredient();
      } else if (ingredients.length > 0) {
        handleSearch();
      }
    } else if (e.key === "," && currentInput.trim()) {
      e.preventDefault();
      addIngredient();
    }
  };

  const clearAll = () => {
    setIngredients([]);
    setCurrentInput("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Ingredients List */}
      {ingredients.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="px-3 py-1 text-sm">
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-2 hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={ingredients.length === 0 
                ? "What ingredients do you have? (e.g., chicken, rice, tomato)..." 
                : "Add another ingredient..."
              }
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-20 h-14 text-lg bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors shadow-card"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
              {currentInput && (
                <button
                  onClick={addIngredient}
                  className="text-muted-foreground hover:text-primary transition-colors p-1"
                  title="Add ingredient"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
              {(currentInput || ingredients.length > 0) && (
                <button
                  onClick={clearAll}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  title="Clear all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <Button
            onClick={handleSearch}
            disabled={ingredients.length === 0 && !currentInput.trim() || isLoading}
            variant="hero"
            size="lg"
            className="h-14 px-8 text-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Find Recipes
              </>
            )}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Tip: Separate ingredients with commas or press Enter to add each one
        </p>
      </div>
    </div>
  );
};

export default EnhancedSearchBar;