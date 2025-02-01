import React from "react";
import { PAGE_SIZE } from "../helper/common";

interface PaginationProps {
  currentPage: number; // The current active page number
  onPageChange: (page: number) => void; // Function to handle page changes
  totalItem: number; // Total number of items available
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalItem,
}) => {
  // Calculate the total number of pages based on total items and page size
  const totalPages = Math.ceil(totalItem / PAGE_SIZE);

  return (
    // Fixed position footer for pagination with padding and shadow
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md border-t">
      <div className="flex flex-wrap justify-center items-center gap-3">
        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="px-4 py-2 text-lg font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage >= totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage >= totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
