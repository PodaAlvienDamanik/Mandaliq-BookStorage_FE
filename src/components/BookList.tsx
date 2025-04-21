    import React from 'react';
    import BookCard from './BookCard';
    import { BookType } from '../pages/Book';

    interface Props {
    books: BookType[];
    onEdit: (book: BookType) => void;
    onDelete: (id: number) => void;
    onDetail: (book: BookType) => void;
    }

    const BookList: React.FC<Props> = ({ books, onEdit, onDelete, onDetail }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
            <BookCard
            key={book.id}
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetail={onDetail}
            />
        ))}
        </div>
    );
    };

    export default BookList;
