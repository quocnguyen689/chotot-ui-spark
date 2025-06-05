# API Provider System - Hướng dẫn sử dụng

## Tổng quan

Hệ thống API provider này được xây dựng dựa trên:

- **Axios** cho HTTP requests
- **TanStack React Query** cho state management và caching
- **TypeScript** cho type safety
- **Interceptors** cho authentication và error handling

## Cấu trúc thư mục

```
src/
├── lib/
│   └── api.ts                    # Core API provider
├── providers/
│   └── query-provider.tsx       # React Query wrapper
├── services/
│   ├── auth.service.ts          # Authentication services
│   └── data.service.ts          # Generic data services
├── hooks/
│   ├── use-auth.ts              # Authentication hooks
│   └── use-posts.ts             # Posts hooks
└── components/examples/
    └── api-example.tsx          # Usage examples
```

## 1. Cấu hình cơ bản

### Environment Variables

Tạo file `.env` với các biến môi trường:

```env
VITE_API_BASE_URL=https://api.example.com/v1
VITE_APP_ENV=development
VITE_DEBUG=true
```

### Setup Provider

Wrap ứng dụng với QueryProvider trong `main.tsx`:

```tsx
import { QueryProvider } from "./providers/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
```

## 2. Sử dụng API Provider

### Cách sử dụng cơ bản

```tsx
import { apiProvider } from "@/lib/api";

// GET request
const response = await apiProvider.get("/users");

// POST request
const response = await apiProvider.post("/users", {
  name: "John Doe",
  email: "john@example.com",
});

// PUT/PATCH request
const response = await apiProvider.patch("/users/123", {
  name: "Jane Doe",
});

// DELETE request
const response = await apiProvider.delete("/users/123");
```

### Upload file

```tsx
const handleFileUpload = async (file: File) => {
  try {
    const response = await apiProvider.uploadFile(
      "/upload",
      file,
      (progress) => {
        console.log(`Upload progress: ${progress}%`);
      }
    );
    console.log("File uploaded:", response.data);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

## 3. Tạo Services

### Authentication Service Example

```tsx
import { apiProvider, ApiResponse } from "@/lib/api";

export class AuthService {
  static async login(
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiProvider.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    if (response.success && response.data.token) {
      apiProvider.setAuthToken(response.data.token);
    }

    return response;
  }

  static async getProfile(): Promise<ApiResponse<User>> {
    return apiProvider.get<User>("/auth/profile");
  }
}
```

### Generic Data Service

```tsx
export class DataService {
  static async getList<T>(
    endpoint: string,
    params?: PaginationParams
  ): Promise<ApiResponse<ListResponse<T>>> {
    return apiProvider.get<ListResponse<T>>(endpoint, { params });
  }

  static async create<T, U = any>(
    endpoint: string,
    data: U
  ): Promise<ApiResponse<T>> {
    return apiProvider.post<T>(endpoint, data);
  }
}
```

## 4. Tạo Custom Hooks

### Query Hook (GET)

```tsx
import { useQuery } from "@tanstack/react-query";

export function usePosts(params?: PaginationParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => PostService.getPosts(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Mutation Hook (POST/PUT/DELETE)

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => PostService.createPost(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: "Tạo bài viết thành công" });
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
```

### Infinite Query Hook (Pagination)

```tsx
export function useInfinitePosts(params?: Omit<PaginationParams, "page">) {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      PostService.getPosts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
```

## 5. Sử dụng trong Components

### Simple Query

```tsx
function PostsList() {
  const { data: posts, isLoading, error } = usePosts({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts?.items.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Form with Mutation

```tsx
function CreatePostForm() {
  const [title, setTitle] = useState("");
  const createPostMutation = useCreatePost();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({
      title,
      content: "Content here...",
      tags: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <button type="submit" disabled={createPostMutation.isPending}>
        {createPostMutation.isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

### Infinite Scroll

```tsx
function InfinitePostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
}
```

## 6. Error Handling

### Global Error Handling

API provider tự động xử lý lỗi thông qua interceptors:

- **401 Unauthorized**: Tự động xóa token và phát sự kiện logout
- **Retry Logic**: Tự động retry cho lỗi server (5xx)
- **Error Transformation**: Chuyển đổi lỗi thành format nhất quán

### Custom Error Handling

```tsx
const { data, error } = useQuery({
  queryKey: ["posts"],
  queryFn: () => PostService.getPosts(),
  retry: (failureCount, error) => {
    // Custom retry logic
    if (error.status === 404) return false;
    return failureCount < 3;
  },
  onError: (error) => {
    // Custom error handling
    if (error.status === 403) {
      toast({ title: "Không có quyền truy cập" });
    }
  },
});
```

## 7. Authentication

### Login/Logout

```tsx
function AuthComponent() {
  const { user, isAuthenticated } = useAuth();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const handleLogin = () => {
    loginMutation.mutate({
      email: "user@example.com",
      password: "password123",
    });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Xin chào, {user?.name}!</p>
          <button onClick={() => logoutMutation.mutate()}>Đăng xuất</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Đăng nhập</button>
      )}
    </div>
  );
}
```

### Protected Routes

```tsx
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
}
```

## 8. Best Practices

### 1. Query Keys Management

```tsx
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params?: PaginationParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};
```

### 2. Cache Invalidation

```tsx
// Invalidate all posts
queryClient.invalidateQueries({ queryKey: postKeys.all });

// Invalidate specific post
queryClient.invalidateQueries({ queryKey: postKeys.detail("123") });

// Remove from cache
queryClient.removeQueries({ queryKey: postKeys.detail("123") });
```

### 3. Optimistic Updates

```tsx
const updatePostMutation = useMutation({
  mutationFn: updatePost,
  onMutate: async (newPost) => {
    // Cancel ongoing requests
    await queryClient.cancelQueries({ queryKey: postKeys.detail(newPost.id) });

    // Get current data
    const previousPost = queryClient.getQueryData(postKeys.detail(newPost.id));

    // Optimistically update
    queryClient.setQueryData(postKeys.detail(newPost.id), newPost);

    return { previousPost };
  },
  onError: (err, newPost, context) => {
    // Rollback on error
    queryClient.setQueryData(
      postKeys.detail(newPost.id),
      context?.previousPost
    );
  },
});
```

## 9. Testing

### Mock API Provider

```tsx
// test-utils.tsx
const mockApiProvider = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

jest.mock("@/lib/api", () => ({
  apiProvider: mockApiProvider,
}));
```

### Test Hooks

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("usePosts should fetch posts", async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result } = renderHook(() => usePosts(), { wrapper });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
});
```

Hệ thống API provider này cung cấp một giải pháp toàn diện cho việc quản lý API calls, caching, và state management trong ứng dụng React với TypeScript.
