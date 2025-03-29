
import React from 'react';
import Layout from '@/components/Layout';
import { ChefHat, Award, Utensils, Clock } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-brand">
              About <span className="brand-text-gradient">Saawariya Rasoi</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A culinary journey through the authentic flavors of Purwanchal, 
              crafted with love and served with the essence of homemade goodness.
            </p>
          </div>
          
          <div className="glass-morphism rounded-2xl overflow-hidden mb-16 smooth-appear" style={{ animationDelay: '0.2s' }}>
            <div className="h-96 relative">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Saawariya Rasoi Restaurant" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold font-brand">A Taste of Heritage</h2>
                  <p className="text-white/80 max-w-2xl">
                    Founded in August 2024 by Shail Kumari, Saawariya Rasoi brings the authentic flavors of Purwanchal to food lovers in Kanpur, Uttar Pradesh.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="space-y-6 smooth-appear" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-semibold font-brand">Our Culinary Philosophy</h2>
              <p className="text-muted-foreground">
                At Saawariya Rasoi, we believe that great food comes from traditional recipes, fresh ingredients, and passionate cooking. Our menu celebrates the rich culinary heritage of Purwanchal region, brought to Kanpur with an authentic touch.
              </p>
              <p className="text-muted-foreground">
                Our founder, Shail Kumari, has a natural talent for cooking and envisioned bringing the unique flavors of Purwanchal to Kanpur. Each dish is prepared using traditional cooking methods and recipes that capture the essence of homemade goodness in every bite.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass-morphism p-4 rounded-xl">
                  <ChefHat className="text-primary mb-2" size={24} />
                  <h3 className="font-medium">Traditional Recipes</h3>
                  <p className="text-sm text-muted-foreground">Authentic Purwanchal flavors and techniques</p>
                </div>
                <div className="glass-morphism p-4 rounded-xl">
                  <Utensils className="text-primary mb-2" size={24} />
                  <h3 className="font-medium">Pure Vegetarian</h3>
                  <p className="text-sm text-muted-foreground">100% vegetarian with Satvik food options</p>
                </div>
              </div>
            </div>
            
            <div className="relative smooth-appear" style={{ animationDelay: '0.4s' }}>
              <div className="aspect-square rounded-2xl overflow-hidden neo-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Traditional cooking" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full overflow-hidden border-4 border-background neo-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1551489810-9e3a5fe40347?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Traditional spices" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="py-12 text-center smooth-appear" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-semibold mb-8 font-brand">What Sets Us Apart</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-morphism p-6 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <h3 className="font-medium mb-2">Purwanchal Cuisine</h3>
                <p className="text-sm text-muted-foreground">
                  Authentic flavors from Purwanchal region, rarely found elsewhere in Kanpur.
                </p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="font-medium mb-2">Homemade Goodness</h3>
                <p className="text-sm text-muted-foreground">
                  Every dish captures the essence of home cooking with traditional techniques and flavors.
                </p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="text-primary" size={24} />
                </div>
                <h3 className="font-medium mb-2">Vrat Special Menu</h3>
                <p className="text-sm text-muted-foreground">
                  Special Satvik food menu for those observing religious fasts, prepared with pure ingredients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
