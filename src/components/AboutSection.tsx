import { ChefHat, Users, Lightbulb, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
              <ChefHat className="w-4 h-4" />
              About CookBlink
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Revolutionizing How You 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Cook & Discover</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Born from the frustration of staring at a full fridge without knowing what to cook, 
              CookBlink uses advanced AI to match your available ingredients with thousands of 
              delicious recipes from around the world.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To eliminate food waste and inspire creativity in the kitchen by making recipe discovery effortless and personalized.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We leverage cutting-edge technology to understand your preferences and suggest recipes that match your taste and skill level.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">500K+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">10K+</h3>
                <p className="text-muted-foreground">Recipes</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card col-span-2">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">95% Satisfaction Rate</h3>
                <p className="text-muted-foreground">Users love discovering new recipes with us</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;