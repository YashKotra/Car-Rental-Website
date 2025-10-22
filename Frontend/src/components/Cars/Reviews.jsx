import React from "react";

const reviews = [
  {
    name: "Aman Sharma",
    text: "Booking was smooth, and the car was in excellent condition. Great experience overall!",
  },
  {
    name: "Priya Mehta",
    text: "Loved how quick and easy the pick-up process was. Highly recommended!",
  },
  {
    name: "Rahul Verma",
    text: "Affordable pricing and top-notch support. Will definitely rent again.",
  },
];

const Reviews = () => {
  return (
    <div className="bg-black text-white py-12 px-4">
      <h2 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="p-4">
            <p className="mb-4 text-gray-300 italic">"{review.text}"</p>
            <p className="text-white font-semibold">- {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
