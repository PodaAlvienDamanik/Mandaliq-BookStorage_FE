    import { useQuery } from "@tanstack/react-query";
    import axios from '../utils/AxiosInstance';
    import { useNavigate } from "react-router-dom";

    interface Recipe {
        id: number;
        name: string;
        difficulty: string;
        image: string;
        rating: number;
    }

    interface RecipesList {
        recipes: Recipe[];
    }

    {/*Component RecipeCard menerima data berupa objek Recipe dan menampilkan card informasi resep*/}
    const RecipeCard: React.FC<Recipe> = (recipe: Recipe) => {
        return (
            <div className="group overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                <img
                    alt={recipe.name}
                    src={recipe.image}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                        {recipe.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1">
                        <p className="text-sm text-gray-600">{recipe.rating}</p>
                        <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-700">{recipe.difficulty}</p>
                </div>
            </div>
        );
    };

    const fetchRecipesList = async () => {
        return await axios.get<RecipesList>("/recipes");
    };

    const RecipesMakan = () => {
        return (
            <div className="group overflow-hidden rounded-lg bg-gray-200 animate-pulse">
                <div className="aspect-square w-full bg-gray-300"></div>

                <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="mt-2 h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="mt-2 h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
        );
    };

    const Recipes = () => {
        const getRecipesList = useQuery({ queryKey: ["recipeList"], queryFn: fetchRecipesList });
        
        const navigate = useNavigate();

        return (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen py-10">
                <button
                    className="fixed bottom-4 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full p-4 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-10"
                    onClick={() => navigate("./add")}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        ></path>
                    </svg>
                </button>

                {/*ini untuk menampilkan recipe nya r for crud */}
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">List of Recipes</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {getRecipesList.isFetching
                            ? Array.from({ length: 8 }).map((_, index) => <RecipesMakan key={index} />)
                            : getRecipesList.data?.data.recipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                                >
                                    <RecipeCard {...recipe} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    };

    export default Recipes;
