import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const imageUrl = (product.images && product.images.length > 0) ? product.images[0] : 'https://placehold.co/300x300?text=No+Image';

    return (
        <div className="border border-gray-100 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Link to={`/products/${product.id}`}>
                <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-stone-800 truncate">{product.name}</h3>
                    <p className="text-amber-600 font-bold mt-2">Rs. {parseFloat(product.price).toFixed(2)}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
