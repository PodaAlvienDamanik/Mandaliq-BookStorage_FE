    import React, { useState, useEffect } from 'react';
    import { BookType, CategoryType, CreateBookPayload, UpdateBookPayload } from '../types'; // Adjust path

    interface Props {
        book: BookType | null; // Null for add mode
        categories: CategoryType[]; // For dropdown
        onClose: () => void;
        onSave: (data: CreateBookPayload | UpdateBookPayload) => void; // Pass prepared payload
        errorMessage?: string | null; // To display save errors
    }

    const AddEditBook: React.FC<Props> = ({ book, categories, onClose, onSave, errorMessage }) => {
        // Form state - structure closely matches DTOs for easier saving
        const [formData, setFormData] = useState<Partial<CreateBookPayload & { id?: number }>>({
            id: undefined,
            title: '',
            author: '',
            description: '',
            image: '',
            categoryId: undefined, // Store category ID directly
        });

        const isEditing = book !== null && book.id > 0;

        // Populate form when book prop changes (for editing)
        useEffect(() => {
            if (isEditing && book) {
                setFormData({
                    id: book.id,
                    title: book.title || '',
                    author: book.author || '',
                    description: book.description || '',
                    image: book.image || '',
                    categoryId: book.category?.id, // Extract ID from nested object
                });
            } else {
                // Reset form for adding
                setFormData({
                    id: undefined,
                    title: '',
                    author: '',
                    description: '',
                    image: '',
                    categoryId: undefined,
                });
            }
        }, [book, isEditing]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault(); // Prevent default form submission

            // Basic Validation (Add more as needed)
            if (!formData.title || !formData.author || !formData.categoryId) {
                alert('Please fill in Title, Author, and select a Category.');
                return;
            }

            // Prepare payload - ensure categoryId is a number
            const payload: CreateBookPayload | UpdateBookPayload = {
                title: formData.title,
                author: formData.author,
                description: formData.description || '', // Send empty string if undefined
                image: formData.image || undefined, // Send undefined if empty, backend might handle null/empty differently
                categoryId: Number(formData.categoryId), // Ensure it's a number
            };

            onSave(payload); // Pass the prepared payload to parent handler
        };

        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"> {/* Scroll for smaller screens */}
                    <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl" title="Close">
                        × {/* Use HTML entity for X */}
                    </button>
                    <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Book Details' : 'Add New Book'}</h2>

                    {/* Display Save Error */}
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-3 text-sm" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="title"
                                name="title" // Name matches state key
                                placeholder="Book Title"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="author"
                                name="author" // Name matches state key
                                placeholder="Author Name"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                            <select
                                id="categoryId"
                                name="categoryId" // Name matches state key
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.categoryId ?? ''} // Handle undefined for placeholder
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                id="description"
                                name="description" // Name matches state key
                                placeholder="Book summary or description..."
                                rows={4}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
                        >
                            {isEditing ? 'Save Changes' : 'Add Book'}
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    export default AddEditBook;