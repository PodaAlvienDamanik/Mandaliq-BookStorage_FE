    import axios from '../utils/AxiosInstance';
    import { useMutation, useQuery } from '@tanstack/react-query';
    import { useEffect } from 'react'
    import { useNavigate, useParams } from 'react-router-dom';
    import FormTodo from '../components/FormTodo';

    // Interface untuk mendefinisikan struktur data todo
    interface Todo {
    todo: string, 
    completed: boolean,
    userId: number 
    }

    // Fungsi untuk mengirim permintaan edit todo ke server
    const TodoEdit = async (data: Todo, id: string | undefined) => {
    return await axios.put(`/todo/${id}`, data);
    };

    // Fungsi untuk mengambil data todo berdasarkan ID
    const fetchTodoData = (id: string | undefined) => {
    return axios.get<Todo>(`/todo/${id}`);
    }

    const EditTodo = () => {
    const { id } = useParams(); // Mendapatkan parameter ID dari URL

    // Mengambil data todo dari server menggunakan react-query
    const getTodoData = useQuery({
        queryKey: ["TodoDat", id],
        queryFn: () => fetchTodoData(id) // Fungsi untuk fetch data
    });

    const navigate = useNavigate(); // Hook untuk navigasi halaman

    // Mutasi untuk mengedit data todo
    const editTodoMutation = useMutation({
        mutationFn: (data: Todo) => TodoEdit(data, id) // Fungsi edit todo
    });

    // Hook untuk memantau status mutasi dan navigasi ke halaman todo jika sukses
    useEffect(() => {
        if (editTodoMutation.isSuccess) {
        navigate("/todo", { replace: true }); // Navigasi ke halaman todo jika sukses
        }
    }, [editTodoMutation.isSuccess]);

    return (
        <div className="relative">
        {/* Menampilkan loading state saat proses edit sedang berjalan */}
        {editTodoMutation.isPending && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                <span className="text-2xl mr-4 text-gray-800">Adding...</span>
                <svg
                className="animate-spin h-5 w-5 text-gray-600"
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
        <h2 className="text-2xl font-bold mb-6 mt-25 text-center">Edit Todo</h2>
        {/* Menampilkan form untuk mengedit todo */}
        <FormTodo 
            isEdit={true} 
            mutateFn={editTodoMutation.mutate} // Fungsi untuk memutasi data
            defaultInputData={getTodoData.data?.data} // Data default untuk form diambil dari server
        />
        </div>
    );
    }

    export default EditTodo;
