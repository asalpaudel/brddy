import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/product';
import { getAllCategories } from '../../services/category';
import { Carousel } from 'antd';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext'; // Added import

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart(); // Added hook call

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (error) {
                toast.error('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoryData = await getAllCategories();
                setCategories(categoryData);
            } catch (error) {
                toast.error('Failed to fetch categories.');
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const getCategoryNames = () => {
        if (!product || !product.categoryIds || !categories.length) return 'N/A';
        return product.categoryIds
            .map(id => categories.find(cat => cat.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    {product.images && product.images.length > 0 ? (
                        <Carousel autoplay>
                            {product.images.map((img, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={img}
                                            alt={`${product.name} image ${index + 1}`}
                                            className="w-full h-80 object-contain rounded-lg"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg">
                            <p className="text-stone-500">No images available.</p>
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-stone-700">{product.name}</h2>
                    <div>
                        <h3 className="text-lg font-semibold text-stone-600">Description</h3>
                        <p className="text-stone-700 mt-2">{product.description || 'No description provided.'}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <dt className="text-sm font-medium text-stone-500">Price</dt>
                            <dd className="text-sm text-stone-900 font-semibold">${parseFloat(product.price).toFixed(2)}</dd>

                            <dt className="text-sm font-medium text-stone-500">Categories</dt>
                            <dd className="text-sm text-stone-900">{getCategoryNames()}</dd>
                        </dl>
                    </div>
                     <button onClick={() => addToCart(product)}
                        className="w-full mt-4 bg-amber-500 text-white px-5 py-3 rounded-md hover:bg-amber-600 transition-colors duration-300 font-medium shadow-sm"
                    >
                       Add to Cart
                      </button>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;