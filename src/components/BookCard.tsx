    "use client"

    import type React from "react"
    import { Eye, Edit } from "lucide-react"
    import type { BookType } from "../types" // Adjust path

    interface Props {
    book: BookType
    onEdit: (book: BookType) => void
    onDetail: (book: BookType) => void
    canEdit?: boolean // <<< ADDED: Receive edit capability flag
    }

    const BookCard: React.FC<Props> = ({ book, onEdit, onDetail, canEdit = true }) => {
    // <<< Default to true
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[180px] overflow-hidden">
        <div className="p-5 flex-grow">{/* ... Category Badge, Title, Author ... */}</div>

        {/* Action Buttons - Footer */}
        <div className="flex justify-end items-center gap-4 p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
            onClick={() => onDetail(book)}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 rounded px-2 py-1"
            title="View Details"
            >
            <Eye className="h-4 w-4" /> View
            </button>
            <button
            onClick={() => onEdit(book)}
            // Disable based on the prop passed down
            disabled={!canEdit} // <<< APPLY DISABLED STATE
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-40 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600 dark:disabled:hover:text-gray-400"
            title={canEdit ? "Edit Book" : "Loading categories..."} // <<< Adjust tooltip
            >
            <Edit className="h-4 w-4" /> Edit
            </button>
        </div>
        </div>
    )
    }

    export default BookCard
