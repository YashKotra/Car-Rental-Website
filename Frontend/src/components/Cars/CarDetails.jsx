import { useState } from "react";

const car = {
  name: "Tesla Model 3",
  description:
    "Experience electric luxury with the Tesla Model 3 – smooth, silent, and smart driving.",
  pricePerDay: 4500,
  images: [
    {
      url: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
      alt: "Front view of Tesla Model 3",
    },
    {
      url: "https://images.unsplash.com/photo-1553260188-75a8d6205b6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
      alt: "Side view of Tesla Model 3",
    },
    {
      url: "https://images.unsplash.com/photo-1604164448130-d1df213c64eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      alt: "Interior of Tesla Model 3",
    },
  ],
  colors: ["Red", "White", "Black"],
  specs: {
    age: "2 - 3 year(s) old",
    seats: "5 seats",
    luggage: "2 large bags, 2 small bags",
    battery: "54 kWh battery",
    transmission: "Automatic",
    fuelType: "Electric",
    range: "350km range (est)",
    drivetrain: "Full Electric",
    safety: "5-Star ANCAP Safety Rating",
    interior: "Luxury Interior",
    infotainment: "15.4-inch Touchscreen Infotainment",
    roof: "Glass Roof Sunshade",
  },
};

const CarDetail = () => {
  const [mainImg, setMainImg] = useState(car.images[0]?.url || null);
  const [selectedColor, setSelectedColor] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleIncrement = () => {
    setRentalDays((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setRentalDays((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBookNow = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      alert(`Car booked for ${rentalDays} day(s)!`);
      setButtonDisabled(false);
    }, 1500);
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto bg-black p-8 rounded-lg text-white">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails (Desktop) */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {car.images?.map((image, idx) => (
              <img
                key={idx}
                src={image.url}
                alt={image.alt || car.name}
                onClick={() => setMainImg(image.url)}
                className={`w-64 h-64 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImg === image.url ? "border-white" : "border-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2 flex">
            {mainImg ? (
              <img
                src={mainImg}
                alt={car.name}
                className="w-full h-full object-cover rounded-lg border-4 border-white"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                <p className="text-gray-400">Image not available</p>
              </div>
            )}
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4 mt-4">
            {car.images?.map((image, idx) => (
              <img
                key={idx}
                src={image.url}
                alt={car.name}
                onClick={() => setMainImg(image.url)}
                className={`w-32 h-32 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImg === image.url ? "border-white" : "border-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Car Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-3xl font-semibold mb-2">{car.name}</h1>

            <p className="text-xl text-white mb-2 ml-1">
              ₹{car.pricePerDay} / day
            </p>

            <p className="text-md text-gray-300 mb-4">{car.description}</p>

            {/* Color Selection */}
            {car.colors?.length > 0 && (
              <div className="mb-4">
                <p className="text-white">Available Colors:</p>
                <div className="flex gap-2 mt-2">
                  {car.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-white"
                          : "border-gray-500"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.85)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Duration */}
            <div className="mb-6">
              <p className="text-white">Rental Duration (days):</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-lg hover:bg-white hover:text-black transition"
                >
                  -
                </button>
                <span className="text-lg">{rentalDays}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-lg hover:bg-white hover:text-black transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              disabled={isButtonDisabled}
              className={`bg-white text-black py-3 px-6 rounded w-full mb-4 font-semibold text-lg transition ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-300"
              }`}
            >
              {isButtonDisabled ? "Booking..." : "BOOK NOW"}
            </button>

            {/* Specifications */}
            <div className="mt-10 text-white">
              <h3 className="text-xl font-bold mb-4">Specifications:</h3>
              <table className="w-full text-left text-sm text-white border-t border-gray-700">
                <tbody>
                  {Object.entries(car.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-700">
                      <td className="py-2 font-medium capitalize pr-4">
                        {key.replace(/([A-Z])/g, " $1")}
                      </td>
                      <td className="py-2 text-gray-300">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
