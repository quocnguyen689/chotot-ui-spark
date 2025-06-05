import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MarketplaceService,
  MarketplaceItem,
  TrendingItem,
  Collection,
  CreateItemRequest,
  SearchParams,
  NearbyParams,
} from "@/services/marketplace.service";
import { ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Query keys for consistent cache management
export const marketplaceKeys = {
  all: ["marketplace"] as const,
  trending: (limit?: number) =>
    [...marketplaceKeys.all, "trending", limit] as const,
  items: () => [...marketplaceKeys.all, "items"] as const,
  itemsList: (params?: SearchParams) =>
    [...marketplaceKeys.items(), "list", params] as const,
  item: (id: string) => [...marketplaceKeys.all, "item", id] as const,
  collections: () => [...marketplaceKeys.all, "collections"] as const,
  aiCollections: (userId?: string) =>
    [...marketplaceKeys.collections(), "ai", userId] as const,
  nearby: (params: NearbyParams) =>
    [...marketplaceKeys.all, "nearby", params] as const,
  search: (query: string, params?: SearchParams) =>
    [...marketplaceKeys.all, "search", query, params] as const,
  userItems: (userId: string) =>
    [...marketplaceKeys.all, "user", userId] as const,
  categories: () => [...marketplaceKeys.all, "categories"] as const,
};

// Hook for trending items
export function useTrendingItems(limit = 10) {
  return useQuery({
    queryKey: marketplaceKeys.trending(limit),
    queryFn: () => MarketplaceService.getTrendingItems(limit),
    select: (data) => data.data,
    staleTime: 2 * 60 * 1000, // 2 minutes - trending changes frequently
  });
}

// Hook for marketplace items list
export function useMarketplaceItems(params?: SearchParams) {
  return useQuery({
    queryKey: marketplaceKeys.itemsList(params),
    queryFn: () => MarketplaceService.getItems(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for single marketplace item
export function useMarketplaceItem(id: string) {
  return useQuery({
    queryKey: marketplaceKeys.item(id),
    queryFn: () => MarketplaceService.getItem(id),
    select: (data) => data.data,
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for AI collections
export function useAICollections(userId?: string) {
  return useQuery({
    queryKey: marketplaceKeys.aiCollections(userId),
    queryFn: () => MarketplaceService.getAICollections(userId),
    select: (data) => data.data,
    staleTime: 15 * 60 * 1000, // 15 minutes - AI collections don't change often
  });
}

// Hook for nearby items
export function useNearbyItems(params: NearbyParams) {
  return useQuery({
    queryKey: marketplaceKeys.nearby(params),
    queryFn: () => MarketplaceService.getNearbyItems(params),
    select: (data) => data.data,
    enabled: !!(params.lat && params.lng), // Only fetch if coordinates are available
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

// Hook for searching items
export function useSearchItems(query: string, params?: SearchParams) {
  return useQuery({
    queryKey: marketplaceKeys.search(query, params),
    queryFn: () => MarketplaceService.searchItems(query, params),
    select: (data) => data.data,
    enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Hook for user's items
export function useUserItems(userId: string) {
  return useQuery({
    queryKey: marketplaceKeys.userItems(userId),
    queryFn: () => MarketplaceService.getUserItems(userId),
    select: (data) => data.data,
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for categories
export function useCategories() {
  return useQuery({
    queryKey: marketplaceKeys.categories(),
    queryFn: () => MarketplaceService.getCategories(),
    select: (data) => data.data,
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
}

// Hook for creating an item
export function useCreateItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateItemRequest) =>
      MarketplaceService.createItem(data),
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.items() });
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.categories() });

      // Add the new item to cache
      queryClient.setQueryData(marketplaceKeys.item(data.data.id), data);

      toast({
        title: "Đăng tin thành công",
        description: `Sản phẩm "${data.data.title}" đã được đăng.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Đăng tin thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for updating an item
export function useUpdateItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateItemRequest>;
    }) => MarketplaceService.updateItem(id, data),
    onSuccess: (data, variables) => {
      // Update the specific item in cache
      queryClient.setQueryData(marketplaceKeys.item(variables.id), data);

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.items() });

      toast({
        title: "Cập nhật thành công",
        description: `Sản phẩm "${data.data.title}" đã được cập nhật.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Cập nhật thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for deleting an item
export function useDeleteItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => MarketplaceService.deleteItem(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: marketplaceKeys.item(deletedId) });

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.items() });

      toast({
        title: "Xóa tin thành công",
        description: "Sản phẩm đã được xóa khỏi hệ thống.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Xóa tin thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for toggling like
export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MarketplaceService.toggleLike(id),
    onSuccess: (data, id) => {
      // Update the specific item in cache
      queryClient.setQueryData(marketplaceKeys.item(id), (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: data.data.isLiked,
              likeCount: data.data.likeCount,
            },
          };
        }
        return oldData;
      });

      // Invalidate lists to reflect changes
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.items() });
    },
    onError: (error: ApiError) => {
      console.error("Toggle like failed:", error);
    },
  });
}

// Hook for marking as sold
export function useMarkAsSold() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => MarketplaceService.markAsSold(id),
    onSuccess: (data, id) => {
      // Update the specific item in cache
      queryClient.setQueryData(marketplaceKeys.item(id), data);

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.items() });

      toast({
        title: "Đánh dấu đã bán",
        description: `Sản phẩm "${data.data.title}" đã được đánh dấu là đã bán.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Cập nhật thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for reporting an item
export function useReportItem() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      reason,
      description,
    }: {
      id: string;
      reason: string;
      description?: string;
    }) => MarketplaceService.reportItem(id, reason, description),
    onSuccess: () => {
      toast({
        title: "Báo cáo đã được gửi",
        description: "Chúng tôi sẽ xem xét báo cáo của bạn.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Gửi báo cáo thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Utility hook to get user location for nearby items
export function useUserLocation() {
  return useQuery({
    queryKey: ["userLocation"],
    queryFn: () =>
      new Promise<{ lat: number; lng: number }>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported"));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => reject(error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 } // 5 minutes cache
        );
      }),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry if user denies location
  });
}
