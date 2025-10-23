import { Link } from "react-router-dom";

const CarGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <Link key={product._id} to={`/car/${product._id}`} className="block">
            <div className="p-4 border-4 border-white rounded-xl hover:shadow-lg transition">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-white">{product.name}</h2>
              <p className="text-white">₹{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white text-center col-span-full">
          No cars found for this category.
        </p>
      )}
    </div>
  );
};

export default CarGrid;
