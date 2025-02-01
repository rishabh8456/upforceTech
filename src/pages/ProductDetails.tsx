import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../components/ProductImages";
import ReviewerData from "../components/ReviewData";
import { fetchProductDetails } from "../services/productService";
import LoadingSpinner from "../components/Loader";
import { ProductDetailsTypes } from "../types/productTypes";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [productDetails, setProductDetails] =
    useState<ProductDetailsTypes | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  // Function to fetch product data from API
  const fetchProductData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetchProductDetails(id);
      setProductDetails(response);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Memoized content rendering to optimize performance
  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10 min-h-[500px]">
          <LoadingSpinner />
        </div>
      );
    }

    return !productDetails ? (
      <div className="flex justify-center items-center py-10 min-h-[500px]">
        <h2 className="text-lg font-bold text-gray-500">Product not found</h2>
      </div>
    ) : (
      <div className="p-10">
        <h1 className="text-4xl font-bold">{productDetails.title}</h1>
        <h4 className="mt-5 text-gray-700">{productDetails.description}</h4>

        {productDetails.images && (
          <ProductImages images={productDetails.images} />
        )}

        <div className="mt-5">
          {productDetails.reviews?.length ? (
            productDetails.reviews.map((item, index) => (
              <ReviewerData key={index} reviewData={item} />
            ))
          ) : (
            <p>No Reviews Available</p>
          )}
        </div>
      </div>
    );
  }, [loading, productDetails]);

  return <div className="h-screen bg-slate-100">{renderContent}</div>;
};

export default ProductDetails;
