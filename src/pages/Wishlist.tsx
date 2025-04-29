    import { useState } from 'react';
    import AddWishlist from '../components/AddWishlist';
    import WishlistItem from '../components/WishlistItem';
import AxiosInstance from '../utils/AxiosInstance';

    interface Book {
    id: number;
    title: string;
    category: string;
    }

    const fetchWishlist = async (token : string) => {
        return AxiosInstance("/api/wishlist", {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    }

    const sampleBooks: Book[] = [
    { id: 1, title: 'Atomic Habits', category: 'Self Help' },
    { id: 2, title: 'The Hobbit', category: 'Fantasy' },
    ];

    const Wishlist = () => {
    const [wishlist, setWishlist] = useState<Book[]>([]);
    const [books] = useState<Book[]>(sampleBooks);

    const handleAddWishlist = (book: Book) => {
        setWishlist([...wishlist, book]);
    };

    const handleRemove = (id: number) => {
        setWishlist(wishlist.filter(book => book.id !== id));
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            <AddWishlist books={books} onAdd={handleAddWishlist} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map(book => (
            <WishlistItem key={book.id} book={book} onRemove={handleRemove} />
            ))}
        </div>
        </div>
    );
    };

    

    export default Wishlist;
