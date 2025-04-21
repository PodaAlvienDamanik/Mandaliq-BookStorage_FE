    import React, { useState } from 'react';

    interface Props {
    initialValue: string | null;
    onClose: () => void;
    onSave: (value: string) => void;
    }

    const AddEditCategory: React.FC<Props> = ({ initialValue, onClose, onSave }) => {
    const [value, setValue] = useState(initialValue || '');

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
            <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-600">✕</button>
            <h2 className="text-xl font-semibold mb-4">{initialValue ? 'Edit Category' : 'Add Category'}</h2>
            <input
            type="text"
            placeholder="Category Name"
            className="w-full border rounded px-3 py-2 mb-4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
            <button
            onClick={() => {
                if (value.trim()) {
                onSave(value.trim());
                }
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
            >
            Save
            </button>
        </div>
        </div>
    );
    };

    export default AddEditCategory;
