import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormRecipes, { Recipe } from "../components/FormRecipes";

const addRecipe = async (data: Recipe) => {
    return await axios.post("/recipes/add", data);
};

const AddRecipes = () => {
    const { mutate, isSuccess, isPending } = useMutation({
        mutationFn: addRecipe,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/recipes", { replace: true });
        }
    }, [isSuccess, navigate]);

    return (
        <div className="relative bg-gray-50 min-h-screen py-10">
            {/*ini untuk menampilkan loading state */}
            {isPending && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10 flex items-center justify-center">
                    <div className="flex items-center bg-white px-6 py-4 rounded-lg shadow-lg">
                        <span className="text-xl font-semibold mr-4 text-gray-800">Adding...</span>
                        <svg
                            className="animate-spin h-6 w-6 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                </div>
            )}

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Recipe</h2>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <FormRecipes isEdit={false} mutateFn={mutate} />
            </div>
        </div>
    );
};

export default AddRecipes;
