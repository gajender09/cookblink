import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (ingredient: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [ingredient, setIngredient] = useState("");

  const handleSearch = () => {
    if (ingredient.trim()) {
      onSearch(ingredient.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setIngredient("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter an ingredient (e.g., chicken, pasta, tomato)..."
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-10 h-14 text-lg bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors shadow-card"
              disabled={isLoading}
            />
            {ingredient && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            disabled={!ingredient.trim() || isLoading}
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
                Search Recipes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;