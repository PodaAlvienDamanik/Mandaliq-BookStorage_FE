import { useEffect, useState } from 'react';
import AddWishlist from '../components/AddWishlist';
import WishlistItem from '../components/WishlistItem';
import AxiosInstance from '../utils/AxiosInstance';
import { BookType } from '../types';
import { useNavigate } from 'react-router-dom';

interface WishlistItemType {
    id: number;
    book: Omit<BookType, 'category'>;
    created_at: string;
    updated_at: string;
}

const Wishlist = () => {
    const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);
    const [books, setBooks] = useState<BookType[] | null>(null);
    const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
    const [loadingWishlist, setLoadingWishlist] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [removingItemId, setRemovingItemId] = useState<number | null>(null);
    const navigate = useNavigate();

    // --- Fetch all books (for adding to wishlist) ---
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication required.');
            setLoadingBooks(false);
            setLoadingWishlist(false);
            return;
        }

        const getBooks = async () => {
            setLoadingBooks(true);
            setError(null);
            try {
                const response = await AxiosInstance.get<BookType[]>('/api/books', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBooks(response.data);
            } catch (err) {
                console.error('Failed to fetch books:', err);
                setError('Failed to load available books. Please try again later.');
                setBooks([]);
            } finally {
                setLoadingBooks(false);
            }
        };

        getBooks();
    }, []);

    // --- Fetch wishlist from server ---
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const getWishlist = async () => {
            setLoadingWishlist(true);
            setError(null);
            try {
                const response = await AxiosInstance.get<WishlistItemType[]>('/api/wishlist', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWishlist(response.data);
            } catch (err) {
                console.error('Failed to fetch wishlist:', err);
                setError('Failed to load your wishlist. Please try again later.');
            } finally {
                setLoadingWishlist(false);
            }
        };

        getWishlist();
    }, []);

    // --- Add book to wishlist ---
    const handleAddWishlist = async (bookToAdd: BookType) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in again.');
            return;
        }

        // Check if the book is already in the wishlist
        if (wishlist.some((item) => item.book.id === bookToAdd.id)) {
            alert(`${bookToAdd.title} is already in your wishlist.`);
            return;
        }

        setError(null);
        try {
            const response = await AxiosInstance.post<WishlistItemType>(
                '/api/wishlist',
                { bookId: bookToAdd.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setWishlist((prevWishlist) => [...prevWishlist, response.data]);
        } catch (err) {
            console.error('Failed to add book to wishlist:', err);
            alert(`Failed to add ${bookToAdd.title} to wishlist. Please try again.`);
        }
    };

    // --- Remove book from wishlist ---
    const handleRemove = async (id: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in again.');
            return;
        }

        const wishlistItem = wishlist.find(item => item.id === id);
        if (!wishlistItem) return;

        setRemovingItemId(id);
        setError(null);
        try {
            await AxiosInstance.delete(`/api/wishlist/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
        } catch (err) {
            console.error('Failed to remove book from wishlist:', err);
            alert(`Failed to remove ${wishlistItem.book.title} from wishlist. Please try again.`);
        } finally {
            setRemovingItemId(null);
        }
    };

    if (loadingBooks || loadingWishlist) {
        return <div className="min-h-screen p-6 flex justify-center items-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen p-6 text-red-600 text-center">{error}</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
                {books && books.length > 0 ? (
                    <AddWishlist 
                        books={books} 
                        onAdd={handleAddWishlist} 
                        currentWishlistIds={wishlist.map(item => item.book.id)} 
                    />
                ) : (
                    !loadingBooks && <p className="text-gray-500">No books available to add.</p>
                )}
            </div>

            {wishlist.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                        <WishlistItem
                            key={item.id}
                            book={item.book}
                            onRemove={() => handleRemove(item.id)}
                            onDetail={() => navigate(`/wishlist/${item.id}`)}
                            isRemoving={removingItemId === item.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;