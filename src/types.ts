    // src/types.ts (or similar shared location)
    export type CategoryType = {
        id: number;
        name: string;
        // Add other fields if your backend returns them (like created_at, books array, etc.)
        // For simplicity here, we'll just use id and name for selection/display.
    };
    
    export type BookType = {
        id: number;
        title: string;
        author: string;
        description: string;
        image?: string; // Add image if used
        category: CategoryType | null; // Backend returns the nested category object
        created_at?: Date; // Optional, if needed
    };
    
    // DTO payloads for sending data TO the backend
    export type CreateBookPayload = {
        title: string;
        author: string;
        description: string;
        image?: string;
        categoryId: number; // Send only the ID
    }
    
    export type UpdateBookPayload = Partial<CreateBookPayload>; // Allow partial updates
    
    export type CreateCategoryPayload = {
        name: string;
    }
    
    export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;