    import React from 'react';
    import { BookType } from '../types';

    interface Props {
    book: BookType;
    onClose: () => void;
    }

    const BookDetail: React.FC<Props> = ({ book, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-600">
            ✕
            </button>
            <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
            <p className="text-gray-700">{book.description}</p>
        </div>
        </div>
    );
    };

    export default BookDetail;
