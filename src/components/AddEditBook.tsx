    import React, { useState } from 'react';
    import { BookType } from '../pages/Book';

    interface Props {
    book: BookType;
    onClose: () => void;
    onSave: (book: BookType) => void;
    }

    const AddEditBook: React.FC<Props> = ({ book, onClose, onSave }) => {
    const [formBook, setFormBook] = useState<BookType>(book);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-600">
            ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">{book.id ? 'Edit Book' : 'Add Book'}</h2>

            <input
            type="text"
            placeholder="Title"
            className="w-full border rounded px-3 py-2 mb-2"
            value={formBook.title}
            onChange={(e) => setFormBook({ ...formBook, title: e.target.value })}
            />

            <input
            type="text"
            placeholder="Author"
            className="w-full border rounded px-3 py-2 mb-2"
            value={formBook.author}
            onChange={(e) => setFormBook({ ...formBook, author: e.target.value })}
            />

            <input
            type="text"
            placeholder="Image URL"
            className="w-full border rounded px-3 py-2 mb-2"
            value={formBook.image}
            onChange={(e) => setFormBook({ ...formBook, image: e.target.value })}
            />

            <select
            className="w-full border rounded px-3 py-2 mb-2 text-gray-700"
            value={formBook.category}
            onChange={(e) => setFormBook({ ...formBook, category: e.target.value })}
            >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Nonfiction">Nonfiction</option>
            <option value="Self-help">Self-help</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
            <option value="Technology">Technology</option>
            {/* kamu bisa tambah opsi lainnya di sini */}
            </select>

            <textarea
            placeholder="Description"
            className="w-full border rounded px-3 py-2 mb-4"
            value={formBook.description}
            onChange={(e) => setFormBook({ ...formBook, description: e.target.value })}
            />

            <button
            onClick={() => onSave(formBook)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
            >
            Save
            </button>
        </div>
        </div>
    );
    };

    export default AddEditBook;
