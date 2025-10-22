import { Link } from "react-router-dom";
const products = [
  {
    _id: "1",
    name: "Tesla Model S",
    price: 8999900,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "2",
    name: "BMW X5",
    price: 7599000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "3",
    name: "Audi Q7",
    price: 8499000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "4",
    name: "Mercedes-Benz GLE",
    price: 7999000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "5",
    name: "Ford Mustang",
    price: 6999000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "6",
    name: "Chevrolet Camaro",
    price: 6499000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "7",
    name: "Lamborghini Huracan",
    price: 24999000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
  {
    _id: "8",
    name: "Porsche 911",
    price: 19999000,
    images: [
      {
        url: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      },
    ],
  },
];

const CarGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="bg-gray-900 p-4 rounded-xl hover:shadow-lg transition">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold text-white">{product.name}</h2>
            <p className="text-white">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarGrid;
