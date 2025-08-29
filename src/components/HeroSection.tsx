import { Sparkles } from "lucide-react";
import SearchBar from "./SearchBar";
import heroImage from "@/assets/hero-cooking.jpg";

interface HeroSectionProps {
  onSearch: (ingredient: string) => void;
  isLoading?: boolean;
}

const HeroSection = ({ onSearch, isLoading = false }: HeroSectionProps) => {
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
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">For Busy Professionals</span>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Turn Your <span className="text-primary">Ingredients</span> into 
            <br />Amazing <span className="text-secondary">Recipes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Skip the endless browsing. Just tell us what you have in your kitchen, 
            and we'll show you delicious recipes you can make right now.
          </p>
        </div>

        <SearchBar onSearch={onSearch} isLoading={isLoading} />

        {/* Popular Ingredients */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["chicken", "pasta", "tomato", "rice", "beef", "salmon"].map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => onSearch(ingredient)}
                className="px-4 py-2 bg-background/60 backdrop-blur-sm border border-border/50 rounded-full text-sm text-foreground hover:bg-accent hover:border-primary/50 transition-all duration-300 capitalize"
                disabled={isLoading}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;