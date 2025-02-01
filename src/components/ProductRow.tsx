import React from "react";
import { ProductTypes } from "../types/productTypes";

interface ProductRowProps {
  item: ProductTypes; // The product data
  onProductClick: (id: number) => void; // Function to handle product click event
}

const ProductRow: React.FC<ProductRowProps> = ({ item, onProductClick }) => {
  return (
    <tr
      key={item.id}
      className="border-b cursor-pointer hover:bg-gray-100"
      onClick={() => onProductClick(item.id)}
    >
      <td className="p-3">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="p-3">{item.title}</td>
      <td className="p-3">${item.price}</td>
      <td className="p-3">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={(e) => {
            e.preventDefault();
            onProductClick(item.id);
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
