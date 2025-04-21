    import React from 'react';

    interface Book {
    id: number;
    title: string;
    category: string;
    }

    interface Props {
    book: Book;
    onRemove: (id: number) => void;
    }

    const WishlistItem: React.FC<Props> = ({ book, onRemove }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-500">Category: {book.category}</p>
        <button
            onClick={() => onRemove(book.id)}
            className="self-start text-red-500 hover:underline"
        >
            Remove
        </button>
        </div>
    );
    };

    export default WishlistItem;
