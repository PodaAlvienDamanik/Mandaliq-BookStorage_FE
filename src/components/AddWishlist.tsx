    import React, { useState } from 'react';
    import { BookType } from '../types'; // Use the shared Book type

    interface Props {
    books: BookType[]; // Available books to add
    onAdd: (book: BookType) => Promise<void>; // Function to call when adding
    currentWishlistIds: number[]; // Pass IDs of books already in wishlist
    }

    const AddWishlist: React.FC<Props> = ({ books, onAdd, currentWishlistIds }) => {
    const [selectedBookId, setSelectedBookId] = useState<string>(''); // Use string for select value
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const handleAdd = async () => {
        if (!selectedBookId) {
        alert('Please select a book to add.');
        return;
        }

        const bookIdNumber = Number(selectedBookId);
        const bookToAdd = books.find(b => b.id === bookIdNumber);

        if (!bookToAdd) {
        alert('Invalid book selected.'); // Should not happen if books list is correct
        return;
        }

        // Optional: Prevent adding if already in wishlist (can also be done in parent)
        if (currentWishlistIds.includes(bookIdNumber)) {
        alert(`${bookToAdd.title} is already in your wishlist.`);
        setSelectedBookId(''); // Reset selection
        return;
        }


        setIsAdding(true);
        try {
        await onAdd(bookToAdd);
        setSelectedBookId(''); // Reset dropdown after successful add
        } catch (error) {
        // Error handling is likely done in the parent's onAdd, but can add specific feedback here if needed
        console.error('Failed to add book via AddWishlist component:', error);
        // alert('Something went wrong adding the book.'); // Or rely on parent's alert
        } finally {
        setIsAdding(false);
        }
    };

    // Filter out books already in the wishlist from the dropdown options
    const availableBooks = books.filter(book => !currentWishlistIds.includes(book.id));

    return (
        <div className="flex items-center gap-2">
        <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isAdding || availableBooks.length === 0} // Disable if adding or no books left to add
        >
            <option value="">Select a book to add...</option>
            {availableBooks.map(book => (
            <option key={book.id} value={book.id}>
                {/* Ensure category exists and has a name */}
                {book.title} {book.category?.name ? `- ${book.category.name}` : ''}
            </option>
            ))}
            {availableBooks.length === 0 && books.length > 0 && (
                <option value="" disabled>All available books are in your wishlist</option>
            )}
        </select>
        <button
            onClick={handleAdd}
            disabled={isAdding || !selectedBookId} // Disable if adding or no book selected
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isAdding ? 'Adding...' : 'Add'}
        </button>
        </div>
    );
    };

    export default AddWishlist;