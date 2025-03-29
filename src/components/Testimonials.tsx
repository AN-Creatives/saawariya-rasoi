
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: "Deepak",
    location: "Kanpur",
    rating: 5,
    comment: "better test",
    image: null
  },
  {
    id: 2,
    name: "Shivangi Tiwari",
    location: "Kanpur",
    rating: 5,
    comment: "best place to order food from ,it's fresh ,healthy and delicious.",
    image: null
  },
  {
    id: 3,
    name: "Sidhant Gupta",
    location: "Kanpur",
    rating: 5,
    comment: "Sabudana vada was so good and tasty",
    image: null
  },
  {
    id: 4,
    name: "S kumar",
    location: "Kanpur",
    rating: 4,
    comment: "Nice I ordered vrat thali and it was too good like homemade food and simple. Only potatoes were too oily but it also tasted good.",
    image: null
  },
  {
    id: 5,
    name: "Anamika Abhishek Srivastava",
    location: "Kanpur",
    rating: 5,
    comment: "The tase was yum.loved it thanks",
    image: "/lovable-uploads/faaa40fa-4b4a-4930-85dc-0dd4596bf372.png"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 px-6 smooth-appear" style={{ animationDelay: '0.6s' }}>
      <div className="container mx-auto">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
            Customer Experiences
          </span>
          <h2 className="text-3xl font-semibold">What Our Customers Say</h2>
          <p className="text-muted-foreground">
            Don't just take our word for it - hear from our satisfied customers who love our authentic Purwanchal cuisine.
          </p>
        </div>
        
        <div className="relative glass-morphism rounded-2xl p-6 md:p-10 max-w-4xl mx-auto overflow-hidden">
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 flex flex-col md:flex-row gap-6 md:gap-10"
                >
                  <div className="md:w-1/4 flex flex-col items-center md:items-start">
                    <Avatar className="w-24 h-24 rounded-full overflow-hidden mb-4 neo-shadow">
                      {testimonial.image ? (
                        <AvatarImage src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="w-full h-full bg-primary/10 text-primary text-4xl">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h3 className="font-medium text-center md:text-left">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground text-center md:text-left">{testimonial.location}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="h-full flex items-center">
                      <blockquote className="text-lg md:text-xl italic">
                        "{testimonial.comment}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <p className="text-sm text-muted-foreground">
              {activeIndex + 1} of {testimonials.length}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
