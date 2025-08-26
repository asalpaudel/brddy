import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../services/product';
import { getAllCategories } from '../../services/category';
import ProductRow from '../../component/admin/ProductRow';
import AddProduct from '../../component/admin/AddProduct';
import ViewProduct from '../../component/admin/ViewProduct';
import { toast } from 'react-toastify';
import { HiPencil, HiTrash, HiEye } from 'react-icons/hi'; // Import icons for the card view

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [showView, setShowView] = useState(false);
    const [productToView, setProductToView] = useState(null);

    const fetchData = () => {
        getAllProducts().then(setProducts);
        getAllCategories().then(setCategories);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id)
                .then(() => {
                    toast.success('Product deleted successfully.');
                    fetchData();
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
        fetchData();
    };

    const handleView = (product) => {
        setProductToView(product);
        setShowView(true);
    };

    const handleViewClose = () => {
        setShowView(false);
        setProductToView(null);
    };
    
    // Helper to get category names for the mobile card view
    const getCategoryNames = (categoryIds) => {
        if (!categoryIds || !categories || !categories.length) return 'N/A';
        return categoryIds
            .map(id => categories.find(cat => cat.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    if (showForm) {
        return <AddProduct productToEdit={productToEdit} onFormClose={handleFormClose} />;
    }

    if (showView) {
        return <ViewProduct product={productToView} onViewClose={handleViewClose} categories={categories} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-stone-700">Product Information</h2>
                <button
                    onClick={handleAdd}
                    className="bg-amber-500 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition-colors duration-300 font-medium shadow-sm"
                >
                    + Add Product
                </button>
            </div>

            {/* Desktop Table View - Hidden on small screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-amber-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Image</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Categories</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Price</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Last Updated</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-stone-700">
                        <ProductRow 
                            productData={products} 
                            categories={categories} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            handleView={handleView}
                        />
                    </tbody>
                </table>
            </div>
            
            {/* Mobile Card View - Hidden on medium screens and up */}
            <div className="md:hidden space-y-4">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                        <div className="flex items-start gap-4">
                            <img 
                                src={(product.images && product.images.length > 0) ? product.images[0] : 'https://placehold.co/100x100?text=No+Image'} 
                                alt={product.name} 
                                className="h-20 w-20 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-stone-800">{product.name}</h3>
                                <p className="text-sm text-stone-600">{getCategoryNames(product.categoryIds)}</p>
                                <p className="text-md font-semibold text-amber-600 mt-1">Rs. {product.price}</p>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-4 pt-3 border-t border-gray-100 space-x-3">
                            <button onClick={() => handleView(product)} className="text-gray-500 hover:text-gray-700"><HiEye className="h-5 w-5" /></button>
                            <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700"><HiPencil className="h-5 w-5" /></button>
                            <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700"><HiTrash className="h-5 w-5" /></button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Product;