    import { useState } from 'react';
    import BookList from '../components/BookList';
    import BookDetail from '../components/BookDetail';
    import AddEditBook from '../components/AddEditBook';

    export type BookType = {
    id: number;
    title: string;
    author: string;
    image: string;
    description: string;
    category: string;
    };

    const Book = () => {
    const [books, setBooks] = useState<BookType[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleAdd = () => {
        setSelectedBook({ id: Date.now(), title: '', author: '', image: '', description: '' , category: ''});
        setIsEditing(true);
    };

    const handleEdit = (book: BookType) => {
        setSelectedBook(book);
        setIsEditing(true);
    };

    const handleDetail = (book: BookType) => {
        setSelectedBook(book);
        setIsEditing(false);
    };

    const handleDelete = (id: number) => {
        setBooks(books.filter((b) => b.id !== id));
    };

    const handleSave = (book: BookType) => {
        const exists = books.some((b) => b.id === book.id);
        if (exists) {
        setBooks(books.map((b) => (b.id === book.id ? book : b)));
        } else {
        setBooks([...books, book]);
        }
        setSelectedBook(null);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Books</h1>
            <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
            Add Book
            </button>
        </div>

        <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleDetail} />

        {selectedBook && isEditing && (
            <AddEditBook
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onSave={handleSave}
            />
        )}

        {selectedBook && !isEditing && (
            <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
        </div>
    );
    };

    export default Book;
