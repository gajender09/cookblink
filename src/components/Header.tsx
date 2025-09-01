import { ChefHat, Heart, ShoppingCart, Moon, Sun, Menu, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useShoppingList } from "@/hooks/useShoppingList";

interface HeaderProps {
  onNavigateToSection?: (section: string) => void;
}

const Header = ({ onNavigateToSection }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [favoriteSheetOpen, setFavoriteSheetOpen] = useState(false);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);
  
  const { favoritesData } = useFavorites();
  const { shoppingList, removeItem, toggleItem, clearList } = useShoppingList();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-card">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                CookBlink
              </h1>
              <p className="text-xs text-muted-foreground">Recipe Discovery</p>
            </div>
          </div>

          {/* Navigation for larger screens */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => onNavigateToSection?.('home')}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => onNavigateToSection?.('recipes')}>
              Recipes
            </Button>
            <Button variant="ghost" onClick={() => onNavigateToSection?.('about')}>
              About
            </Button>
          </nav>
          
          <div className="flex items-center gap-2">
            {/* Favorites Sheet */}
            <Sheet open={favoriteSheetOpen} onOpenChange={setFavoriteSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  {favoritesData.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {favoritesData.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Favorite Recipes ({favoritesData.length})</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                  {favoritesData.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No favorite recipes yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favoritesData.map((recipe) => (
                        <div key={recipe.idMeal} className="flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                          <img 
                            src={recipe.strMealThumb} 
                            alt={recipe.strMeal}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2">{recipe.strMeal}</h4>
                            <p className="text-xs text-muted-foreground">{recipe.strCategory}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Shopping Cart Sheet */}
            <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {shoppingList.length > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {shoppingList.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <SheetTitle>Shopping List ({shoppingList.length})</SheetTitle>
                    {shoppingList.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearList}>
                        Clear All
                      </Button>
                    )}
                  </div>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                  {shoppingList.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Your shopping list is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {shoppingList.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleItem(item.id)}
                            className="rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                              {item.ingredient}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.measure}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  <Button variant="ghost" className="justify-start" onClick={() => onNavigateToSection?.('home')}>
                    Home
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => onNavigateToSection?.('recipes')}>
                    Recipes
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => onNavigateToSection?.('about')}>
                    About
                  </Button>
                  <Separator />
                  <Button variant="ghost" className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;