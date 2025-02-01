import React from "react";
import { ProductTypes } from "../types/productTypes";


interface ProductTileProps {
  item: ProductTypes;  // Defines the product object that will be passed to the component.
  onClick: () => void;  // This is a function that will be triggered when the tile is clicked.
}
const ProductTile: React.FC<ProductTileProps> = ({ item, onClick }) => {
  return (
    <div
      className="cursor-pointer bg-white justify-between w-[31%] px-2 py-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out flex flex-col items-center group"
      key={item.id}
    >
      <div className="h-24 w-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 mb-5">
        <img
          className="transition-all duration-300 transform group-hover:scale-125"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <button
        onClick={onClick}
        className="bg-blue-500 px-2 py-1 mt-5 rounded text-white"
      >
        {item.title}
      </button>
    </div>
  );
};

export default ProductTile;
