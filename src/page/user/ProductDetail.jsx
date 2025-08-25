import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getAllProducts } from '../../services/product';
import { getAllCategories } from '../../services/category';
import { Carousel } from 'antd';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import ProductList from '../../component/user/ProductList';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const [productData, allProductsData, categoryData] = await Promise.all([
                    getProductById(id),
                    getAllProducts(),
                    getAllCategories()
                ]);

                setProduct(productData);
                setAllProducts(allProductsData);
                setCategories(categoryData);

            } catch (error) {
                toast.error('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    useEffect(() => {
        if (product && allProducts.length > 0) {
            // First, try to find products in the same category.
            let related = allProducts.filter(p =>
                p.id !== product.id &&
                p.categoryIds?.some(catId => product.categoryIds?.includes(catId))
            );

            // If no related products are found, show the 6 most recent products.
            if (related.length === 0) {
                related = allProducts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .filter(p => p.id !== product.id);
            }
            
            setRelatedProducts(related.slice(0, 6)); 
        }
    }, [product, allProducts]);


    const getCategoryNames = () => {
        if (!product || !product.categoryIds || !categories.length) return 'N/A';
        return product.categoryIds
            .map(id => categories.find(cat => cat.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const handleThumbnailClick = (index) => {
        if (carouselRef.current) {
            setCurrentSlide(index);
            carouselRef.current.goTo(index);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        {product.images && product.images.length > 0 ? (
                            <>
                                <Carousel
                                    ref={carouselRef}
                                    afterChange={(current) => setCurrentSlide(current)}
                                    dots={false}
                                    autoplay
                                >
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
                                {product.images.length > 1 && (
                                    <div className="flex space-x-2 mt-4 overflow-x-auto p-2">
                                        {product.images.map((img, index) => (
                                            <img
                                                key={`thumb-${index}`}
                                                src={img}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${currentSlide === index ? 'border-amber-500 scale-110' : 'border-transparent hover:border-gray-300'
                                                    }`}
                                                onClick={() => handleThumbnailClick(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
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
                                <dd className="text-sm text-stone-900 font-semibold">Rs. {parseFloat(product.price).toFixed(2)}</dd>

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

            {relatedProducts.length > 0 && (
                <div className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">You might also like</h2>
                    <ProductList products={relatedProducts} />
                </div>
            )}
        </>
    );
};
export default ProductDetail;