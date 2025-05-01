import React from 'react';
import { BookType } from '../types';

interface Props {
    book: Omit<BookType, 'category'>; // Remove category from book type
    onDetail: () => void;
    onRemove: (id: number) => void;
    isRemoving?: boolean;
}

const WishlistItem: React.FC<Props> = ({ book, onDetail, onRemove, isRemoving }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-gray-700 line-clamp-3">{book.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={onDetail}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onRemove(book.id)}
                        disabled={isRemoving}
                        className={`px-4 py-2 rounded ${
                            isRemoving
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700'
                        } text-white`}
                    >
                        {isRemoving ? 'Removing...' : 'Remove'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;