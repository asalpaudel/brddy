import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../services/product';
import ProductRow from '../../component/admin/ProductRow';
import AddProduct from '../../component/admin/AddProduct';
import ViewProduct from '../../component/admin/ViewProduct'; // Import the new component
import { toast } from 'react-toastify';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [showView, setShowView] = useState(false); // State for viewing
    const [productToView, setProductToView] = useState(null); // State for the product to view

    const fetchProducts = () => {
        getAllProducts().then(setProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id)
                .then(() => {
                    toast.success('Product deleted successfully.');
                    fetchProducts();
                })
                .catch((error) => {
                    toast.error('Failed to delete product.');
                    console.log(error);
                });
        }
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
        setShowForm(true);
    };
    
    const handleAdd = () => {
        setProductToEdit(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setProductToEdit(null);
        fetchProducts();
    };

    // --- New functions for viewing ---
    const handleView = (product) => {
        setProductToView(product);
        setShowView(true);
    };

    const handleViewClose = () => {
        setShowView(false);
        setProductToView(null);
    };
    
    // Conditional Rendering Logic
    if (showForm) {
        return <AddProduct productToEdit={productToEdit} onFormClose={handleFormClose} />;
    }

    if (showView) {
        return <ViewProduct product={productToView} onViewClose={handleViewClose} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-stone-700">Product Information</h2>
                <button
                    onClick={handleAdd}
                    className="bg-amber-500 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition-colors duration-300 font-medium shadow-sm"
                >
                    + Add Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-amber-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Image</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Category</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Price</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Last Updated</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-stone-700">
                        <ProductRow 
                            productData={products} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            handleView={handleView} // Pass the new handler
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Product;