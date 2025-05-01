        // src/pages/BookPage.tsx
        import { useState } from 'react';
        import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
        import BookList from '../components/BookList';
        import BookDetail from '../components/BookDetail'; // Pastikan komponen ini ada
        import AddEditBook from '../components/AddEditBook';
        import AxiosInstance from '../utils/AxiosInstance';
        import { BookType, CategoryType, CreateBookPayload, UpdateBookPayload } from '../types';
        import { PlusOutlined } from '@ant-design/icons'; // Import icon
        import { useAuth } from '../utils/AuthProvider';

        // --- Fetcher Functions (di luar komponen) ---
        const fetchBooks = async (page = 1, limit = 9, token : string | null): Promise<BookType[]> => { // Asumsi API mengembalikan total & halaman
        // Sesuaikan endpoint dan response structure dengan API backendmu
        // Contoh ini mengasumsikan API mengembalikan object dengan { data: [], total: N, currentPage: N }
        const response = await AxiosInstance.get<BookType[]>(`/api/books?page=${page}&limit=${limit}`, {
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        return response.data;
        };

        const fetchCategories = async (token : string | null): Promise<CategoryType[]> => {
        const response = await AxiosInstance.get<CategoryType[]>('/api/categories', {
            headers : {Authorization : `Bearer ${token}`}
        } );
        return response.data;
        };

        const addBook = async (bookData: CreateBookPayload, token : string | null): Promise<BookType> => {
        const response = await AxiosInstance.post<BookType>('/api/books', bookData, {
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        return response.data;
        };

        const updateBook = async (bookData: UpdateBookPayload & { id: number }, token: string): Promise<BookType> => {
            // Pastikan ID ada sebelum mengirim
            if (!bookData.id) throw new Error("Book ID is required for update.");
            const { id, ...payload } = bookData; // Pisahkan ID dari payload
            const response = await AxiosInstance.put<BookType>(`/api/books/${id}`, payload,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
        };


        const deleteBook = async (id: number, token: string): Promise<void> => {
        await AxiosInstance.delete(`/api/books/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        };

        // --- Component ---
        const BookPage = () => {
            const {getToken} = useAuth()
            const queryClient = useQueryClient();
            const [currentPage, setCurrentPage] = useState(1);
            const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
            const [isFormOpen, setIsFormOpen] = useState(false);
            const [isEditMode, setIsEditMode] = useState(false);
            const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

            // --- React Query Hooks ---
            const { data: bookData, isLoading: isLoadingBooks, error: booksError } = useQuery({
                queryKey: ['books', currentPage], // Key termasuk currentPage agar otomatis refetch saat page berubah
                queryFn: () => fetchBooks(currentPage,undefined,getToken()),
            });

            const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
                queryKey: ['categories'],
                queryFn: () =>  fetchCategories(getToken()),
            });

            const mutationOptions = {
                onSuccess: () => {
                    // Invalidate query 'books' agar data di-refetch setelah sukses
                    queryClient.invalidateQueries({ queryKey: ['books'] });
                    setIsFormOpen(false); // Tutup form setelah sukses
                    setIsDetailViewOpen(false); // Tutup detail view jika dari sana
                    setSelectedBook(null); // Reset selected book
                },
                onError: (error: any) => {
                    // Error handling bisa lebih spesifik di sini atau di komponen form
                    console.error("Mutation failed:", error);
                    // Anda bisa set state error di sini jika ingin menampilkannya di page utama
                }
            };

            const addMutation = useMutation({
                mutationFn: (data : CreateBookPayload) =>  addBook(data, getToken()),
                ...mutationOptions,
            });

            const updateMutation = useMutation({
                mutationFn: (data : UpdateBookPayload & { id : number }) => updateBook(data, getToken() ?? " "),
                ...mutationOptions,
            });


            const deleteMutation = useMutation({
                mutationFn:(id: number )=> deleteBook(id, getToken() ?? ""),
                ...mutationOptions,
                onSuccess: () => { // Override onSuccess khusus delete
                    queryClient.invalidateQueries({ queryKey: ['books'] });
                    setIsDetailViewOpen(false); // Tutup detail view
                    setSelectedBook(null); // Reset selected book
                },
            });

            // --- Handlers ---
            const handleAddClick = () => {
                setSelectedBook(null);
                setIsEditMode(false);
                setIsFormOpen(true);
                setIsDetailViewOpen(false);
            };

            const handleEditClick = (book: BookType) => {
                setSelectedBook(book);
                setIsEditMode(true);
                setIsFormOpen(true);
                setIsDetailViewOpen(false);
            };

            const handleDetailClick = (book: BookType) => {
                setSelectedBook(book);
                setIsDetailViewOpen(true);
                setIsFormOpen(false);
            };

            const handleCloseForm = () => {
                setIsFormOpen(false);
                setSelectedBook(null); // Reset jika menutup form
                // Reset error mutation jika perlu
                addMutation.reset();
                updateMutation.reset();
            };

            const handleCloseDetail = () => {
                setIsDetailViewOpen(false);
                setSelectedBook(null);
            };

            const handleFormSubmit = (formData: CreateBookPayload | UpdateBookPayload) => {
                if (isEditMode && selectedBook) {
                    // Pastikan id ada saat update
                    updateMutation.mutate({ ...formData, id: selectedBook.id } as UpdateBookPayload & { id: number });
                } else {
                    addMutation.mutate(formData as CreateBookPayload);
                }
            };

            const handleDeleteConfirm = (id: number) => {
            if (window.confirm('Are you sure you want to delete this book?')) {
                    deleteMutation.mutate(id);
            }
            };

            const handlePageChange = (page: number) => {
                // Pastikan halaman tidak negatif
                if (page > 0) {
                    setCurrentPage(page);
                }
            };

            // --- Render Logic ---
            
            // Asumsi API mengembalikan total items atau total pages
            // const totalBooks = bookData?.total ?? 0;
            // const totalPages = Math.ceil(totalBooks / limit); // Ganti limit sesuai value fetchBooks

            const getErrorMessage = () => {
                if (booksError) return `Failed to load books: ${(booksError as Error).message}`;
                if (addMutation.error) return `Failed to add book: ${(addMutation.error as Error).message}`;
                if (updateMutation.error) return `Failed to update book: ${(updateMutation.error as Error).message}`;
                if (deleteMutation.error) return `Failed to delete book: ${(deleteMutation.error as Error).message}`;
                return null; // Kembalikan null jika tidak ada error
            };

            return (
                <div className="min-h-screen bg-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">My Book</h1>
                        <button
                            onClick={handleAddClick}
                            // Ganti style button sesuai keinginan, contoh ini mirip referensi
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm transition-colors duration-200"
                        >
                            <PlusOutlined /> Add Book
                        </button>
                    </div>

                    {/* Tampilkan Global Error Message (Optional) */}
                    {/* {getErrorMessage() && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            {getErrorMessage()}
                        </div>
                    )} */}

                    {/* Loading Indicator */}
                    {isLoadingBooks || isLoadingCategories ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : bookData && (
                        <>
                            {/* Book List */}
                            <BookList
                                books={bookData}
                                onEdit={handleEditClick}
                                onDetail={handleDetailClick} // Ganti onView jadi onDetail sesuai kodemu
                                // --- Props Pagination ---
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                // Sediakan hasMore atau totalPages jika API mendukung
                                // hasMore={currentPage < totalPages} // Contoh
                            />

                            {/* Modals */}

                            {isDetailViewOpen && selectedBook && (
                                <BookDetail
                                    book={selectedBook}
                                    onClose={handleCloseDetail}
                                    // Tambahkan handler ini ke BookDetail
                                    onEdit={() => handleEditClick(selectedBook)}
                                    onDelete={() => handleDeleteConfirm(selectedBook.id)}
                                    // Pass loading state delete jika perlu
                                    isDeleting={deleteMutation.isPending}
                                />
                            )}
                        </>
                    )}

                        {isFormOpen && (
                                <AddEditBook
                                    // Pass isOpen untuk kontrol internal modal jika perlu (optional)
                                    book={isEditMode ? selectedBook : null}
                                    categories={categoriesData ?? []}
                                    onClose={handleCloseForm}
                                    onSave={handleFormSubmit} // onSave tetap ok, ini yg dipanggil dari AddEditBook
                                    // Pass error spesifik ke form jika perlu
                                    errorMessage={getErrorMessage()}
                                    // Pass loading state ke form
                                    isSubmitting={addMutation.isPending || updateMutation.isPending}
                                />
                            )}
                </div>
            );
        };

        export default BookPage;