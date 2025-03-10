    import { UseMutateFunction } from "@tanstack/react-query";
    import { useEffect } from "react";
    import { useForm } from "react-hook-form";

    interface Todo {
    todo: string;
    completed: boolean;
    userId: number;
    }

    {/*untuk mendefinisikan struktur data yang akan dibuat atau diedit. */}
    interface FormTodoFields {
    todo: string;
    userId: number;
    }

     {/*mendefinisikan properti yang dibutuhkan oleh komponen formulir todo */}
    interface FormTodoElementProps {
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, Todo, unknown>;
    defaultInputData?: Todo;
    }

    {/*menerima properti sesuai dengan antarmuka FormTodoElementProps*/}
    const TodoForm: React.FC<FormTodoElementProps> = (props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormTodoFields>();

    {/*Mengatur nilai default untuk mode edit */}
    useEffect(() => {
        if (props.defaultInputData) {
        setValue("todo", props.defaultInputData.todo);
        setValue("userId", props.defaultInputData.userId);
        }
    }, [props.defaultInputData]);

    {/*Fungsi pengiriman formulir */}
    const submitHandler = (data: FormTodoFields) => {
        if (props.isEdit) {
        if (!confirm("Are you sure you want to update the post data?")) return;
        }

        const newTodoData: Todo = {
        todo: data.todo,
        userId: data.userId,
        completed: false,
        };

        props.mutateFn(newTodoData);
    };

    return (
        <form
        className="flex flex-col space-y-6 mb-12 mt-8 p-5 max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200"
        onSubmit={handleSubmit(submitHandler)}
        >
        <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-800 mb-2" htmlFor="todo">
            Isi Todo
            </label>
            <textarea
            id="todo"
            {...register("todo", { required: "Todo body is required." })}
            className="resize-none border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your todo here..."
            />
            {errors.todo && (
            <p className="text-red-500 text-sm mt-1">{errors.todo.message}</p>
            )}
        </div>
        <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-800 mb-2" htmlFor="userId">
            User ID
            </label>
            <input
            type="number"
            id="userId"
            {...register("userId", { required: "User ID is required." })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your user ID..."
            />
            {errors.userId && (
            <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
            )}
        </div>
        <div className="flex items-center justify-center">
            {props.isEdit ? (
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300"
            >
                Save Todo
            </button>
            ) : (
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300"
            >
                Add Todo
            </button>
            )}
        </div>
        </form>
    );
    };

    export default TodoForm;
