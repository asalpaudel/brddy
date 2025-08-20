import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createCategory, updateCategory } from '../../services/category';
import { uploadImage } from '../../services/product'; // Re-use the image upload service
import { HiOutlinePhotograph } from 'react-icons/hi';

const AddCategory = ({ categoryToEdit, onFormClose }) => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setImagePreview(categoryToEdit.image);
        }
    }, [categoryToEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = categoryToEdit ? categoryToEdit.image : '';
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const categoryData = { name, image: imageUrl };

            if (categoryToEdit) {
                await updateCategory(categoryToEdit.id, categoryData);
                toast.success('Category updated!');
            } else {
                await createCategory(categoryData);
                toast.success('Category created!');
            }
            onFormClose();
        } catch (err) {
            toast.error('Failed to save category.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-700 mb-6">{categoryToEdit ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">Category Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700">Category Image</label>
                    <div className="mt-2 flex items-center space-x-4">
                        {imagePreview && <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-md" />}
                        <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-stone-700 hover:bg-gray-50">
                            <span>{imagePreview ? 'Change' : 'Upload'} Image</span>
                            <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onFormClose} className="px-5 py-2 border rounded-md">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">Save Category</button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;