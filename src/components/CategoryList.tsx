    "use client"

    import type React from "react"
    import { Edit, Trash2 } from "lucide-react"
    import type { CategoryType } from "../types" // Adjust path

    interface Props {
    categories: CategoryType[]
    onEdit: (category: CategoryType) => void
    onDelete: (id: number) => void
    isDeleting?: boolean // Optional: To disable buttons during a delete operation
    }

    const CategoryList: React.FC<Props> = ({ categories = [], onEdit, onDelete, isDeleting }) => {
    // Check if categories is undefined or empty
    const hasCategories = Array.isArray(categories) && categories.length > 0

    return (
        <div className="w-full">
        {!hasCategories ? (
            // Display a message when no categories exist
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
            </div>
        ) : (
            // Display the grid of categories
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
                <div
                key={category?.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-200 flex justify-between items-center group"
                >
                <span className="font-medium text-gray-800 dark:text-gray-200 truncate mr-3">
                    {category?.name || "Unnamed Category"}
                </span>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                    onClick={() => onEdit(category)}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                    title="Edit Category"
                    disabled={isDeleting} // Disable if any delete is in progress
                    >
                    <Edit className="h-4 w-4" />
                    </button>
                    <button
                    onClick={() => category?.id && onDelete(category.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                    title="Delete Category"
                    disabled={isDeleting || !category?.id} // Disable if any delete is in progress or if id is missing
                    >
                    <Trash2 className="h-4 w-4" />
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    )
    }

    export default CategoryList
