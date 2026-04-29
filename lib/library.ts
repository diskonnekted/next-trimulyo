import { ApiService } from "./api-service";

export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    cover_image: string;
    cover_url: string;
    isbn: string;
    publisher: string;
    year: string;
}

export interface LibraryInfo {
    library_name: string;
    description: string;
    address: string;
    email: string;
    head_of_library: string;
    phone: string;
    last_updated: string;
}

export interface BooksApiResponse {
    status: string;
    query: string;
    page: number;
    limit: number;
    data: Book[];
}

export interface LibraryInfoApiResponse {
    status: string;
    data: LibraryInfo;
}

const libraryApi = new ApiService({
    baseUrl: "https://trimulyo.orbitdev.id",
    timeout: 15000,
    cache: {
        revalidate: 3600, // 1 hour
    },
});

export const fetchBooks = async (query = "", page = 1, limit = 12): Promise<BooksApiResponse | null> => {
    try {
        const response = await libraryApi.get<BooksApiResponse>(
            `/api/books.php?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
        );
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching books:", error);
        return null;
    }
};

export const fetchLibraryInfo = async (): Promise<LibraryInfo | null> => {
    try {
        const response = await libraryApi.get<LibraryInfoApiResponse>("/api/info.php");
        if (response.success && response.data) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching library info:", error);
        return null;
    }
};
