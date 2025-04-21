    import React from 'react';
    import { FaEdit, FaTrash } from 'react-icons/fa';

    interface Props {
    categories: string[];
    onEdit: (category: string) => void;
    onDelete: (category: string) => void;
    }

    const CategoryList: React.FC<Props> = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
            <div
            key={category}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
            <span className="font-medium text-gray-700">{category}</span>
            <div className="flex gap-3">
                <button onClick={() => onEdit(category)} className="text-indigo-600 hover:text-indigo-800">
                <FaEdit />
                </button>
                <button onClick={() => onDelete(category)} className="text-red-500 hover:text-red-700">
                <FaTrash />
                </button>
            </div>
            </div>
        ))}
        </div>
    );
    };

    export default CategoryList;
