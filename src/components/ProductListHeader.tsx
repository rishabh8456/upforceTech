// ProductListHeader.tsx
import React from "react";

interface ProductListHeaderProps {
  searchQuery: string; // The current search query entered by the user
  setSearchQuery: (query: string) => void; // Function to update the search query
  sortOption: string; // The current sorting option selected (e.g., price, name)
  setSortOption: (option: string) => void; // Function to update the sorting option
  handleAddProduct: () => void; // Function to handle adding a new product
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  handleAddProduct
}) => {
  return (
    <div className="mb-4 p-4 flex flex-wrap items-center justify-between sticky top-0 bg-white z-10 shadow-lg">
      {/* Logo Section */}
      <h1 className="text-2xl md:text-xl sm:text-lg italic text-blue-400 font-semibold whitespace-nowrap">
        Flipkart
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 rounded-md bg-blue-100 text-gray-700 w-full sm:w-1/2 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out"
      />

      {/* Sorting Dropdown */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 rounded-md bg-blue-100 text-gray-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out mt-2 sm:mt-0"
      >
        <option value="asc">Sort by Price: Low to High</option>
        <option value="desc">Sort by Price: High to Low</option>
      </select>

      {/* Add Product Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto mt-2 sm:mt-0"
        onClick={handleAddProduct}
      >
        + Add Product
      </button>
    </div>
  );
};

export default ProductListHeader;
