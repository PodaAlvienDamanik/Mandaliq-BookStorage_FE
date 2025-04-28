// src/pages/BookPage.tsx (or your file name)
import { useState, useEffect, useCallback } from 'react';
import BookList from '../components/BookList';
import BookDetail from '../components/BookDetail';
import AddEditBook from '../components/AddEditBook';
// Make sure this path is correct for your project structure
import AxiosInstance from '../utils/AxiosInstance'; // Or ../api/AxiosInstance
import { BookType, CategoryType, CreateBookPayload, UpdateBookPayload } from '../types'; // Adjust path

const BookPage = () => {
    const [books, setBooks] = useState<BookType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'detail' | 'edit' | 'add'>('list');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        // ... (fetchData implementation is correct)
        setIsLoading(true);
        setError(null);
        try {
            const [booksResponse, categoriesResponse] = await Promise.all([
                AxiosInstance.get<BookType[]>('/books'),
                AxiosInstance.get<CategoryType[]>('/categories')
            ]);
            setBooks(booksResponse.data);
            setCategories(categoriesResponse.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError('Failed to load books or categories. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddClick = () => {
        setSelectedBook(null);
        setViewMode('add');
    };

    const handleEditClick = (book: BookType) => {
        setSelectedBook(book);
        setViewMode('edit');
    };

    const handleDetailClick = (book: BookType) => {
        setSelectedBook(book);
        setViewMode('detail');
    };

     const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this book?')) {
            return;
        }
        setError(null);
        try {
            // FIX: Use backticks for template literal
            await AxiosInstance.delete(`/books/${id}`);
            await fetchData(); // Refetch for consistency
        } catch (err: any) {
            console.error("Failed to delete book:", err);
            setError(err.response?.data?.message || 'Failed to delete book.');
        }
    };

    const handleSave = async (formData: CreateBookPayload | UpdateBookPayload) => {
        setError(null);
        const isUpdating = viewMode === 'edit' && selectedBook !== null;

        try {
            if (isUpdating) {
                 // FIX: Use backticks for template literal
                await AxiosInstance.put(`/books/${selectedBook.id}`, formData as UpdateBookPayload);
            } else {
                await AxiosInstance.post('/books', formData as CreateBookPayload);
            }
            setViewMode('list');
            setSelectedBook(null);
            await fetchData();
        } catch (err: any) {
            console.error("Failed to save book:", err);
             const backendMessage = err.response?.data?.message;
             // FIX: Correct template literal for error message
             let displayError = `Failed to ${isUpdating ? 'update' : 'add'} book.`;
             if (backendMessage) {
                 displayError = Array.isArray(backendMessage) ? backendMessage.join(', ') : backendMessage;
             }
            setError(displayError);
        }
    };

    const handleCloseModal = () => {
        setViewMode('list');
        setSelectedBook(null);
        setError(null);
    }

    const renderContent = () => {
        // ... (renderContent implementation is correct)
        if (isLoading) {
            return <p className="text-center text-gray-600">Loading books...</p>;
        }
        if (error && viewMode === 'list') {
             return (
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                 </div>
             );
        }
        if (!isLoading && !error && books.length === 0 && viewMode === 'list') {
             return <p className="text-center text-gray-600">No books found. Add your first book!</p>;
        }
        return (
            <BookList
                books={books}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onDetail={handleDetailClick}
            />
        );
    }

    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Bookshelf</h1>
                <button
                    onClick={handleAddClick}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add Book
                </button>
            </div>

            {renderContent()}

            {/* Modals */}
            {(viewMode === 'add' || viewMode === 'edit') && (
                <AddEditBook
                    book={selectedBook}
                    categories={categories} // Pass categories here
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    errorMessage={error}
                />
            )}

            {viewMode === 'detail' && selectedBook && (
                <BookDetail book={selectedBook} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default BookPage;