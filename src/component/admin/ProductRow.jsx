import React from 'react';
import { HiPencil, HiTrash, HiEye } from 'react-icons/hi';

const ProductRow = ({ productData, categories, handleEdit, handleDelete, handleView }) => {
    
    const getCategoryNames = (categoryIds) => {
        if (!categoryIds || !categories || !categories.length) return 'N/A';
        return categoryIds
            .map(id => categories.find(cat => cat.id === id)?.name)
            .filter(Boolean) 
            .join(', ');
    };

    return (
        <>
            {productData && productData.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-amber-50">
                    <td className="py-3 px-4">
                        <img 
                            // **FIX:** Safely check if images exist and have content before accessing the first element.
                            src={(item.images && item.images.length > 0) ? item.images[0] : 'https://placehold.co/100x100?text=No+Image'} 
                            alt={item.name} 
                            className="h-16 w-16 object-cover rounded-md"
                        />
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">{item.name}</td>
                    <td className="py-3 px-4">{getCategoryNames(item.categoryIds)}</td>
                    <td className="py-3 px-4">${item.price}</td>
                    <td className="py-3 px-4">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => handleEdit(item)}
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                aria-label="Edit"
                            >
                                <HiPencil className="h-5 w-5" />
                            </button>
                            <button 
                                onClick={() => handleDelete(item.id)} 
                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                aria-label="Delete"
                            >
                                <HiTrash className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => handleView(item)}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                aria-label="View"
                            >
                                <HiEye className="h-5 w-5" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default ProductRow;