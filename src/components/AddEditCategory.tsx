    // src/components/AddEditCategory.tsx
    import React, { useState, useEffect } from 'react';
    import { CategoryType, CreateCategoryPayload, UpdateCategoryPayload } from '../types';
    // Import Ant Design Icons
    import { CloseOutlined, SaveOutlined } from '@ant-design/icons';

    interface Props {
        category: CategoryType | null;
        onClose: () => void;
        onSave: (data: CreateCategoryPayload | UpdateCategoryPayload) => void;
        errorMessage?: string | null;
        isSubmitting?: boolean; // Add loading state prop
    }

    const AddEditCategory: React.FC<Props> = ({ category, onClose, onSave, errorMessage, isSubmitting }) => {
        const [name, setName] = useState('');
        const isEditing = category !== null;

        useEffect(() => {
            if (isEditing && category) {
                setName(category.name);
            } else {
                setName('');
            }
        }, [category, isEditing]);

        const handleSubmit = (e: React.FormEvent) => { // Add form event handling
            e.preventDefault(); // Prevent default form submission if wrapped in form tag
            if (name.trim()) {
                onSave({ name: name.trim() });
            } else {
                // Optional: Show a client-side validation message if needed
                alert("Category name cannot be empty.");
            }
        };

        return (
            // Modal styling is fine, ensure consistency if desired
            <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 relative"> {/* Adjusted styling slightly */}
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 pb-2 border-b dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {isEditing ? 'Edit Category' : 'Add New Category'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Close"
                            disabled={isSubmitting} // Disable close while submitting
                        >
                            <CloseOutlined /> {/* Use Ant Design Icon */}
                        </button>
                    </div>

                    {/* Display Save Error */}
                    {errorMessage && (
                        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded text-sm mb-4" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {/* Form Content */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="categoryName"
                                type="text"
                                placeholder="e.g., Science Fiction"
                                className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${errorMessage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required // Add basic HTML validation
                                autoFocus
                                disabled={isSubmitting} // Disable input during submission
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button" // Explicitly type as button to prevent form submission
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit" // Submit button
                                disabled={!name.trim() || isSubmitting} // Disable if name is empty or submitting
                                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
                            >
                                <SaveOutlined /> {/* Use Ant Design Icon */}
                                {isSubmitting ? "Saving..." : (isEditing ? 'Save Changes' : 'Add Category')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default AddEditCategory;