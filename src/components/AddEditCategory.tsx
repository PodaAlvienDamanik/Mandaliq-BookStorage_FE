    import React, { useState, useEffect } from 'react';
    import { CategoryType, CreateCategoryPayload, UpdateCategoryPayload } from '../types'; // Adjust path

    interface Props {
        category: CategoryType | null; // Use the type, null for add mode
        onClose: () => void;
        onSave: (data: CreateCategoryPayload | UpdateCategoryPayload) => void; // Pass data object
        errorMessage?: string | null; // To display save errors from parent
    }

    const AddEditCategory: React.FC<Props> = ({ category, onClose, onSave, errorMessage }) => {
        const [name, setName] = useState('');
        const isEditing = category !== null; // Determine mode

        // Populate form when category prop changes (for editing)
        useEffect(() => {
            if (isEditing && category) {
                setName(category.name);
            } else {
                setName(''); // Reset for adding
            }
        }, [category, isEditing]);

        const handleSubmit = () => {
            if (name.trim()) {
                onSave({ name: name.trim() }); // Send object with name property
            }
            // Basic validation - could add more here
        };

        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
                    <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl" title="Close">
                        × {/* Use HTML entity for X */}
                    </button>
                    <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>

                    {/* Display Save Error */}
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-3 text-sm" role="alert">
                        {errorMessage}
                        </div>
                    )}

                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        placeholder="e.g., Science Fiction"
                        className={`w-full border rounded px-3 py-2 mb-4 ${errorMessage ? 'border-red-500' : 'border-gray-300'}`} // Highlight on error
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus // Focus input on modal open
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim()} // Disable if name is empty
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full disabled:opacity-50"
                    >
                        {isEditing ? 'Save Changes' : 'Add Category'}
                    </button>
                </div>
            </div>
        );
    };

    export default AddEditCategory;