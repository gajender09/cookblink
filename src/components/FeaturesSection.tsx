import { Search, Clock, Heart, ShoppingCart, Smartphone, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Ingredient Search",
      description: "Find recipes based on what you have in your kitchen. Our AI matches ingredients intelligently.",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
    },
    {
      icon: Clock,
      title: "Quick & Easy Recipes",
      description: "Filter by cooking time and difficulty. Perfect for busy weeknight dinners or weekend projects.",
      color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Build your personal recipe collection. Save dishes you love and access them anytime.",
      color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
    },
    {
      icon: ShoppingCart,
      title: "Smart Shopping Lists",
      description: "Generate shopping lists from recipes. Never forget an ingredient again.",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Cook with confidence using our mobile-optimized interface. Perfect for kitchen use.",
      color: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300"
    },
    {
      icon: Globe,
      title: "Global Cuisine",
      description: "Explore recipes from around the world. Discover new flavors and cooking techniques.",
      color: "bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300"
    }
  ];

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">CookBlink?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've built the most intuitive and powerful recipe discovery platform to make your cooking journey delightful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;