import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCategories, deleteCategory } from '../../services/category';
// Corrected the import from 'AddComponent' to 'AddCategory'
import AddCategory from '../../component/admin/AddCategory';
import CategoryRow from '../../component/admin/CategoryRow';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const fetchCategories = () => {
        getAllCategories()
            .then(setCategories)
            .catch(() => toast.error("Failed to fetch categories."));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = () => {
        setCategoryToEdit(null);
        setShowForm(true);
    };

    const handleEdit = (category) => {
        setCategoryToEdit(category);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category? This might affect products associated with it.')) {
            deleteCategory(id)
                .then(() => {
                    toast.success('Category deleted successfully.');
                    fetchCategories();
                })
                .catch(err => toast.error('Failed to delete category.'));
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setCategoryToEdit(null);
        fetchCategories();
    };

    if (showForm) {
        // I am assuming AddComponent.jsx is supposed to be AddCategory.jsx
        // If the component file is named AddComponent, change the import above.
        return <AddCategory categoryToEdit={categoryToEdit} onFormClose={handleFormClose} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-stone-700">Product Categories</h2>
                <button onClick={handleAdd} className="bg-amber-500 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition-colors">
                    + Add Category
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-amber-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Image</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-stone-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-stone-700">
                        {categories.length > 0 ? (
                           <CategoryRow categoryData={categories} handleEdit={handleEdit} handleDelete={handleDelete} />
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-8 text-stone-500">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;