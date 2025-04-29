    // src/components/BookDetail.tsx (No Image)
    import React, { useState } from 'react';
    import { BookType } from '../types'; // Adjust path
    import { CloseOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

    interface BookDetailProps {
    book: BookType;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
    }

    const BookDetail: React.FC<BookDetailProps> = ({ book, onClose, onEdit, onDelete, isDeleting }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const formatDate = (dateString: string | undefined | Date) => { // Accept Date object too
        if (!dateString) return 'N/A';
        try {
            // Handle if it's already a Date object or needs parsing
            const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
            if (isNaN(date.getTime())) return 'Invalid Date'; // Check if parsing failed

            return date.toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
            });
        } catch (e) {
            console.error("Error formatting date:", e);
            return 'Invalid Date';
        }
    };


    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-xl max-h-[90vh] flex flex-col"> {/* Adjusted max-width */}
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Book Details
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Close" disabled={isDeleting}>
                <CloseOutlined />
            </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-5 overflow-y-auto flex-grow">
            {/* REMOVED Image Section div */}
            {/* Details Section - Takes full width now */}
            <div className="w-full">
                {book.category?.name && (
                <span className="inline-block bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
                    {book.category.name}
                </span>
                )}
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {book.title}
                </h1>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
                by {book.author}
                </p>

                {/* Description - Kept */}
                {book.description && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description:</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {book.description}
                    </p>
                </div>
                )}

                {/* Meta Info (Dates) - Kept */}
                <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-5">
                {/* Use created_at or other relevant fields */}
                {book.created_at && (
                    <div className="flex">
                        <span className="w-24 font-medium">Added on:</span>
                        <span>{formatDate(book.created_at)}</span>
                    </div>
                )}
                {/* Add updated_at if available and different */}
                {/* {book.updated_at && formatDate(book.updated_at) !== formatDate(book.created_at) && (
                    <div className="flex">
                        <span className="w-24 font-medium">Last Updated:</span>
                        <span>{formatDate(book.updated_at)}</span>
                    </div>
                )} */}
                </div>

                {/* Action Buttons - Kept */}
                <div className="flex flex-wrap gap-3">
                <button onClick={onEdit} disabled={isDeleting} className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 hover:bg-blue-600 text-sm disabled:opacity-50">
                    <EditOutlined /> Edit
                </button>
                <button onClick={() => setShowDeleteConfirm(true)} disabled={isDeleting || showDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2 hover:bg-red-600 text-sm disabled:opacity-50">
                    <DeleteOutlined /> Delete
                </button>
                </div>

                {/* Delete Confirmation Dialog - Kept */}
                {showDeleteConfirm && (
                <div className="mt-4 p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 rounded-md">
                    <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                    Confirm Deletion
                    </h3>
                    <p className="text-red-600 dark:text-red-400 text-sm mb-3">
                    Are you sure you want to permanently delete "{book.title}"? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3">
                    <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-600" disabled={isDeleting}>
                        Cancel
                    </button>
                    <button onClick={() => { onDelete(); }} className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 flex items-center justify-center min-w-[80px]" disabled={isDeleting}>
                        {isDeleting ? ( <svg /* spinner */> </svg> ) : "Delete"}
                    </button>
                    </div>
                </div>
                )}
            </div> {/* End Details Section */}
            </div> {/* End Content */}
        </div> {/* End Modal Container */}
        </div>
    );
    };

    export default BookDetail;