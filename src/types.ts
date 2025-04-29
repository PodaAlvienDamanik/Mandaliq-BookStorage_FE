// src/types.ts (Updated - Image Removed)
export type CategoryType = {
    id: number;
    name: string;
};

export type BookType = {
    id: number;
    title: string;
    author: string;
    description: string; // Description is present
    category: CategoryType | null;
    created_at?: Date; // Assuming you might have this or similar
    // updated_at?: Date; // Optional
};

// DTO payloads for sending data TO the backend
export type CreateBookPayload = {
    title: string;
    author: string;
    description: string; // Keep description
    // image?: string; // REMOVED
    categoryId: number;
}

export type UpdateBookPayload = Partial<CreateBookPayload>; // Still works

// Category types remain the same
export type CreateCategoryPayload = { name: string; }
export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;