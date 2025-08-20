import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, uploadImage } from '../../services/product';
import { getAllCategories } from '../../services/category'; // Import category service
import { toast } from 'react-toastify';
import { Select } from 'antd'; // Import Select from Ant Design
import { HiOutlinePhotograph, HiXCircle } from 'react-icons/hi';

const AddProduct = ({ productToEdit, onFormClose }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryIds: [], // Changed from 'category'
        images: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]); // State for all categories

    // Fetch all categories when the component mounts
    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
            setImagePreviews(productToEdit.images);
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };
    
    // Handler for the multi-select dropdown
    const handleCategoryChange = (selectedIds) => {
        setProduct(prev => ({ ...prev, categoryIds: selectedIds }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        // This logic needs to differentiate between old and new images if editing
        // For simplicity, we'll just handle previews of new files for removal
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadedImageUrls = await Promise.all(
                imageFiles.map(file => uploadImage(file))
            );
            const existingImages = productToEdit ? product.images.filter(img => imagePreviews.includes(img)) : [];
            const finalImageUrls = [...existingImages, ...uploadedImageUrls];
            const productData = {
                ...product,
                images: finalImageUrls,
                updatedAt: new Date().toISOString()
            };

            if (productToEdit) {
                await updateProduct(productToEdit.id, productData);
                toast.success('Product updated!');
            } else {
                await createProduct({ ...productData, createdAt: new Date().toISOString() });
                toast.success('Product created!');
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
                    <label className="block text-sm font-medium text-stone-700">Product Name</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} className="mt-1 block w-full" required />
                </div>
                
                {/* New Category Multi-Select Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-stone-700">Categories</label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%', marginTop: '4px' }}
                        placeholder="Please select categories"
                        value={product.categoryIds}
                        onChange={handleCategoryChange}
                        options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-stone-700">Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} rows="4" className="mt-1 block w-full"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700">Price</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} className="mt-1 block w-full" required />
                </div>
                
                {/* Image upload section remains the same */}
                <div>
                    <label className="block text-sm font-medium text-stone-700">Product Images</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-400" />
                            <label htmlFor="file-upload" className="cursor-pointer font-medium text-amber-600 hover:text-amber-500">
                                <span>Upload files</span>
                                <input id="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {imagePreviews.map((img, index) => (
                        <div key={index} className="relative group">
                            <img src={img} alt="Preview" className="h-32 w-full object-cover rounded-md" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
                                <HiXCircle className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onFormClose} className="px-5 py-2 border rounded-md">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">Save Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;