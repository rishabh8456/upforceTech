import React from "react";

interface ProductImagesProps {
  images: string[]; // Array of image URLs to display
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  return (
    <div className="flex mt-10 flex-wrap">
      {images.map((item, index) => (
        <div
          key={index}
          className="h-25 w-25 p-3 shadow-2xl mr-5 bg-white rounded-2xl"
        >
          <img
            className="h-full w-full cursor-pointer"
            src={item}
            alt={`Product ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductImages;
