
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Kanpur",
    rating: 5,
    comment: "Best Purwanchal food in Kanpur! The Dal Pithi reminded me of my grandmother's cooking. Homemade taste and excellent service.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Kanpur",
    rating: 5,
    comment: "I tried their Vrat Special Thali during Navratri and was impressed by the quality. Pure Satvik food that doesn't compromise on taste!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Ankit Verma",
    location: "Kanpur",
    rating: 5,
    comment: "The Thekua is absolutely authentic! Takes me back to my childhood in Bihar. Will definitely be ordering again.",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    name: "Meera Singh",
    location: "Kanpur",
    rating: 5,
    comment: "Their Veg Special Thali is perfect for family dinners. Fresh, homemade taste and generous portions. Worth every rupee!",
    image: "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    id: 5,
    name: "Deepak Kumar",
    location: "Kanpur",
    rating: 4,
    comment: "Ordered the Sabudana Khichdi and Aloo Jeera during my fast. Perfectly prepared and delivered hot. Will order again!",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
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
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 neo-shadow">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
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
