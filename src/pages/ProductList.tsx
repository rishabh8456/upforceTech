import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Loader";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ProductListHeader from "../components/ProductListHeader";
import {
  addProduct,
  deleteProduct,
  fetchProductsList,
  updateProduct,
} from "../services/productService";
import { useDebounce } from "../hook/useDebounce";
import ProductModel from "../components/ProductModel";
import { NewProductTypes, ProductTypes } from "../types/productTypes";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProductListPage: React.FC = () => {
  // State variables for managing product list and other UI states
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchProductText, setSearchProductText] = useState<string>("");
  const [sort, setSort] = useState<string>("asc");
  const [selectedProduct, setSelectedProduct] =
    useState<NewProductTypes | null>(null);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const debouncedSearchProductText = useDebounce(searchProductText, 500);

  // Fetch products with the search string, page number, and sorting order
  const getProducts = useCallback(
    async (searchString: string, pageNumber: number, sortOrder: string) => {
      setLoading(true);
      try {
        const result = await fetchProductsList(
          searchString,
          pageNumber,
          sortOrder
        );
        if (result) {
          setProducts(result.products || []);
          setTotalItem(result.total || 0);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
        toast.error("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Effect to fetch products whenever the search text, sort, or page changes
  useEffect(() => {
    getProducts(debouncedSearchProductText, 1, sort);
    setCurrentPage(1);
  }, [debouncedSearchProductText, sort, getProducts]);

  // Handle page changes and fetch corresponding products
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      getProducts(debouncedSearchProductText, page, sort);
    },
    [debouncedSearchProductText, sort, getProducts]
  );

  // Handle sorting logic
  const handleSorting = (sorting: string) => {
    setSort(sorting);
  };

  // Delete product item by ID with confirmation
  const deleteProductItem = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
        toast.success("Deleted successfully");
      } catch (err) {
        console.error("Failed to delete product", err);
        toast.error("Failed to delete the product. Please try again.");
      }
    }
  };

  // Handle save (create or update) product
  const handleSaveProduct = async (product: ProductTypes) => {
    try {
      if (product.id) {
        const { id, ...updatedData } = product;
        const result = await updateProduct(id, updatedData);
        if (result) {
          setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
          );
          toast.success("Updated successfully");
        }
      } else {
        const result = await addProduct(product);
        if (result) {
          setProducts([result, ...products]);
          toast.success("Added successfully");
        }
      }
    } catch (err) {
      console.error("Failed to save product", err);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setSelectedProduct(null);
      setIsModelOpen(false);
    }
  };

  // Handle edit product (open modal with existing product data)
  const handleEditProduct = (product: ProductTypes) => {
    setSelectedProduct(product);
    setIsModelOpen(true);
  };

  // Handle new product creation (open empty modal)
  const handleNewProduct = () => {
    setSelectedProduct(null);
    setIsModelOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModelOpen(false);
    setSelectedProduct(null); 
  };

  // Memoized rendering logic (optimizes performance)
  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10 min-h-[500px]">
          <LoadingSpinner />
        </div>
      );
    }

    return products.length === 0 ? (
      <div className="flex justify-center items-center py-10 min-h-[500px]">
        <h2 className="text-lg font-bold text-gray-500">No Data Available</h2>
      </div>
    ) : (
      <ProductTable
        products={products}
        onProductClick={(id) => navigate(`/product-details/${id}`)}
        onEditProduct={handleEditProduct}
        onDeleteProduct={deleteProductItem}
      />
    );
  }, [loading, products, navigate]);

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Product list header with search, sorting, and add new product button */}
      <ProductListHeader
        searchQuery={searchProductText}
        setSearchQuery={setSearchProductText}
        sortOption={sort}
        setSortOption={handleSorting}
        handleAddProduct={handleNewProduct}
      />

      <div className="overflow-x-auto">{renderContent}</div>

      {/* Pagination component */}
      {totalItem > 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItem={totalItem}
        />
      )}

      {/* Product modal for adding/editing products */}
      {isModelOpen && (
        <ProductModel
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseModal}
          isOpen={isModelOpen}
        />
      )}
    </div>
  );
};

export default ProductListPage;
