import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, uploadImage } from '../../services/product';
import { toast } from 'react-toastify';
import { HiOutlinePhotograph, HiXCircle } from 'react-icons/hi';

const AddProduct = ({ productToEdit, onFormClose }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        images: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
            // The full URL is already in productToEdit.images, so we can use it directly
            setImagePreviews(productToEdit.images);
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Upload new image files to the server
            const uploadedImageUrls = await Promise.all(
                imageFiles.map(file => uploadImage(file))
            );

            // Combine existing images (if editing) with the new ones
            const existingImages = productToEdit ? product.images : [];
            const finalImageUrls = [...existingImages, ...uploadedImageUrls];

            const productData = {
                ...product,
                images: finalImageUrls, // Use the real, full URLs from the server
                updatedAt: new Date().toISOString()
            };

            if (productToEdit) {
                await updateProduct(productToEdit.id, productData);
                toast.success('Product updated successfully!');
            } else {
                await createProduct({ ...productData, createdAt: new Date().toISOString() });
                toast.success('Product added successfully!');
            }
            onFormClose();

        } catch (error) {
            toast.error('Failed to save product.');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-700 mb-6">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">Product Name</label>
                    <input type="text" name="name" id="name" value={product.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-stone-700">Description</label>
                    <textarea name="description" id="description" value={product.description} onChange={handleChange} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-stone-700">Price</label>
                        <input type="number" name="price" id="price" value={product.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-stone-700">Category</label>
                        <input type="text" name="category" id="category" value={product.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700">Product Images</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500">
                                    <span>Upload files</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((img, index) => (
                        <div key={index} className="relative group">
                            <img src={img} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover rounded-md" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <HiXCircle className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onFormClose} className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-stone-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600">Save Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;