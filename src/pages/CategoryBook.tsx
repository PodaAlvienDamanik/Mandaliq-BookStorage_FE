    // src/pages/CategoryBook.tsx (or your file name)
    import { useState, useEffect, useCallback } from 'react';
    import CategoryList from '../components/CategoryList';
    import AddEditCategory from '../components/AddEditCategory';
    // Make sure this path is correct
    import AxiosInstance from '../utils/AxiosInstance'; // Or ../api/AxiosInstance
    import { CategoryType, CreateCategoryPayload, UpdateCategoryPayload } from '../types'; // Adjust path

    const CategoryBook = () => {
        const [categories, setCategories] = useState<CategoryType[]>([]);
        const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
        const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const fetchCategories = useCallback(async () => {
            // ... (fetchCategories implementation is correct)
            setIsLoading(true);
            setError(null);
            try {
                const response = await AxiosInstance.get<CategoryType[]>('/categories');
                setCategories(response.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError('Failed to load categories. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }, []);

        useEffect(() => {
            fetchCategories();
        }, [fetchCategories]);

        const handleAdd = () => {
            setSelectedCategory(null);
            setIsEditingModalOpen(true);
        };

        const handleEdit = (category: CategoryType) => {
            setSelectedCategory(category);
            setIsEditingModalOpen(true);
        };

        const handleDelete = async (id: number) => {
            if (!window.confirm('Are you sure you want to delete this category? Associated books might be affected.')) {
                return;
            }
            setError(null); // Clear error before delete attempt
            try {
                // FIX: Use backticks for template literal
                await AxiosInstance.delete(`/categories/${id}`);
                await fetchCategories(); // Refetch for consistency
            } catch (err: any) {
                console.error("Failed to delete category:", err);
                setError(err.response?.data?.message || 'Failed to delete category.');
            }
        };

        const handleSave = async (formData: CreateCategoryPayload | UpdateCategoryPayload) => {
            setError(null);
            // Ensure selectedCategory is not null AND has a valid id before declaring update
            const isUpdating = selectedCategory !== null && typeof selectedCategory.id === 'number' && selectedCategory.id > 0;


            try {
                if (isUpdating) {
                    // FIX: Use backticks for template literal and ensure selectedCategory is not null
                    await AxiosInstance.put(`/categories/${selectedCategory!.id}`, formData as UpdateCategoryPayload);
                } else {
                    await AxiosInstance.post('/categories', formData as CreateCategoryPayload);
                }
                setIsEditingModalOpen(false);
                setSelectedCategory(null);
                await fetchCategories();
            } catch (err: any) {
                console.error("Failed to save category:", err);
                // FIX: Correct template literal for error message
                setError(err.response?.data?.message || `Failed to ${isUpdating ? 'update' : 'add'} category.`);
            }
        };

        const handleCloseModal = () => {
            setIsEditingModalOpen(false);
            setSelectedCategory(null);
            setError(null);
        }

        // --- Render ---
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Book Categories</h1>
                    <button
                        onClick={handleAdd}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Add Category
                    </button>
                </div>

                {/* ... (rest of the rendering logic is correct) */}
                {isLoading && <p className="text-center text-gray-600">Loading categories...</p>}
                {!isLoading && error && !isEditingModalOpen && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                {!isLoading && !error && categories.length === 0 && (
                    <p className="text-center text-gray-600">No categories found. Add one!</p>
                )}
                {!isLoading && categories.length > 0 && (
                    <CategoryList
                        categories={categories}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                {isEditingModalOpen && (
                    <AddEditCategory
                        category={selectedCategory}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                        errorMessage={error}
                    />
                )}
            </div>
        );
    };
    export default CategoryBook;