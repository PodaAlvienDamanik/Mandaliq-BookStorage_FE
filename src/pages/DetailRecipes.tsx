    import { useMutation, useQuery } from "@tanstack/react-query"; 
    import { useNavigate, useParams } from "react-router-dom"; 
    import { useEffect } from "react"; 
    import axios from "../utils/AxiosInstance";

    
    interface RecipeDetails {
    id: number; 
    name: string; 
    ingredients: string[]; 
    instructions: string[]; 
    prepTimeMinutes: number; 
    cookTimeMinutes: number;
    servings: number; 
    difficulty: string; 
    cuisine: string; 
    caloriesPerServing: number; 
    tags: string[]; 
    userId: number; 
    image: string; 
    rating: number; 
    mealType: string[]; 
    }

    // Interface untuk resep yang telah dihapus
    interface DeletedRecipe extends RecipeDetails {
    isDeleted: Boolean; // Status apakah resep sudah dihapus
    deletedOn: string; // Tanggal penghapusan
    }

    // Fungsi untuk mengambil detail resep berdasarkan ID
    export const fetchRecipeDetail = async (id: string | undefined) => {
    return await axios.get<RecipeDetails>(`/recipes/${id}`);
    };

    // Fungsi untuk menghapus resep berdasarkan ID
    const deleteRecipe = async (id: string | undefined) => {
    return await axios.delete<DeletedRecipe>(`recipes/${id}`);
    };

    // Komponen Placeholder untuk loading state detail resep
    const RecipeDetailMakan = () => {
    return (
        <div className="flex flex-col gap-7 md:max-w-[900px] md:mx-auto">
        <div className="rounded-2xl my-2 md:w-[48rem] w-[22rem] mx-auto xl:mx-0 animate-pulse h-[26rem] bg-gray-300"></div>
        <div className="flex flex-col gap-5 md:w-xl md:ml-5">
            <div className="flex items-end justify-between">
            <div className="w-[380px] rounded-2xl h-7 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
        </div>
    );
    };

    // Komponen untuk menampilkan detail resep
    const RecipeContent: React.FC<RecipeDetails> = (recipe: RecipeDetails) => {
    return (
        <div className="flex flex-col gap-7 md:max-w-[900px] md:mx-auto">
        <img className="rounded-2xl" src={recipe.image} alt={recipe.name} />
        <div className="flex flex-col">
            <p className="font-bold text-2xl">{recipe.name}</p>
            <p>Prep Time: {recipe.prepTimeMinutes} minutes</p>
            <p>Cook Time: {recipe.cookTimeMinutes} minutes</p>
        </div>
        <div className="flex">
            <p>Ingredients:</p>
            {recipe.ingredients.map((ingredient) => (
            <p>- {ingredient}</p>
            ))}
        </div>
        <div>
            <p>Instructions:</p>
            {recipe.instructions.map((step, index) => (
            <p>
                {index + 1}. {step}
            </p>
            ))}
        </div>
        </div>
    );
    };

    // Komponen utama untuk detail resep
    const RecipesDetail = () => {
    const { id } = useParams(); // Mendapatkan ID dari URL
    const navigate = useNavigate(); 

    // Query untuk mendapatkan data detail resep
    const getRecipeDetails = useQuery({
        queryKey: ["recipeDetail", id],
        queryFn: () => fetchRecipeDetail(id),
    });

    // Mutasi untuk menghapus resep
    const deleteRecipeMutation = useMutation({
        mutationFn: () => deleteRecipe(id),
    });

    // Efek untuk navigasi jika resep berhasil dihapus
    useEffect(() => {
        if (deleteRecipeMutation.isSuccess) {
        navigate("/recipes", { replace: true });
        }
    }, [deleteRecipeMutation.isSuccess]);

    const recipe: RecipeDetails | undefined = getRecipeDetails.data?.data;

    return (
        <div className="p-5">
        {/* Jika masih fetching data, tampilkan placeholder */}
        {getRecipeDetails.isFetching || recipe === undefined ? (
            <RecipeDetailMakan />
        ) : (
            <RecipeContent {...recipe} />
        )}
        
        {/* Tombol untuk Delete */}
        <div className="fixed bottom-4 right-4 z-50">
            <button
            onClick={() => {
                if (confirm("Are you sure want to delete this recipe?")) {
                deleteRecipeMutation.mutate();
                }
            }}
            >
            Delete
            </button>
        </div>
        </div>
    );
    };

    export default RecipesDetail;
