    import React from 'react';
    import { BookType } from '../types'; // Using the same type as in WishlistPage

    interface Props {
    book: BookType;
    onDetail: () => void;
    onRemove: () => void;
    isRemoving?: boolean; // Optional prop for loading state
    }

    const WishlistItem: React.FC<Props> = ({ book, onDetail, onRemove, isRemoving = false }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-500">Category: {book.category?.name || 'Uncategorized'}</p>
        
        <div className="flex justify-between mt-auto pt-2">
            <button
            onClick={onDetail}
            className="text-blue-500 hover:underline text-sm"
            >
            View Details
            </button>
            <button
            onClick={onRemove}
            disabled={isRemoving}
            className="text-red-500 hover:underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Remove
            </button>
        </div>
        </div>
    );
    };

    export default WishlistItem;