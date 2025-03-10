    import { useMutation, useQuery } from '@tanstack/react-query';
    import axios from '../utils/AxiosInstance';
    import { useNavigate } from 'react-router-dom';

    interface Todo {
        id: number;
        todo: string;
        completed: boolean;
        userId: number;
    }

    interface TodoList {
        todos: Todo[];
    }

    interface DeletedTodo extends Todo {
        isDeleted: boolean;
        deletedOn: string;
    }

    const fetchTodoList = async () => {
        return axios.get<TodoList>('/todo');
    };

    const deleteTodo = async (id: string | undefined) => {
        return axios.delete<DeletedTodo>(`/todo/${id}`);
    };

    const TodoMakan = () => (
        <div className="flex flex-col space-y-4 mt-2 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                    <div className="bg-gray-300 animate-pulse h-6 w-6 rounded-full"></div>
                    <div className="bg-gray-300 animate-pulse h-6 w-96 rounded-xl"></div>
                </div>
                <div className="bg-gray-300 animate-pulse h-6 w-6 rounded-full mr-1"></div>
            </div>
            <div>
                <div className="bg-gray-300 animate-pulse h-1 w-full rounded-xl"></div>
                <div className="flex justify-end mt-2">
                    <div className="bg-gray-300 animate-pulse h-4 w-6 rounded"></div>
                </div>
            </div>
        </div>
    );

    const Todo = () => {
        const getTodoList = useQuery({
            queryKey: ['Todo'],
            queryFn: fetchTodoList,
        });

        const deleteTodoMutation = useMutation({
            mutationFn: (id: string) => deleteTodo(id),
        });

        const navigate = useNavigate();

        return (
            <div className="container mx-auto px-4">
                <button
                    className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
                    onClick={() => navigate('./add')}
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
                {/*ini untuk display R for crud*/}
                <div className="max-w-[700px] mx-auto mt-3">
                    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">
                            Todo List
                        </h2>
                        <hr className="border-gray-300 mb-6" />
                        <div className="flex flex-col gap-6 px-4 mt-6 max-w-4xl mx-auto w-full h-[600px] pt-6 overflow-y-scroll bg-gray-100 rounded-lg shadow-md">
                            {getTodoList.isFetching
                                ? Array.from({ length: 6 }).map((_, index) => (
                                    <TodoMakan key={index} />
                                ))
                                : getTodoList.data?.data.todos.map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-3 items-center">
                                                <input
                                                    type="checkbox"
                                                    disabled
                                                    checked={todo.completed}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <p
                                                    className={
                                                        todo.completed
                                                            ? 'text-lg font-semibold line-through text-gray-500'
                                                            : 'text-lg font-semibold text-gray-800'
                                                    }
                                                >
                                                    {todo.todo}
                                                </p>
                                            </div>
                                            <div className="relative group">
                                                <button>
                                                    <svg
                                                        className="w-7 text-gray-700 hover:text-blue-500 rounded-full p-1 transition-all"
                                                        fill="none"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                    </svg>
                                                </button>

                                                {/*ini untuk edit U for crud */}
                                                <div className="absolute bottom-0 right-8 bg-white rounded-lg shadow-lg w-32 hidden group-hover:block">
                                                    <button
                                                        onClick={() => navigate(`${todo.id}/edit`)}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                    >
                                                        Edit
                                                    </button>

                                                    {/*ini untuk delete D for crud*/}
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                        onClick={() => {
                                                            if (confirm('Are you sure want to delete this comment?')) {
                                                                deleteTodoMutation.mutate(todo.id.toString());
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <hr />
                                            <div className="flex justify-end mt-2">
                                                <p className="text-xs text-gray-500">Id User: {todo.userId}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Todo;
