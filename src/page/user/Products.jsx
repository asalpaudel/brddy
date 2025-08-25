import React, { useState, useEffect, useMemo } from 'react';
import ProductList from '../../component/user/ProductList';
import { getAllProducts } from '../../services/product';
import { getAllCategories } from '../../services/category';
import { toast } from 'react-toastify';
import { HiSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const PRODUCTS_PER_PAGE = 9;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategoryId, setSelectedCategoryId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

   
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, categoryData] = await Promise.all([
                    getAllProducts(),
                    getAllCategories()
                ]);
                setProducts(productData);
                setCategories(categoryData);
            } catch (error) {
                toast.error("Failed to load product data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                
                if (selectedCategoryId === 'all') return true;
                return product.categoryIds?.includes(selectedCategoryId);
            })
            .filter(product => {

                if (!searchTerm) return true;
                return product.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
    }, [products, selectedCategoryId, searchTerm]);


    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategoryId, searchTerm]);
    
    const selectedCategoryName = useMemo(() => {
        if (selectedCategoryId === 'all') return 'All Products';
        return categories.find(cat => cat.id === selectedCategoryId)?.name || 'Products';
    }, [categories, selectedCategoryId]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term
        setSelectedCategoryId('all'); // Reset the category filter
    };

    if (loading) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <aside className="lg:col-span-1">
                    <h2 className="text-xl font-bold text-stone-800 mb-4">Categories</h2>
                    <ul className="space-y-2 lg:h-auto lg:overflow-y-visible h-64 overflow-y-auto">

                        <li>
                            <button
                                onClick={() => setSelectedCategoryId('all')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${selectedCategoryId === 'all' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 hover:bg-amber-100'}`}
                            >
                                All Products
                            </button>
                        </li>

                        {categories.map(category => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setSelectedCategoryId(category.id)}
                                    className={`w-full flex items-center justify-between text-left px-4 py-2 rounded-md transition-colors duration-200 ${selectedCategoryId === category.id ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 hover:bg-amber-100'}`}
                                >
                                    <span>{category.name}</span>
                                    {category.image && <img src={category.image} alt={category.name} className="w-8 h-8 object-cover rounded-sm" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>


                <main className="lg:col-span-3">
                    <h1 className="text-3xl font-bold text-stone-800 mb-6">{selectedCategoryName}</h1>

                    <ProductList products={paginatedProducts} />

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 space-x-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md bg-gray-200 hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <HiChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="font-medium">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md bg-gray-200 hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <HiChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;