import axios from 'axios';

const API_URL = 'http://localhost:4000/categories';

export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error("Error fetching categories:", error.response ? error.response.data : error.message);
    return [];
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error("Error creating category:", error.response ? error.response.data : error.message);
    // Re-throw the error so the component can catch it
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error("Error updating category:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    // Enhanced error logging
    console.error("Error deleting category:", error.response ? error.response.data : error.message);
    throw error;
  }
};