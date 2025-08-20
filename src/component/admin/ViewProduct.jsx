import React, { useState, useRef, useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { Carousel } from 'antd';

const ViewProduct = ({ product, onViewClose }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    // Reset slide index when product changes
    useEffect(() => {
        setCurrentSlide(0);
        if (carouselRef.current) {
            carouselRef.current.goTo(0, true);
        }
    }, [product]);

    if (!product) return null;

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalVisible(true);
    };

    const closeImageModal = () => {
        setIsModalVisible(false);
        setSelectedImage('');
    };

    const handleThumbnailClick = (index) => {
        setCurrentSlide(index);
        carouselRef.current.goTo(index);
    };

    return (
        <>
            {/* Main Product View Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-stone-700">{product.name}</h2>
                    <button onClick={onViewClose} className="text-gray-400 hover:text-gray-600">
                        <HiX className="h-6 w-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Gallery Section */}
                    <div>
                        {/* Main Carousel */}
                        {product.images.length > 0 ? (
                            <Carousel 
                                ref={carouselRef}
                                afterChange={(current) => setCurrentSlide(current)}
                                dots={false} // We are using custom thumbnails as dots
                            >
                                {product.images.map((img, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
                                            <img
                                                src={img}
                                                alt={`${product.name} image ${index + 1}`}
                                                className="w-full h-80 object-contain rounded-lg cursor-pointer"
                                                onClick={() => openImageModal(img)}
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

                        {/* Thumbnail Navigation */}
                        <div className="flex space-x-2 mt-4 overflow-x-auto p-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={`thumb-${index}`}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                                        currentSlide === index ? 'border-amber-500 scale-110' : 'border-transparent hover:border-gray-300'
                                    }`}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-stone-600">Description</h3>
                            <p className="text-stone-700 mt-2">{product.description || 'No description provided.'}</p>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <dt className="text-sm font-medium text-stone-500">Price</dt>
                                <dd className="text-sm text-stone-900 font-semibold">${product.price}</dd>

                                <dt className="text-sm font-medium text-stone-500">Category</dt>
                                <dd className="text-sm text-stone-900">{product.category}</dd>

                                <dt className="text-sm font-medium text-stone-500">Created At</dt>
                                <dd className="text-sm text-stone-900">{new Date(product.createdAt).toLocaleString()}</dd>

                                <dt className="text-sm font-medium text-stone-500">Last Updated</dt>
                                <dd className="text-sm text-stone-900">{new Date(product.updatedAt).toLocaleString()}</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={onViewClose}
                        className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-stone-700 hover:bg-gray-50"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Image Viewer Modal (Lightbox) */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImageModal}>
                    <button onClick={closeImageModal} className="absolute top-4 right-4 text-white text-4xl z-50">
                        <HiX />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Enlarged product view"
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                    />
                </div>
            )}
        </>
    );
};

export default ViewProduct;