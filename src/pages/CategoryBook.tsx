    import React, { useState } from 'react';
    import CategoryList from '../components/CategoryList';
    import AddEditCategory from '../components/AddEditCategory';

    const CategoryBook = () => {
    const [categories, setCategories] = useState<string[]>(['Fiction', 'Nonfiction']);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleAdd = () => {
        setSelectedCategory('');
        setIsEditing(true);
    };

    const handleEdit = (category: string) => {
        setSelectedCategory(category);
        setIsEditing(true);
    };

    const handleDelete = (category: string) => {
        setCategories(categories.filter((c) => c !== category));
    };

    const handleSave = (newCategory: string) => {
        const isEdit = categories.includes(selectedCategory || '');
        if (isEdit) {
        setCategories(
            categories.map((cat) => (cat === selectedCategory ? newCategory : cat))
        );
        } else {
        setCategories([...categories, newCategory]);
        }
        setSelectedCategory(null);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Book Categories</h1>
            <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
            Add Category
            </button>
        </div>

        <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />

        {isEditing && (
            <AddEditCategory
            initialValue={selectedCategory}
            onClose={() => setIsEditing(false)}
            onSave={handleSave}
            />
        )}
        </div>
    );
    };

    export default CategoryBook;
