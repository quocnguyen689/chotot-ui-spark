import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AuthService,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/services/auth.service";
import { ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Query keys for consistent cache management
export const authKeys = {
  profile: ["auth", "profile"] as const,
  user: (id: string) => ["auth", "user", id] as const,
};

// Hook for user profile query
export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile,
    queryFn: () => AuthService.getProfile(),
    select: (data) => data.data, // Extract user data from ApiResponse
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for login mutation
export function useLogin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data) => {
      // Update profile cache with the returned user data
      queryClient.setQueryData(authKeys.profile, data);

      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${data.data.user.name}!`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for register mutation
export function useRegister() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => AuthService.register(userData),
    onSuccess: (data) => {
      // Update profile cache with the returned user data
      queryClient.setQueryData(authKeys.profile, data);

      toast({
        title: "Đăng ký thành công",
        description: `Chào mừng ${data.data.user.name}!`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Đăng ký thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for logout mutation
export function useLogout() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã được đăng xuất khỏi hệ thống.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Lỗi đăng xuất",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for profile update mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userData: Partial<User>) =>
      AuthService.updateProfile(userData),
    onSuccess: (data) => {
      // Update profile cache
      queryClient.setQueryData(authKeys.profile, data);

      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân đã được cập nhật.",
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

// Hook for forgot password mutation
export function useForgotPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword(email),
    onSuccess: () => {
      toast({
        title: "Email đã được gửi",
        description: "Vui lòng kiểm tra email để đặt lại mật khẩu.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Gửi email thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for reset password mutation
export function useResetPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      AuthService.resetPassword(token, password),
    onSuccess: () => {
      toast({
        title: "Đặt lại mật khẩu thành công",
        description: "Bạn có thể đăng nhập với mật khẩu mới.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Đặt lại mật khẩu thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook for change password mutation
export function useChangePassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => AuthService.changePassword(oldPassword, newPassword),
    onSuccess: () => {
      toast({
        title: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được cập nhật.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Đổi mật khẩu thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Custom hook to check authentication status
export function useAuth() {
  const { data: profile, isLoading, error } = useProfile();

  return {
    user: profile?.data,
    isAuthenticated: !!profile?.data,
    isLoading,
    error,
  };
}
