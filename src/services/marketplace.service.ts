import { apiProvider, ApiResponse } from "@/lib/api";
import { PaginationParams, ListResponse } from "./data.service";

// Marketplace Item interfaces
export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  condition: "new" | "like_new" | "good" | "fair" | "poor";
  location: {
    city: string;
    district: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  seller: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    verified: boolean;
  };
  createdAt: string;
  updatedAt: string;
  status: "active" | "sold" | "reserved" | "inactive";
  viewCount: number;
  likeCount: number;
  isLiked?: boolean;
  isTrending?: boolean;
}

export interface TrendingItem
  extends Pick<
    MarketplaceItem,
    "id" | "title" | "price" | "currency" | "images" | "category" | "viewCount"
  > {
  trendingScore: number;
  trendingRank: number;
}

export interface Collection {
  id: string | number;
  name: string;
  description: string;
  image_url: string;
  itemCount: number;
  totalValue: number;
  category: string;
  items: MarketplaceItem[];
  createdAt: string;
  memberCount: number;
}

export interface CollectionCreate {
  title: string;
  description: string;
  created_date: string;
}

export interface CreateItemRequest {
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  condition: MarketplaceItem["condition"];
  location: {
    city: string;
    district: string;
  };
}

export interface SearchParams extends PaginationParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  location?: string;
  sortBy?: "newest" | "price_low" | "price_high" | "popular" | "distance";
}

export interface NearbyParams {
  lat: number;
  lng: number;
  radius?: number; // in kilometers
  limit?: number;
}

// Marketplace Service
export class MarketplaceService {
  private static readonly ENDPOINT = "/marketplace";

  // Get trending items
  static async getTrendingItems(
    limit = 10
  ): Promise<ApiResponse<TrendingItem[]>> {
    return apiProvider.get<TrendingItem[]>(`${this.ENDPOINT}/trending`, {
      params: { limit },
    });
  }

  // Get marketplace items with filters
  static async getItems(
    params?: SearchParams
  ): Promise<ApiResponse<ListResponse<MarketplaceItem>>> {
    return apiProvider.get<ListResponse<MarketplaceItem>>(this.ENDPOINT, {
      params,
    });
  }

  // Get single item by ID
  static async getItem(id: string): Promise<ApiResponse<MarketplaceItem>> {
    return apiProvider.get<MarketplaceItem>(`${this.ENDPOINT}/${id}`);
  }

  // Create new item
  static async createItem(
    data: CreateItemRequest
  ): Promise<ApiResponse<MarketplaceItem>> {
    return apiProvider.post<MarketplaceItem>(this.ENDPOINT, data);
  }

  // Update item
  static async updateItem(
    id: string,
    data: Partial<CreateItemRequest>
  ): Promise<ApiResponse<MarketplaceItem>> {
    return apiProvider.patch<MarketplaceItem>(`${this.ENDPOINT}/${id}`, data);
  }

  // Delete item
  static async deleteItem(id: string): Promise<ApiResponse<void>> {
    return apiProvider.delete(`${this.ENDPOINT}/${id}`);
  }

  // Get AI-curated collections (for user)
  static async getAICollections(
    userId?: string
  ): Promise<ApiResponse<Collection[]>> {
    return apiProvider.get<Collection[]>(`${this.ENDPOINT}/collections/ai`, {
      params: { userId },
    });
  }

  // Get collections list with pagination
  static async getCollections(
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<Collection>>> {
    return apiProvider.get<ListResponse<Collection>>(
      `${this.ENDPOINT}/collections`,
      {
        params,
      }
    );
  }

  // Get nearby items
  static async getNearbyItems(
    params: NearbyParams
  ): Promise<ApiResponse<MarketplaceItem[]>> {
    return apiProvider.get<MarketplaceItem[]>(`${this.ENDPOINT}/nearby`, {
      params,
    });
  }

  // Search items
  static async searchItems(
    query: string,
    params?: SearchParams
  ): Promise<ApiResponse<ListResponse<MarketplaceItem>>> {
    return apiProvider.get<ListResponse<MarketplaceItem>>(
      `${this.ENDPOINT}/search`,
      {
        params: { ...params, q: query },
      }
    );
  }

  // Like/Unlike item
  static async toggleLike(
    id: string
  ): Promise<ApiResponse<{ isLiked: boolean; likeCount: number }>> {
    return apiProvider.post<{ isLiked: boolean; likeCount: number }>(
      `${this.ENDPOINT}/${id}/like`
    );
  }

  // Mark item as sold
  static async markAsSold(id: string): Promise<ApiResponse<MarketplaceItem>> {
    return apiProvider.post<MarketplaceItem>(`${this.ENDPOINT}/${id}/sold`);
  }

  // Get user's items
  static async getUserItems(
    userId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<MarketplaceItem>>> {
    return apiProvider.get<ListResponse<MarketplaceItem>>(
      `${this.ENDPOINT}/user/${userId}`,
      {
        params,
      }
    );
  }

  // Get categories
  static async getCategories(): Promise<
    ApiResponse<{ id: string; name: string; icon: string; count: number }[]>
  > {
    return apiProvider.get<
      { id: string; name: string; icon: string; count: number }[]
    >(`${this.ENDPOINT}/categories`);
  }

  // Report item
  static async reportItem(
    id: string,
    reason: string,
    description?: string
  ): Promise<ApiResponse<void>> {
    return apiProvider.post<void>(`${this.ENDPOINT}/${id}/report`, {
      reason,
      description,
    });
  }
}
