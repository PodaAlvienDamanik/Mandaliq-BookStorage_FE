import axios from '../utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTodo from '../components/FormTodo';

interface Todo {
    todo: string;
    completed: boolean;
    userId: number;
}

const TodoAdd = async (data: Todo) => {
    return await axios.post("/todo/add", data);
};

const AddTodo = () => {
    const { mutate, isSuccess, isPending } = useMutation({
        mutationFn: TodoAdd,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/todo", { replace: true });
        }
    }, [isSuccess, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            {isPending && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center bg-white px-6 py-4 rounded-lg shadow-lg space-y-3">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-600"
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
                        <span className="text-lg font-semibold text-gray-700">
                            Adding your task...
                        </span>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                    Add New Todo
                </h2>
                <p className="text-gray-500 text-center mb-4">
                    Fill in the details below to add a new task to your list.
                </p>

                <FormTodo isEdit={false} mutateFn={mutate} />

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/todo")}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Back to Todo List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
