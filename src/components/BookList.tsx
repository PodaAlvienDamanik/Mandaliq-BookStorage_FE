    // src/components/BookList.tsx
    import BookCard from "./BookCard"; // Pastikan import path benar
    import { BookType } from "../types"; // Sesuaikan path
    import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import ikon pagination

    interface BookListProps {
    books: BookType[];
    onEdit: (book: BookType) => void;
    onDetail: (book: BookType) => void; // Sesuaikan nama prop
    // --- Props Pagination ---
    currentPage: number;
    onPageChange: (page: number) => void;
    hasMore?: boolean; // Optional: jika API memberitahu ada halaman selanjutnya
    // totalPages?: number; // Alternatif: jika API memberitahu total halaman
    }

    const BookList = ({
    books,  
    onEdit,
    onDetail,
    currentPage,
    onPageChange,
    hasMore,
    // totalPages
    }: BookListProps) => {

    const handlePrevPage = () => {
        if (currentPage > 1) {
        onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        // Cek disable berdasarkan hasMore atau totalPages
        // if (currentPage < totalPages) { ... }
        onPageChange(currentPage + 1);
    };

    // Tentukan apakah tombol next harus disable
    // Ganti logika ini jika menggunakan totalPages
    const isNextDisabled = hasMore !== undefined && !hasMore;
    const isPrevDisabled = currentPage <= 1;


    return (
        <div>
        {books.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No books found. Add a new book!</p>
            </div>
        ) : (
            // Ganti grid style sesuai BookCard-mu
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookCard
                key={book.id}
                book={book}
                onEdit={onEdit}
                onDetail={onDetail} // Pastikan prop ini ada di BookCard
                // onDelete mungkin tidak perlu di list jika ada di detail
                />
            ))}
            </div>
        )}

        {/* Pagination Controls */}
        {books.length > 0 && ( // Hanya tampilkan jika ada buku
            <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                    <button
                    onClick={handlePrevPage}
                    disabled={isPrevDisabled}
                    className={`p-2 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-label="Previous Page"
                    >
                    <LeftOutlined />
                    </button>
                    <span className="px-4 py-1.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    {currentPage}
                    </span>
                    <button
                    onClick={handleNextPage}
                    disabled={isNextDisabled} // Gunakan isNextDisabled
                    className={`p-2 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-label="Next Page"
                    >
                    <RightOutlined />
                    </button>
                </div>
            </div>
        )}
        </div>
    );
    };

    export default BookList;