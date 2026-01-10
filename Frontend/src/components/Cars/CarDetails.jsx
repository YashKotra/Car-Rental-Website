import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import api from "../../utils/api";
import MapComponent from "../Common/Map";
import ReviewSection from "../Reviews/ReviewSection";
import Reviews from "./Reviews";

const LOCATION_COORDS = {
  "Sector 17, Chandigarh": { lat: 30.7333, lng: 76.7794 },
  "Sector 47, Chandigarh": { lat: 30.699, lng: 76.758 },
  Mohali: { lat: 30.7046, lng: 76.7179 },
  Kharar: { lat: 30.749, lng: 76.6578 },
  Airport: { lat: 30.6735, lng: 76.7885 },
};

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [pickupLocation, setPickupLocation] = useState("Sector 17, Chandigarh");
  const [isBooking, setIsBooking] = useState(false);

  // Get coordinates for current selection
  const coords =
    LOCATION_COORDS[pickupLocation] || LOCATION_COORDS["Sector 17, Chandigarh"];

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await api.get(`/cars/${id}`);
        setCar(data);
      } catch (err) {
        setError("Failed to fetch car details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setTotalPrice(diffDays * car.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, car]);

  const handleBookNow = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }
    if (totalPrice <= 0) {
      alert("Invalid duration");
      return;
    }

    setIsBooking(true);

    try {
      // 1. Create Booking
      const bookingData = {
        carId: car._id,
        startDate,
        endDate,
        totalPrice,
        pickupLocation: {
          type: "Point",
          coordinates: [coords.lng, coords.lat],
          address: pickupLocation,
        },
      };

      const { data: booking } = await api.post("/bookings", bookingData);

      // 2. Create Razorpay Order
      const {
        data: { key },
      } = await api.get("/payment/key");
      const { data: order } = await api.post("/payment/create-order", {
        amount: totalPrice,
        bookingId: booking._id,
      });

      // 3. Open Razorpay
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Car Rental",
        description: `Booking for ${car.make} ${car.model}`,
        image: car.imageUrl,
        order_id: order.id,
        handler: async function (response) {
          try {
            await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id,
            });
            alert("Booking confirmed successfully!");
            navigate("/my-bookings"); // Redirect to My Bookings
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      alert("Booking failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsBooking(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-500">
        {error}
      </div>
    );
  if (!car)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        Car not found
      </div>
    );

  const warehouseLng = car.location?.coordinates?.[0];
  const warehouseLat = car.location?.coordinates?.[1];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto bg-black p-8 rounded-lg text-white">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Image */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <img
              src={car.imageUrl}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto object-cover rounded-lg border-4 border-white"
            />
            {/* Map Integration */}
            <MapComponent
              longitude={coords.lng}
              latitude={coords.lat}
              zoom={13}
            />
            <p className="text-sm text-gray-400 text-center">
              Pickup Location: {pickupLocation}
            </p>
            {typeof warehouseLat === "number" &&
              typeof warehouseLng === "number" && (
                <>
                  <MapComponent
                    longitude={warehouseLng}
                    latitude={warehouseLat}
                    zoom={13}
                  />
                  <p className="text-sm text-gray-400 text-center">
                    Warehouse: {car.location?.address || "Assigned location"}
                  </p>
                </>
              )}
          </div>

          {/* Car Info */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-semibold mb-2">
              {car.make} {car.model}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2 text-lg">
                {renderStars(car.averageRating || 0)}
              </div>
              <span className="text-gray-400 text-sm">
                ({car.numReviews || 0} reviews)
              </span>
            </div>

            <p className="text-xl text-gray-400 mb-4">{car.year}</p>

            <p className="text-2xl text-white mb-4">
              ₹{car.pricePerDay.toLocaleString()} / day
            </p>

            <p className="text-md text-gray-300 mb-6">{car.description}</p>

            {/* Date Selection */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            {totalPrice > 0 && (
              <div className="mb-6 p-4 bg-gray-900 rounded border border-gray-700">
                <p className="text-gray-400">Total Price:</p>
                <p className="text-3xl font-bold text-white">
                  ₹{totalPrice.toLocaleString()}
                </p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-white mb-2">Select Pick up location</p>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
              >
                {Object.keys(LOCATION_COORDS).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              disabled={isBooking}
              className={`bg-white text-black py-3 px-6 rounded w-full mb-4 font-semibold text-lg transition ${
                isBooking
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-300"
              }`}
            >
              {isBooking
                ? "Processing..."
                : `BOOK NOW ${
                    totalPrice > 0 ? `(₹${totalPrice.toLocaleString()})` : ""
                  }`}
            </button>

            {/* Specifications */}
            <div className="mt-10 text-white">
              <h3 className="text-xl font-bold mb-4">Specifications:</h3>
              <table className="w-full text-left text-sm text-white border-t border-gray-700">
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 font-medium">Type</td>
                    <td className="py-2 text-gray-300">{car.type}</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 font-medium">Transmission</td>
                    <td className="py-2 text-gray-300">{car.transmission}</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 font-medium">Fuel Type</td>
                    <td className="py-2 text-gray-300">{car.fuelType}</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 font-medium">Seats</td>
                    <td className="py-2 text-gray-300">{car.seats}</td>
                  </tr>
                  {car.features && car.features.length > 0 && (
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-medium">Features</td>
                      <td className="py-2 text-gray-300">
                        {car.features.join(", ")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <Reviews carId={car._id} />
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
