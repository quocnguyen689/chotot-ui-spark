import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  PostService,
  Post,
  CreatePostRequest,
  PaginationParams,
} from "@/services/data.service";
import { ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Query keys for consistent cache management
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params?: PaginationParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
  author: (authorId: string) => [...postKeys.all, "author", authorId] as const,
  related: (id: string) => [...postKeys.all, "related", id] as const,
};

// Hook for getting posts list with pagination
export function usePosts(params?: PaginationParams) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => PostService.getPosts(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for infinite scrolling posts
export function useInfinitePosts(params?: Omit<PaginationParams, "page">) {
  return useInfiniteQuery({
    queryKey: postKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      PostService.getPosts({ ...params, page: pageParam }),
    select: (data) => ({
      pages: data.pages.map((page) => page.data),
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for getting a single post
export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => PostService.getPost(id),
    select: (data) => data.data,
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for searching posts
export function useSearchPosts(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => PostService.searchPosts(query, params),
    select: (data) => data.data,
    enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for getting posts by author
export function usePostsByAuthor(authorId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: postKeys.author(authorId),
    queryFn: () => PostService.getPostsByAuthor(authorId, params),
    select: (data) => data.data,
    enabled: !!authorId,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for getting related posts
export function useRelatedPosts(id: string, limit = 5) {
  return useQuery({
    queryKey: postKeys.related(id),
    queryFn: () => PostService.getRelatedPosts(id, limit),
    select: (data) => data.data,
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook for creating a post
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => PostService.createPost(data),
    onSuccess: (data) => {
      // Invalidate posts lists to refetch
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });

      // Add the new post to cache
      queryClient.setQueryData(postKeys.detail(data.data.id), data);

      toast({
        title: "Tạo bài viết thành công",
        description: `Bài viết "${data.data.title}" đã được tạo.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Tạo bài viết thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for updating a post
export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePostRequest>;
    }) => PostService.updatePost(id, data),
    onSuccess: (data, variables) => {
      // Update the specific post in cache
      queryClient.setQueryData(postKeys.detail(variables.id), data);

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });

      toast({
        title: "Cập nhật bài viết thành công",
        description: `Bài viết "${data.data.title}" đã được cập nhật.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Cập nhật bài viết thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for deleting a post
export function useDeletePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => PostService.deletePost(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });

      toast({
        title: "Xóa bài viết thành công",
        description: "Bài viết đã được xóa khỏi hệ thống.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Xóa bài viết thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for publishing a post
export function usePublishPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => PostService.publishPost(id),
    onSuccess: (data, id) => {
      // Update the specific post in cache
      queryClient.setQueryData(postKeys.detail(id), data);

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });

      toast({
        title: "Xuất bản bài viết thành công",
        description: `Bài viết "${data.data.title}" đã được xuất bản.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Xuất bản bài viết thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for archiving a post
export function useArchivePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => PostService.archivePost(id),
    onSuccess: (data, id) => {
      // Update the specific post in cache
      queryClient.setQueryData(postKeys.detail(id), data);

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });

      toast({
        title: "Lưu trữ bài viết thành công",
        description: `Bài viết "${data.data.title}" đã được lưu trữ.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Lưu trữ bài viết thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
