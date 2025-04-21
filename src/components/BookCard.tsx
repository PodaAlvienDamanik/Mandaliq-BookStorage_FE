    import React from 'react';
    import { FaEdit, FaTrash } from 'react-icons/fa';
    import { BookType } from '../pages/Book';

    interface Props {
    book: BookType;
    onEdit: (book: BookType) => void;
    onDelete: (id: number) => void;
    onDetail: (book: BookType) => void;
    }

    const BookCard: React.FC<Props> = ({ book, onEdit, onDelete, onDetail }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <img
            src={book.image}
            alt={book.title}
            onClick={() => onDetail(book)}
            className="w-full h-60 object-cover cursor-pointer hover:opacity-90"
        />
        <div className="p-4">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <div className="flex justify-end mt-3 space-x-3">
            <button onClick={() => onEdit(book)} className="text-indigo-600 hover:text-indigo-800">
                <FaEdit />
            </button>
            <button onClick={() => onDelete(book.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default BookCard;
