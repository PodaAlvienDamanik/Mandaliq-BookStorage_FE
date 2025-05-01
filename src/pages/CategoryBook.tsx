// src/pages/CategoryBook.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CategoryList from '../components/CategoryList'; // Adjust path if needed
import AddEditCategory from '../components/AddEditCategory'; // Adjust path if needed
import AxiosInstance from '../utils/AxiosInstance';
import { CategoryType, CreateCategoryPayload, UpdateCategoryPayload } from '../types'; // Adjust path
import { PlusOutlined } from '@ant-design/icons'; // Import icon
import { useAuth } from '../utils/AuthProvider';

// --- Fetcher / Mutation Functions (outside component) ---
const fetchCategories = async (token : string | null): Promise<CategoryType[]> => {
  const response = await AxiosInstance.get<CategoryType[]>('/api/categories', {
    headers : {
        Authorization : `Bearer ${token}`  
    }
  });
  // Add error handling or transformation if needed based on API response
  return response.data;
};

const addCategory = async (categoryData: CreateCategoryPayload, token: string | null): Promise<CategoryType> => {
  const response = await AxiosInstance.post<CategoryType>('/api/categories', categoryData,{
    headers:{
        Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const updateCategory = async (categoryData: UpdateCategoryPayload & { id: number }, token: string | null): Promise<CategoryType> => {
    if (!categoryData.id) throw new Error("Category ID is required for update.");
    const { id, ...payload } = categoryData; // Separate ID from payload
    const response = await AxiosInstance.put<CategoryType>(`/api/categories/${id}`, payload,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

const deleteCategory = async (id: number, token: string): Promise<void> => {
  await AxiosInstance.delete(`/api/categories/${id}`,{
    headers: { Authorization: `Bearer ${token}`}
  });
};

// --- Component ---
const CategoryBook = () => {

    const {getToken} = useAuth();
    const queryClient = useQueryClient();
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // --- React Query Hooks ---
    const { data: categoriesData, isLoading, error: fetchError } = useQuery({
        queryKey: ['categories'], // Query key for categories
        queryFn: () => fetchCategories(getToken()),
    });

    const mutationOptions = {
        onSuccess: () => {
            // Refetch categories after any successful mutation
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            // Optionally, if books depend on category names, invalidate book queries too
            // queryClient.invalidateQueries({ queryKey: ['books'] });
            setIsFormOpen(false); // Close form
            setSelectedCategory(null); // Reset selection
        },
        onError: (error: any) => {
            // Basic error logging, specific errors handled via mutation state
            console.error("Mutation failed:", error);
        }
    };

    const addMutation = useMutation({
        mutationFn: (data: CreateCategoryPayload) => addCategory(data, getToken()),
        ...mutationOptions,
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateCategoryPayload & {id : number}) => updateCategory(data, getToken() ?? ""),
        ...mutationOptions,
    });

    const deleteMutation = useMutation({
        mutationFn:(id:number) => deleteCategory(id, getToken() ?? " "),
        ...mutationOptions,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['categories']});
            setSelectedCategory(null);
        },
    });

    // --- Handlers ---
    const handleAddClick = () => {
        setSelectedCategory(null);
        setIsEditMode(false);
        setIsFormOpen(true);
        // Reset mutation errors if the modal is reused
        addMutation.reset();
        updateMutation.reset();
    };

    const handleEditClick = (category: CategoryType) => {
        setSelectedCategory(category);
        setIsEditMode(true);
        setIsFormOpen(true);
         // Reset mutation errors if the modal is reused
        addMutation.reset();
        updateMutation.reset();
    };

    const handleCloseModal = () => {
        setIsFormOpen(false);
        setSelectedCategory(null);
        // Reset mutation errors when modal is explicitly closed
        addMutation.reset();
        updateMutation.reset();
    };

    const handleSave = (formData: CreateCategoryPayload | UpdateCategoryPayload) => {
        if (isEditMode && selectedCategory) {
            updateMutation.mutate({ ...formData, id: selectedCategory.id } as UpdateCategoryPayload & { id: number });
        } else {
            addMutation.mutate(formData as CreateCategoryPayload);
        }
    };

    const handleDeleteConfirm = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category? This might affect associated books.')) {
            deleteMutation.mutate(id);
        }
    };

    // --- Render Logic ---
    const categories = categoriesData ?? [];

    // Consolidate error message logic
    const getErrorMessage = () => {
        if (fetchError) return `Failed to load categories: ${(fetchError as Error).message}`;
        // Return specific mutation errors if they exist
        if (addMutation.error) return `Failed to add category: ${(addMutation.error as Error).message}`;
        if (updateMutation.error) return `Failed to update category: ${(updateMutation.error as Error).message}`;
        if (deleteMutation.error) return `Failed to delete category: ${(deleteMutation.error as Error).message}`;
        return null;
    }
    const currentError = getErrorMessage(); // Get the current error message

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Category Book</h1>
                <button
                    onClick={handleAddClick}
                    // Using consistent button style with BookPage
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm transition-colors duration-200"
                >
                    <PlusOutlined /> Add Category
                </button>
            </div>

            {/* Display Loading or Error for the list */}
            {isLoading && <p className="text-center text-gray-600 py-4">Loading categories...</p>}

            {/* Display fetch error ONLY if not loading and modal isn't open (modal shows its own errors) */}
            {fetchError && !isLoading && !isFormOpen && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {currentError}
                </div>
            )}


            {/* Display List or No Data Message */}
            {!isLoading && !fetchError && (
                categories.length === 0 ? (
                    <p className="text-center text-gray-600 py-4">No categories found. Add your first one!</p>
                ) : (
                    <CategoryList
                        categories={categories}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteConfirm} // Use the confirm handler
                        // Pass disable state if needed (e.g., disable actions during another delete)
                        isDeleting={deleteMutation.isPending}
                    />
                )
            )}

            {/* Modal for Add/Edit */}
            {isFormOpen && (
                <AddEditCategory
                    category={selectedCategory} // Pass null for add mode
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    // Pass mutation-specific error message and loading state
                    errorMessage={addMutation.error ? (addMutation.error as Error).message : updateMutation.error ? (updateMutation.error as Error).message : null}
                    isSubmitting={addMutation.isPending || updateMutation.isPending}
                />
            )}
        </div>
    );
};

export default CategoryBook;