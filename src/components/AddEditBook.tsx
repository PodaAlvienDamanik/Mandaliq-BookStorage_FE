    // src/components/AddEditBook.tsx (No Image)
    import React, { useState, useEffect } from 'react';
    import { BookType, CategoryType, CreateBookPayload, UpdateBookPayload } from '../types';
    import { CloseOutlined, SaveOutlined } from '@ant-design/icons';

    interface Props {
        book: BookType | null;
        categories: CategoryType[];
        onClose: () => void;
        onSave: (data: CreateBookPayload | UpdateBookPayload) => void;
        errorMessage?: string | null;
        isSubmitting?: boolean;
    }

    // Define the state type WITHOUT image
    type AddEditFormData = Omit<Partial<CreateBookPayload & { id?: number }>, 'image'>;


    const AddEditBook: React.FC<Props> = ({ book, categories, onClose, onSave, errorMessage, isSubmitting }) => {
        // State for form data, without image field
        const [formData, setFormData] = useState<AddEditFormData>({
            id: undefined,
            title: '',
            author: '',
            description: '', // Keep description
            categoryId: undefined,
        });

        const isEditing = book !== null && book.id > 0;

        useEffect(() => {
            if (isEditing && book) {
                setFormData({
                    id: book.id,
                    title: book.title || '',
                    author: book.author || '',
                    description: book.description || '', // Populate description
                    categoryId: book.category?.id,
                });
            } else {
                // Reset form for adding, without image
                setFormData({
                    id: undefined,
                    title: '',
                    author: '',
                    description: '',
                    categoryId: undefined,
                });
            }
        }, [book, isEditing]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            const newValue = name === 'categoryId' ? (value ? parseInt(value, 10) : undefined) : value;
            setFormData(prev => ({ ...prev, [name]: newValue }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!formData.title || !formData.author || !formData.categoryId) {
                alert('Please fill in Title, Author, and select a Category.');
                return;
            }

            // Prepare payload WITHOUT image
            const payload: CreateBookPayload | UpdateBookPayload = {
                title: formData.title,
                author: formData.author,
                description: formData.description || '', // Keep description
                // No image field here
                categoryId: Number(formData.categoryId),
            };

            onSave(payload);
        };

        // --- Render ---
        return (
            <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col">
                    {/* Header Modal */}
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {isEditing ? 'Edit Book' : 'Add New Book'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Close"
                            disabled={isSubmitting}
                        >
                            <CloseOutlined />
                        </button>
                    </div>

                    {/* Body Modal (Scrollable) */}
                    <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-grow">
                        {errorMessage && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded text-sm mb-4" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        {/* Form Fields */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author <span className="text-red-500">*</span></label>
                            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
                            <select id="categoryId" name="categoryId" value={formData.categoryId ?? ''} onChange={handleChange} required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="" disabled>Select a Category</option>
                                {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                        </div>

                        {/* REMOVED Image URL Input */}
                        {/* REMOVED Image Preview */}

                    </form>

                    {/* Footer Modal */}
                    <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 z-10">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                            Cancel
                        </button>
                        <button type="submit" form="addEditForm" disabled={isSubmitting} className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
                            <SaveOutlined /> {isSubmitting ? "Saving..." : (isEditing ? "Update" : "Save Book")}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    export default AddEditBook;