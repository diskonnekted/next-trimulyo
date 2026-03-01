export interface Community {
    id: number;
    name: string;
    description: string;
    image: string;
    news_count: number;
    galleries_count: number;
    activities_count: number;
}

export interface CommunityDetail extends Community {
    category?: string;
    contact?: string;
    created_at: string;
    updated_at: string;
    news: NewsItem[];
    galleries: GalleryItem[];
    activities: ActivityItem[];
}

export interface NewsItem {
    id: number;
    community_id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    views: number;
    is_published: number;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface GalleryItem {
    id: number;
    community_id: number;
    title: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface ActivityItem {
    id: number;
    community_id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    created_at: string;
    updated_at: string;
}

const API_BASE_URL = "https://trimulyo.smartvillage.center/api/v1";

function formatImageUrl(path: string | null | undefined): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    
    // Remove leading slash
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;

    if (cleanPath.startsWith("storage/")) {
        return `https://trimulyo.smartvillage.center/${cleanPath}`;
    }
    
    return `https://trimulyo.smartvillage.center/storage/${cleanPath}`;
}

export async function getCommunities(): Promise<Community[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/communities`, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch communities: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            return data.data.map((community: Community) => ({
                ...community,
                image: formatImageUrl(community.image)
            }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching communities:", error);
        return [];
    }
}

export async function getCommunityDetail(id: number): Promise<CommunityDetail | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/communities/${id}`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch community detail: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            const detail = data.data;
            return {
                ...detail,
                image: formatImageUrl(detail.image),
                news: detail.news?.map((item: NewsItem) => ({ ...item, image: formatImageUrl(item.image) })) || [],
                galleries: detail.galleries?.map((item: GalleryItem) => ({ ...item, image: formatImageUrl(item.image) })) || [],
                activities: detail.activities?.map((item: ActivityItem) => ({ ...item, image: formatImageUrl(item.image) })) || []
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching community detail ${id}:`, error);
        return null;
    }
}
