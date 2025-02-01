import { PAGE_SIZE } from "../helper/common";
import { apiFetch } from "../utils/apiService";

const fetchProductsList = async (searchString: string = '', currentPage: number = 1, sort: string = 'asc') => {
  try {
    const result = await apiFetch(`/search?q=${searchString}&limit=${PAGE_SIZE}&skip=${(currentPage - 1) * PAGE_SIZE
      }&sortBy=price&order=${sort}`);
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

const addProduct = async (product: any) => {
  try {
    const result = await apiFetch(`/add`, 'POST', product);
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

const updateProduct = async (id: number, product: any) => {
  try {
    const result = await apiFetch(`/${id}`, "PUT", product);
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

const deleteProduct = async (id: number) => {
  try {
    const response = await apiFetch(`/${id}`, "DELETE");
    return response;
  } catch (error: any) {
    return { error: error.message };
  }
};


const fetchProductDetails = async (id: string) => {
  try {
    const result = await apiFetch(`/${id}`, "GET");
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

export { fetchProductDetails, fetchProductsList, addProduct, deleteProduct, updateProduct }