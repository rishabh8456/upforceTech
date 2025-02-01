import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { ProductTypes } from "../types/productTypes";
import { FALLBACK_IMAGE } from "../helper/common";

const ProductTable: React.FC<{
  products: ProductTypes[]; // Array of products to display in the table
  onProductClick: (id: number) => void; // Function for handling product click to view details
  onEditProduct: (product: any) => void; // Function for handling product edit
  onDeleteProduct: (id: number) => void; // Function for handling product deletion
}> = ({ products, onProductClick, onEditProduct, onDeleteProduct }) => {
  return (
    <div className="overflow-x-auto max-h-[500px]">
      <table className="w-full bg-white">
        <thead className="sticky top-0 bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-center">Price</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light overflow-y-auto">
          {products.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-4 text-center">
                <img
                  src={item?.thumbnail ?? FALLBACK_IMAGE}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md shadow-sm"
                />
              </td>
              <td className="p-4 font-semibold">{item.title}</td>
              <td className="p-4 text-center font-medium text-green-600">
                ${item.price}
              </td>
              <td className="p-4 flex justify-center space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    onProductClick(item.id);
                  }}
                >
                  <FaEye size={16} />
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    onEditProduct(item);
                  }}
                >
                  <FaEdit size={16} />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    onDeleteProduct(item.id);
                  }}
                >
                  <FaTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
