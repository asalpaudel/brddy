import axios from 'axios';

// Server 1: The JSON data API
const API_URL = 'http://localhost:4000/products';

// Server 2: The new image upload API on a different port
const UPLOAD_URL = 'http://localhost:4001/upload';

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // The server now returns the full URL, e.g., http://localhost:4001/images/filename.jpg
    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// --- All other functions remain the same, pointing to the JSON data API ---

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};