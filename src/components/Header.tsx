import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-hero rounded-xl shadow-card">
            <ChefHat className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recipe Ideas</h1>
            <p className="text-sm text-muted-foreground">Quick meals for busy professionals</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;