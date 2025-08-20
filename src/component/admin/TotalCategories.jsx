// src/component/admin/TotalCategories.jsx

import React, { useState, useEffect } from 'react'; // <-- This line is now fixed
import { HiOutlineTag } from 'react-icons/hi';
import { getAllCategories } from '../../services/category';

const TotalCategories = () => {
    const [categoryCount, setCategoryCount] = useState(0);

    useEffect(() => {
        // Fetch categories and update the count
        getAllCategories()
            .then(categories => {
                setCategoryCount(categories.length);
            })
            .catch(error => {
                console.error("Failed to fetch categories for count:", error);
            });
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
                <HiOutlineTag className="h-8 w-8 text-green-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-stone-500">Total Categories</p>
                <p className="text-3xl font-bold text-stone-800">{categoryCount}</p>
            </div>
        </div>
    );
};

export default TotalCategories;