    import React from 'react';
    import { FaEdit, FaTrash } from 'react-icons/fa';
    import { BookType } from '../types'; // Adjust path

    interface Props {
        book: BookType;
        onEdit: (book: BookType) => void;
        onDelete: (id: number) => void; // Expecting ID
        onDetail: (book: BookType) => void;
    }

    // Placeholder image URL
    const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x400.png?text=No+Image';

    const BookCard: React.FC<Props> = ({ book, onEdit, onDelete, onDetail }) => {
        const imageUrl = book.image || PLACEHOLDER_IMAGE;

        return (
            <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col"> {/* Flex column */}
                <img
                    src={imageUrl}
                    alt={book.title}
                    onClick={() => onDetail(book)} // Click image for detail
                    className="w-full h-60 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)} // Handle broken image links
                />
                <div className="p-4 flex flex-col flex-grow"> {/* Flex grow for content */}
                    <h2
                    className="text-lg font-semibold hover:text-indigo-600 cursor-pointer truncate" // Truncate long titles
                    onClick={() => onDetail(book)} // Click title for detail
                    title={book.title} // Show full title on hover
                    >
                        {book.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    {/* Display category if available */}
                    {book.category && (
                        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block self-start mb-3">
                            {book.category.name}
                        </p>
                    )}
                    {/* Spacer to push buttons down */}
                    <div className="flex-grow"></div>
                    <div className="flex justify-end mt-auto space-x-3"> {/* mt-auto pushes buttons to bottom */}
                        <button onClick={() => onEdit(book)} className="text-indigo-600 hover:text-indigo-800" title="Edit">
                            <FaEdit />
                        </button>
                        <button onClick={() => onDelete(book.id)} className="text-red-500 hover:text-red-700" title="Delete">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    export default BookCard;