import { Sparkles, Clock, Users, TrendingUp } from "lucide-react";
import SearchBar from "./SearchBar";
import heroImage from "@/assets/hero-cooking.jpg";

interface HeroSectionProps {
  onSearch: (ingredients: string[]) => void;
  isLoading?: boolean;
}

const HeroSection = ({ onSearch, isLoading = false }: HeroSectionProps) => {
  const handleSingleSearch = (ingredient: string) => {
    onSearch([ingredient]);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh cooking ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-medium tracking-wide">Smart Recipe Discovery</span>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Turn Your <span className="text-primary">Ingredients</span>
            <br />Into <span className="text-secondary">Amazing Meals</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Stop wondering what to cook! Just tell us what's in your kitchen, and we'll show you delicious recipes you can make right now.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center items-center gap-8 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Quick Search</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>1000+ Recipes</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>Smart Matching</span>
            </div>
          </div>
        </div>

        <SearchBar onSearch={(ingredient) => onSearch([ingredient])} isLoading={isLoading} />

        {/* Popular Ingredients */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-4">Try these popular ingredients:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "chicken", emoji: "🐔" },
              { name: "pasta", emoji: "🍝" },
              { name: "tomato", emoji: "🍅" },
              { name: "rice", emoji: "🍚" },
              { name: "beef", emoji: "🥩" },
              { name: "salmon", emoji: "🐟" },
              { name: "egg", emoji: "🥚" },
              { name: "cheese", emoji: "🧀" }
            ].map((ingredient) => (
              <button
                key={ingredient.name}
                onClick={() => handleSingleSearch(ingredient.name)}
                className="px-4 py-2 bg-background/60 backdrop-blur-sm border border-border/50 rounded-full text-sm text-foreground hover:bg-accent hover:border-primary/50 transition-all duration-300 capitalize flex items-center gap-2"
                disabled={isLoading}
              >
                <span>{ingredient.emoji}</span>
                <span>{ingredient.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;