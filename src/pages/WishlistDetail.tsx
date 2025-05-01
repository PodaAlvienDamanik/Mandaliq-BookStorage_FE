import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from '../utils/AxiosInstance';
import { BookType } from '../types';

interface WishlistItemType {
    id: number;
    book: Omit<BookType, 'category'>;
    created_at: string;
    updated_at: string;
}

const WishlistDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [wishlistItem, setWishlistItem] = useState<WishlistItemType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWishlistItem = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required.');
                setLoading(false);
                return;
            }

            try {
                const response = await AxiosInstance.get<WishlistItemType>(`/api/wishlist/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setWishlistItem(response.data);
            } catch (err) {
                console.error('Failed to fetch wishlist item:', err);
                setError('Failed to load wishlist item. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistItem();
    }, [id]);

    const handleRemove = async () => {
        const token = localStorage.getItem('token');
        if (!token || !wishlistItem) return;

        try {
            await AxiosInstance.delete(`/api/wishlist/${wishlistItem.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/wishlist');
        } catch (err) {
            console.error('Failed to remove wishlist item:', err);
            setError('Failed to remove item from wishlist. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-6 flex justify-center items-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        Back to Wishlist
                    </button>
                </div>
            </div>
        );
    }

    if (!wishlistItem) {
        return (
            <div className="min-h-screen p-6 flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Wishlist item not found</p>
                    <button
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        Back to Wishlist
                    </button>
                </div>
            </div>
        );
    }

    const { book } = wishlistItem;

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Back to Wishlist
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Book Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Author</p>
                                    <p className="text-lg">{book.author}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Description</p>
                                    <p className="text-lg whitespace-pre-line">{book.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Added to Wishlist</p>
                                    <p className="text-lg">
                                        {new Date(wishlistItem.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Actions</h2>
                                <button
                                    onClick={handleRemove}
                                    className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistDetail; 