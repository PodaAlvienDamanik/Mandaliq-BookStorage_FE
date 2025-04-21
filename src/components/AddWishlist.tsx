    import React, { useState } from 'react';

    interface Book {
    id: number;
    title: string;
    category: string;
    }

    interface Props {
    books: Book[];
    onAdd: (book: Book) => void;
    }

    const AddWishlist: React.FC<Props> = ({ books, onAdd }) => {
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    const handleAdd = () => {
        const book = books.find(b => b.id === selectedBookId);
        if (book) {
        onAdd(book);
        setSelectedBookId(null);
        }
    };

    return (
        <div className="flex items-center gap-2">
        <select
            value={selectedBookId ?? ''}
            onChange={(e) => setSelectedBookId(Number(e.target.value))}
            className="p-2 border rounded"
        >
            <option value="">Select a book</option>
            {books.map(book => (
            <option key={book.id} value={book.id}>
                {book.title} - {book.category}
            </option>
            ))}
        </select>
        <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
            Add
        </button>
        </div>
    );
    };

    export default AddWishlist;
