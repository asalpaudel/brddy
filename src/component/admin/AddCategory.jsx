import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createCategory, updateCategory } from '../../services/category';
import { uploadImage } from '../../services/product'; 
import { HiOutlinePhotograph } from 'react-icons/hi';

const AddCategory = ({ categoryToEdit, onFormClose }) => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setImagePreview(categoryToEdit.image);
        }
    }, [categoryToEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            if (!file.type.startsWith('image/')) {
                toast.error("Please upload a valid image file (PNG, JPG, etc.).");
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable form controls

        let imageUrl = categoryToEdit ? categoryToEdit.image : '';

        // --- Step 1: Handle Image Upload ---
        if (imageFile) {
            try {
                toast.info("Uploading image...");
                imageUrl = await uploadImage(imageFile);
                toast.success("Image uploaded successfully!");
            } catch (uploadError) {
                console.error("Image Upload Error:", uploadError);
                toast.error("Error: Image upload failed. Please check if the image server is running.");
                setIsLoading(false); // Re-enable form
                return; // Stop the submission process
            }
        }

        // --- Step 2: Prepare and Save Category Data ---
        const categoryData = { 
            name, 
            image: imageUrl 
        };

        try {
            if (categoryToEdit) {
                await updateCategory(categoryToEdit.id, categoryData);
                toast.success('Category updated successfully!');
            } else {
                await createCategory(categoryData);
                toast.success('Category created successfully!');
            }
            onFormClose(); // Close the form on success
        } catch (saveError) {
            console.error("Category Save Error:", saveError);
            toast.error("Error: Could not save the category. Please check if the data server is running.");
        } finally {
            setIsLoading(false); // Re-enable form in case of error
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-700 mb-6">{categoryToEdit ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">Category Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700">Category Image</label>
                    <div className="mt-2 flex items-center space-x-4">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-md border" />
                        ) : (
                            <div className="h-20 w-20 flex items-center justify-center bg-gray-100 rounded-md border">
                                <HiOutlinePhotograph className="h-10 w-10 text-gray-400" />
                            </div>
                        )}
                        <label htmlFor="file-upload" className={`cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-stone-700 hover:bg-gray-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <span>{imagePreview ? 'Change' : 'Upload'} Image</span>
                            <input 
                                id="file-upload" 
                                type="file" 
                                className="sr-only" 
                                onChange={handleImageChange} 
                                accept="image/*"
                                disabled={isLoading}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button 
                        type="button" 
                        onClick={onFormClose} 
                        className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-stone-700 hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className={`px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;