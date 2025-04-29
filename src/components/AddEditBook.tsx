

    import type React from "react"
    import { useState, useEffect } from "react"
    import type { BookType, CategoryType, CreateBookPayload, UpdateBookPayload } from "../types"
    import { X, Save } from "lucide-react"

    interface Props {
    book: BookType | null
    categories: CategoryType[]
    onClose: () => void
    onSave: (data: CreateBookPayload | UpdateBookPayload) => void
    errorMessage?: string | null
    isSubmitting?: boolean
    }

    // Define the state type WITHOUT image
    type AddEditFormData = Omit<Partial<CreateBookPayload & { id?: number }>, "image">

    const AddEditBook: React.FC<Props> = ({ book, categories, onClose, onSave, errorMessage, isSubmitting }) => {
    // State for form data, without image field
    const [formData, setFormData] = useState<AddEditFormData>({
        id: undefined,
        title: "",
        author: "",
        description: "", // Keep description
        categoryId: undefined,
    })

    // Add null check and optional chaining for book?.id
    const isEditing = book !== null && book?.id !== undefined && book?.id > 0

    useEffect(() => {
        if (isEditing && book) {
        setFormData({
            id: book?.id,
            title: book?.title || "",
            author: book?.author || "",
            description: book?.description || "", // Populate description
            categoryId: book?.category?.id,
        })
        } else {
        // Reset form for adding, without image
        setFormData({
            id: undefined,
            title: "",
            author: "",
            description: "",
            categoryId: undefined,
        })
        }
    }, [book, isEditing])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const newValue = name === "categoryId" ? (value ? Number.parseInt(value, 10) : undefined) : value
        setFormData((prev) => ({ ...prev, [name]: newValue }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.author || !formData.categoryId) {
        alert("Please fill in Title, Author, and select a Category.")
        return
        }

        // Prepare payload WITHOUT image
        const payload: CreateBookPayload | UpdateBookPayload = {
        title: formData.title,
        author: formData.author,
        description: formData.description || "", // Keep description
        // No image field here
        categoryId: Number(formData.categoryId),
        }

        onSave(payload)
    }

    // --- Render ---
    return (
        <div className="fixed inset-0 bg-slate-900/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700 transform transition-all duration-200 scale-100">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {isEditing ? "Edit Book" : "Add New Book"}
            </h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Close"
                disabled={isSubmitting}
            >
                <X className="h-5 w-5" />
            </button>
            </div>

            {/* Body Modal (Scrollable) */}
            <form id="addEditForm" onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
            {errorMessage && (
                <div
                className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm mb-5 shadow-sm"
                role="alert"
                >
                {errorMessage}
                </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
                <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors shadow-sm"
                />
                </div>

                <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Author <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors shadow-sm"
                />
                </div>

                <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId ?? ""}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors shadow-sm appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em_1em]"
                    style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
                    }}
                >
                    <option value="" disabled>
                    Select a Category
                    </option>
                    {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                        <option key={cat?.id} value={cat?.id}>
                        {cat?.name}
                        </option>
                    ))
                    ) : (
                    <option value="" disabled>
                        No categories available
                    </option>
                    )}
                </select>
                </div>

                <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors shadow-sm resize-y"
                />
                </div>
            </div>
            </form>

            {/* Footer Modal */}
            <div className="flex justify-end gap-3 p-5 border-t dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 z-10">
            <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
                Cancel
            </button>
            <button
                type="submit"
                form="addEditForm"
                disabled={isSubmitting}
                className="px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-2"
            >
                <Save className="h-4 w-4" /> {isSubmitting ? "Saving..." : isEditing ? "Update" : "Save Book"}
            </button>
            </div>
        </div>
        </div>
    )
    }

    export default AddEditBook
