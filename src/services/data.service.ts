import { apiProvider, ApiResponse } from "@/lib/api";

// Generic list response interface
export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Generic pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: any; // Allow additional filter parameters
}

// Example Post interface
export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  tags: string[];
  status?: "draft" | "published";
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

// Generic Data Service class
export class DataService {
  // Generic GET list with pagination
  static async getList<T>(
    endpoint: string,
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<T>>> {
    return apiProvider.get<ListResponse<T>>(endpoint, { params });
  }

  // Generic GET by ID
  static async getById<T>(
    endpoint: string,
    id: string
  ): Promise<ApiResponse<T>> {
    return apiProvider.get<T>(`${endpoint}/${id}`);
  }

  // Generic CREATE
  static async create<T, U = any>(
    endpoint: string,
    data: U
  ): Promise<ApiResponse<T>> {
    return apiProvider.post<T>(endpoint, data);
  }

  // Generic UPDATE
  static async update<T, U = any>(
    endpoint: string,
    id: string,
    data: U
  ): Promise<ApiResponse<T>> {
    return apiProvider.patch<T>(`${endpoint}/${id}`, data);
  }

  // Generic DELETE
  static async delete<T = void>(
    endpoint: string,
    id: string
  ): Promise<ApiResponse<T>> {
    return apiProvider.delete<T>(`${endpoint}/${id}`);
  }

  // Bulk operations
  static async bulkDelete(
    endpoint: string,
    ids: string[]
  ): Promise<ApiResponse<void>> {
    return apiProvider.post<void>(`${endpoint}/bulk-delete`, { ids });
  }

  static async bulkUpdate<T>(
    endpoint: string,
    updates: Array<{ id: string; data: any }>
  ): Promise<ApiResponse<T[]>> {
    return apiProvider.post<T[]>(`${endpoint}/bulk-update`, { updates });
  }
}

// Specific Post Service
export class PostService {
  private static readonly ENDPOINT = "/collections";

  // Get all posts with pagination and filters
  static async getPosts(
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<Post>>> {
    return DataService.getList<Post>(this.ENDPOINT, params);
  }

  // Get post by ID
  static async getPost(id: string): Promise<ApiResponse<Post>> {
    return DataService.getById<Post>(this.ENDPOINT, id);
  }

  // Create new post
  static async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    return DataService.create<Post, CreatePostRequest>(this.ENDPOINT, data);
  }

  // Update existing post
  static async updatePost(
    id: string,
    data: Partial<CreatePostRequest>
  ): Promise<ApiResponse<Post>> {
    return DataService.update<Post, Partial<CreatePostRequest>>(
      this.ENDPOINT,
      id,
      data
    );
  }

  // Delete post
  static async deletePost(id: string): Promise<ApiResponse<void>> {
    return DataService.delete(this.ENDPOINT, id);
  }

  // Publish post
  static async publishPost(id: string): Promise<ApiResponse<Post>> {
    return apiProvider.post<Post>(`${this.ENDPOINT}/${id}/publish`);
  }

  // Archive post
  static async archivePost(id: string): Promise<ApiResponse<Post>> {
    return apiProvider.post<Post>(`${this.ENDPOINT}/${id}/archive`);
  }

  // Get posts by author
  static async getPostsByAuthor(
    authorId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<Post>>> {
    return apiProvider.get<ListResponse<Post>>(
      `${this.ENDPOINT}/author/${authorId}`,
      { params }
    );
  }

  // Search posts
  static async searchPosts(
    query: string,
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<Post>>> {
    return apiProvider.get<ListResponse<Post>>(`${this.ENDPOINT}/search`, {
      params: { ...params, q: query },
    });
  }

  // Get related posts
  static async getRelatedPosts(
    id: string,
    limit = 5
  ): Promise<ApiResponse<Post[]>> {
    return apiProvider.get<Post[]>(`${this.ENDPOINT}/${id}/related`, {
      params: { limit },
    });
  }
}
