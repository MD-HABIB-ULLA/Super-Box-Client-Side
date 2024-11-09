import React from "react";
import { ShoppingCart, Eye, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart, handlePayment }) => {
  if (!product) return null;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            SALE
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 rounded-t-xl overflow-hidden">
        <img
          src={product.image || "/api/placeholder/400/320"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => handleAddToCart(product._id)}
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-200 transform hover:scale-110"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link
            to={`${product._id}`}
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-200 transform hover:scale-110"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        {/* Product Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              BDT : {product.price?.toFixed(2)}tk
            </p>
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through">
                BDT: {product.oldPrice.toFixed(2)}TK
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handlePayment(product._id)}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-2.5 px-4 rounded-lg font-medium
                     hover:from-green-700 hover:to-green-600 transition-all duration-200 flex items-center justify-center gap-2
                     focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            <CreditCard className="w-5 h-5" />
            Buy Now
          </button>
          
        </div>

        {/* Additional Info */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-3 text-sm text-red-500 text-center">
            Only {product.stock} items left!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
