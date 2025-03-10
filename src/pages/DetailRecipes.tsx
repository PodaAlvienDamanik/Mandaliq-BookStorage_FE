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


interface DeletedRecipe extends RecipeDetails {
isDeleted: Boolean;
deletedOn: string;
}

export const fetchRecipeDetail = async (id: string | undefined) => {
return await axios.get<RecipeDetails>(`/recipes/${id}`);
};

const deleteRecipe = async (id: string | undefined) => {
return await axios.delete<DeletedRecipe>(`recipes/${id}`);
};



const RecipeDetailSkeleton = () => {
return (
    <div className="flex flex-col gap-7 md:max-w-[900px] md:mx-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="rounded-2xl my-2 md:w-[48rem] w-[22rem] mx-auto xl:mx-0 animate-pulse h-[26rem] bg-gray-300"></div>
        <div className="flex flex-col gap-5 md:w-xl md:ml-5">
        <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
            <div className="w-[380px] rounded-2xl h-7 bg-gray-300 animate-pulse"></div>
            
            </div>
            <div className="flex justify-between text-gray-700">
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[150px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            
            </div>
        </div>
        <div className="flex justify-between text-gray-700 items-center">
            <div className="flex flex-col space-y-2">
            <div className="w-[150px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[150px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            </div>
            <div className="flex flex-col text-right space-y-1.5">
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
        <div className="flex justify-between text-gray-700">
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
        </div>
        <div className="w-[110px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
        </div>


    </div>

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">
        <div className="flex flex-col gap-2">
        <div className="w-[140px] rounded-2xl h-7 bg-gray-300 animate-pulse"></div>
        <div className="flex flex-col text-gray-700 gap-2.5">
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
        </div>
        </div>
        
        <div className="flex flex-col bg-gray-300 animate-pulse text-white px-4 py-7 rounded-2xl md:w-2xl md:order-first h-[20rem]">
        </div>
    </div>
    </div>
);
};


const RecipeContent: React.FC<RecipeDetails> = (recipe: RecipeDetails) => {
return (
    <div className="flex flex-col gap-7 md:max-w-[900px] md:mx-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <img className="rounded-2xl my-2 max-w-[26rem] mx-auto xl:mx-0" src={recipe.image} alt={recipe.name} />
        <div className="flex flex-col gap-5 md:w-xl md:ml-5">
        <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
            <p className="font-bold text-2xl">{recipe.name}</p>
            <div className="flex items-end gap-2">
                <p>{recipe.rating}</p>
                <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </div>
            </div>
            <div className="flex justify-between text-gray-700">
            <p>{recipe.cuisine}</p>
            <div className="flex">
                {
                recipe.mealType.map((type, index) => {
                    if (index == recipe.mealType.length - 1) {
                    return <p>{type}</p>
                    }
                    return <p>{type},</p>
                })
                }
            </div>
            </div>
        </div>
        <div className="flex justify-between text-gray-700 items-center">
            <div>
            <p>Difficulty : </p>
            <p>{recipe.difficulty}</p>
            </div>
            <div className="flex flex-col text-right">
            <p>Cook Time : {recipe.cookTimeMinutes} Mnts</p>
            <p>Preparation Time : {recipe.prepTimeMinutes} Mnts</p>
            </div>
        </div>
        <div className="flex justify-between text-gray-700">
            <p>Tags : </p>
            <div className="flex gap-0.5">
            {
                recipe.tags.map((tag, index) => {
                if (index == recipe.tags.length - 1) return <p>{tag}</p>
                return <p>{tag},</p>
                })
            }
            </div>
        </div>
        <p className="text-gray-700">Servings : {recipe.servings} ({recipe.caloriesPerServing * recipe.servings}.Cal)</p>
        </div>


    </div>

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">
        <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl">Ingredients</p>
        <div className="flex flex-col text-gray-700 gap-1">
            {
            recipe.ingredients.map((ingredient) => {
                return <p>- {ingredient}</p>
            })
            }
        </div>
        </div>
        <div className="flex flex-col bg-gray-700 text-white px-4 py-7 rounded-2xl md:w-2xl md:order-first">
        <p className="font-bold text-2xl mb-5">• Instructions</p>
        <div className="flex flex-col text-white gap-2">
            {
            recipe.instructions.map((step, index) => {
                return (
                <>
                    <p>{index + 1}) {step}</p>
                    <hr />
                </>
                )
            })
            }
        </div>
        </div>
    </div>
    </div>
);
}



const RecipesDetail = () => {
const { id } = useParams();

const getRecipeDetails = useQuery({
    queryKey: ["recipeDetail", id],
    queryFn: () => fetchRecipeDetail(id)
});

const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id)
});

const recipe: RecipeDetails | undefined = getRecipeDetails.data?.data;

const navigate = useNavigate();

useEffect(() => {
    if (deleteRecipeMutation.isSuccess) {
    navigate("/recipes", { replace: true });
    }
}, [deleteRecipeMutation.isSuccess]);

return (
    <div className="p-5">
    {getRecipeDetails.isFetching || recipe === undefined ? (
        <RecipeDetailSkeleton />
    ) : (
        <RecipeContent {...recipe} />
    )}
    <div className="fixed bottom-4 right-4 z-50">
        <div className="relative group">
        <button className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 z-10">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
            </svg>
        </button>
        <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-lg w-32 hidden group-focus-within:block">
            <button
            onClick={() => {
                navigate("edit");
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
            Edit
            </button>
            <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={() => {
                if (confirm("Are you sure want to delete this recipe ? ")) {
                deleteRecipeMutation.mutate();
                }
            }}
            >
            Delete
            </button>
        </div>
        </div>
    </div>
    </div>
);
};

export default RecipesDetail