
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CustomerLove = () => {
  const reviews = [
    {
      id: 1,
      text: "Amazing taste and excellent packaging! Highly recommended!",
      author: "Priya Sharma",
      rating: 5,
    },
    {
      id: 2,
      text: "Perfect blend of tradition and taste. Will order again!",
      author: "Rajesh Kumar",
      rating: 5,
    },
    {
      id: 3,
      text: "Authentic Purwanchali flavors that remind me of home!",
      author: "Anita Verma",
      rating: 5,
    }
  ];

  return (
    <section className="bg-accent/20 py-14 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">Customer Love</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - here's what our customers have to say about their Saawariya Rasoi experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{review.text}"</p>
                <p className="text-sm font-medium">- {review.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerLove;
