import React from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';

const CategoryRow = ({ categoryData, handleEdit, handleDelete }) => {
    return (
        <>
            {categoryData.map(item => (
                <tr key={item.id} className="border-b hover:bg-amber-50">
                    <td className="py-3 px-4">
                        <img src={item.image || 'https://placehold.co/100x100?text=No+Image'} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                    </td>
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">
                        <div className="flex space-x-3">
                            <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700"><HiPencil className="h-5 w-5" /></button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700"><HiTrash className="h-5 w-5" /></button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default CategoryRow;