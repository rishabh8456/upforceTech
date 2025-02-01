import { useState } from "react";
import { NewProductTypes } from "../types/productTypes";

interface ProductModalProps {
  isOpen: boolean; // Indicates whether the modal is open
  product?: NewProductTypes | null; // Optional product data to edit (null for new product)
  onSave: (product: any) => void; // Function to handle saving the product
  onClose: () => void; // Function to close the modal
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  product,
  onSave,
  onClose,
}) => {
  const isEditMode = !!product?.id;

  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Handle form submission
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave({ id: product?.id, ...formData });
    setIsSaving(false);
    onClose();
  };

  // Update form data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 animate-fade-in transform transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditMode ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSave}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2"
            rows={3}
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            min="0"
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white transition ${
                isSaving ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
