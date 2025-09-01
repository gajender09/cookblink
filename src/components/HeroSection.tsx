import { Sparkles, Clock, Users, TrendingUp, Star, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,background_70%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-hero rounded-full opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-accent rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-primary-foreground text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Recipe Discovery</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            Discover Amazing
            <br />
            <span className="text-primary">Recipes</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Find delicious recipes based on the ingredients you have at home.
          </p>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar onSearch={(ingredient) => onSearch([ingredient])} isLoading={isLoading} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">10,000+</h3>
                <p className="text-muted-foreground">Recipes Available</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">4.9★</h3>
                <p className="text-muted-foreground">User Rating</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">500K+</h3>
                <p className="text-muted-foreground">Happy Cooks</p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Ingredients */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">Try these popular ingredients:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "chicken", emoji: "🐔", color: "bg-orange-100 hover:bg-orange-200 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300" },
                { name: "pasta", emoji: "🍝", color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" },
                { name: "tomato", emoji: "🍅", color: "bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/20 dark:text-red-300" },
                { name: "rice", emoji: "🍚", color: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300" },
                { name: "beef", emoji: "🥩", color: "bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/20 dark:text-red-300" },
                { name: "salmon", emoji: "🐟", color: "bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300" },
                { name: "egg", emoji: "🥚", color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" },
                { name: "cheese", emoji: "🧀", color: "bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" }
              ].map((ingredient) => (
                <Button
                  key={ingredient.name}
                  variant="outline"
                  onClick={() => handleSingleSearch(ingredient.name)}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 capitalize ${ingredient.color} border-0 shadow-sm hover:shadow-md`}
                >
                  <span className="mr-2 text-lg">{ingredient.emoji}</span>
                  <span>{ingredient.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;