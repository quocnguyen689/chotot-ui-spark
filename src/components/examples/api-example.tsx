import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Import our custom hooks
import { useAuth, useLogin, useLogout } from "@/hooks/use-auth";
import {
  usePosts,
  useCreatePost,
  useDeletePost,
  usePublishPost,
} from "@/hooks/use-posts";

export function ApiExample() {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
  });

  // Authentication hooks
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // Posts hooks
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts({
    page: 1,
    limit: 10,
  });
  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();
  const publishPostMutation = usePublishPost();

  // Handle login
  const handleLogin = () => {
    loginMutation.mutate({
      email: "test@example.com",
      password: "password123",
    });
  };

  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Handle create post
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Lỗi validation",
        description: "Vui lòng nhập đầy đủ tiêu đề và nội dung.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate(
      {
        title: newPost.title,
        content: newPost.content,
        tags: newPost.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: "draft",
      },
      {
        onSuccess: () => {
          setNewPost({ title: "", content: "", tags: "" });
        },
      }
    );
  };

  if (authLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Authentication Section */}
      <Card>
        <CardHeader>
          <CardTitle>Trạng thái đăng nhập</CardTitle>
          <CardDescription>Quản lý phiên đăng nhập của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Xin chào, {user?.name}!</p>
                <p className="text-sm text-muted-foreground">
                  Email: {user?.email}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {user?.role}
                </Badge>
              </div>
              <Button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                variant="outline"
              >
                {logoutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Bạn chưa đăng nhập vào hệ thống.
              </p>
              <Button onClick={handleLogin} disabled={loginMutation.isPending}>
                {loginMutation.isPending
                  ? "Đang đăng nhập..."
                  : "Đăng nhập demo"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Post Section */}
      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle>Tạo bài viết mới</CardTitle>
            <CardDescription>
              Thêm một bài viết mới vào hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Nhập nội dung bài viết..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
              <Input
                id="tags"
                value={newPost.tags}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="tag1, tag2, tag3..."
              />
            </div>
            <Button
              onClick={handleCreatePost}
              disabled={createPostMutation.isPending}
              className="w-full"
            >
              {createPostMutation.isPending ? "Đang tạo..." : "Tạo bài viết"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Posts List Section */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
          <CardDescription>Tất cả bài viết trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          {postsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : postsError ? (
            <div className="text-center text-red-500 py-4">
              <p>Lỗi tải dữ liệu: {postsError.message}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Đây là demo, API endpoint không tồn tại thực tế.
              </p>
            </div>
          ) : posts?.items && posts.items.length > 0 ? (
            <div className="space-y-4">
              {posts.items.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bởi {post.author.name} •{" "}
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <Badge
                      variant={
                        post.status === "published"
                          ? "default"
                          : post.status === "draft"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {post.status === "published"
                        ? "Đã xuất bản"
                        : post.status === "draft"
                        ? "Bản nháp"
                        : "Lưu trữ"}
                    </Badge>
                  </div>

                  <p className="text-sm">{post.content}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {isAuthenticated && (
                    <div className="flex gap-2 pt-2">
                      {post.status === "draft" && (
                        <Button
                          size="sm"
                          onClick={() => publishPostMutation.mutate(post.id)}
                          disabled={publishPostMutation.isPending}
                        >
                          Xuất bản
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deletePostMutation.mutate(post.id)}
                        disabled={deletePostMutation.isPending}
                      >
                        Xóa
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <div className="text-center text-sm text-muted-foreground">
                Hiển thị {posts.items.length} / {posts.total} bài viết
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Không có bài viết nào.</p>
              <p className="text-sm mt-2">
                Đây là demo, dữ liệu sẽ được tải từ API thực tế.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
