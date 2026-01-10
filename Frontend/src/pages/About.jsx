import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-red-600">About Us</h1>
        <p className="text-xl text-gray-300 mb-12">
          We are dedicated to providing the best car rental experience with a wide
          range of premium vehicles to suit your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Premium Fleet</h3>
            <p className="text-gray-400">
              Choose from our exclusive collection of sports cars, SUVs, and
              sedans.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-400">
              Seamless booking process with instant confirmation and secure
              payments.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-400">
              Our dedicated support team is always available to assist you on your
              journey.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg text-left flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              At CarRental, our mission is to redefine mobility by offering
              top-tier vehicles combined with exceptional service. We believe that
              renting a car should be more than just a transaction; it should be
              an experience. Whether you're planning a road trip, a business
              meeting, or a special occasion, we have the perfect ride for you.
            </p>
          </div>
          <div className="flex-1">
             <img 
               src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop" 
               alt="About Us" 
               className="rounded-lg shadow-lg w-full h-64 object-cover"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
