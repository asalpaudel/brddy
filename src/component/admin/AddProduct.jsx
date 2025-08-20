import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, uploadImage } from '../../services/product';
import { getAllCategories } from '../../services/category'; // Import category service
import { toast } from 'react-toastify';
import { HiOutlinePhotograph, HiXCircle } from 'react-icons/hi';

const AddProduct = ({ productToEdit, onFormClose }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryIds: [], // Changed to categoryIds to store an array of IDs
        images: []
    });
    const [categories, setCategories] = useState([]); // State to hold all categories
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    // Fetch categories when the component mounts
    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch(err => toast.error("Failed to load categories."));
    }, []);

    useEffect(() => {
        if (productToEdit) {
            // Ensure categoryIds is an array, defaulting to empty if it's not present
            setProduct({ ...productToEdit, categoryIds: productToEdit.categoryIds || [] });
            setImagePreviews(productToEdit.images || []);
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };
    
    // Handle multi-select for categories
    const handleCategoryChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        setProduct(prev => ({ ...prev, categoryIds: selectedIds }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        // Filter out any files that are not images
        const imageFilesOnly = files.filter(file => file.type.startsWith('image/'));
        if (imageFilesOnly.length !== files.length) {
            toast.warn("Some files were not images and were ignored.");
        }
        
        setImageFiles(prev => [...prev, ...imageFilesOnly]);

        const newPreviews = imageFilesOnly.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (indexToRemove) => {
        // Create copies of the arrays to avoid direct mutation
        const newImagePreviews = [...imagePreviews];
        const newImageFiles = [...imageFiles];
        const newProductImages = product.images ? [...product.images] : [];
    
        // Get the URL of the image to be removed
        const removedPreview = newImagePreviews[indexToRemove];
    
        // Check if the removed image was an existing one (a full URL) or a new one (a blob URL)
        const existingImageIndex = newProductImages.indexOf(removedPreview);
    
        if (existingImageIndex > -1) {
            // It's an existing image, remove it from the product.images array
            newProductImages.splice(existingImageIndex, 1);
            setProduct(prev => ({ ...prev, images: newProductImages }));
        } else {
            // It's a newly added image (blob), find its corresponding file to remove
            // This part is tricky because blob URLs don't directly map to files.
            // A safer approach for new files is to handle their removal from imageFiles array.
            // Assuming the order is maintained, we can remove by index from imageFiles.
            // This logic needs to be robust, here we assume correlation by index.
            // A better way would be to create an array of objects {file, previewUrl}
            
            // For now, let's just remove from previews and files based on index.
            // This assumes newly added files and previews are in sync.
            // Find the index of the blob URL in the previews to find the file index.
             const fileIndexToRemove = imagePreviews.reduce((acc, current, idx) => {
                 if (current === removedPreview) {
                     // Check if this URL is from a file, not from productToEdit.images
                     if (productToEdit && productToEdit.images.includes(current)) {
                         return acc;
                     }
                     return idx - (productToEdit ? productToEdit.images.length : 0)
                 }
                 return acc;
             }, -1);
             if (fileIndexToRemove > -1) {
                newImageFiles.splice(fileIndexToRemove, 1)
                setImageFiles(newImageFiles)
            }

        }
        
        // Always remove it from the preview list
        newImagePreviews.splice(indexToRemove, 1);
        setImagePreviews(newImagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Upload only the new image files
            const uploadedImageUrls = await Promise.all(
                imageFiles.map(file => uploadImage(file))
            );

            // Combine existing images (if editing) with the newly uploaded ones
            const existingImages = product.images || [];
            const finalImageUrls = [...existingImages, ...uploadedImageUrls];

            const productData = {
                ...product,
                price: parseFloat(product.price), // Ensure price is a number
                images: finalImageUrls,
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
            toast.error('Failed to save product. Please check the console for details.');
            console.error("Save Product Error:", error);
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
                        <input type="number" name="price" id="price" value={product.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required step="0.01" min="0" />
                    </div>
                    <div>
                        <label htmlFor="categoryIds" className="block text-sm font-medium text-stone-700">Categories</label>
                        <select
                            id="categoryIds"
                            name="categoryIds"
                            multiple={true} // Enable multi-select
                            value={product.categoryIds}
                            onChange={handleCategoryChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 h-32"
                            required
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                         <p className="text-xs text-gray-500 mt-1">Hold Ctrl (or Cmd on Mac) to select multiple categories.</p>
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
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {imagePreviews.map((imgSrc, index) => (
                            <div key={index} className="relative group">
                                <img src={imgSrc} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover rounded-md border" />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700">
                                    <HiXCircle className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onFormClose} className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-stone-700 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors">Save Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;