import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CategoryType } from '../types'; // Adjust path

interface Props {
    categories: CategoryType[];
    onEdit: (category: CategoryType) => void;
    onDelete: (id: number) => void; // Pass ID for deletion
}

const CategoryList: React.FC<Props> = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Added lg breakpoint */}
            {categories.map((category) => (
                <div
                    key={category.id} // Use ID as key
                    className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                    <span className="font-medium text-gray-700 truncate mr-2">{category.name}</span>
                    <div className="flex gap-3 flex-shrink-0"> {/* Prevent buttons wrapping */}
                        <button onClick={() => onEdit(category)} className="text-indigo-600 hover:text-indigo-800" title="Edit">
                            <FaEdit />
                        </button>
                        <button onClick={() => onDelete(category.id)} className="text-red-500 hover:text-red-700" title="Delete">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;