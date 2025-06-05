import { apiProvider, ApiResponse } from "@/lib/api";

// Define types for authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Authentication service
export class AuthService {
  // Login user
  static async login(
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiProvider.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    // Store token automatically after successful login
    if (response.success && response.data.token) {
      apiProvider.setAuthToken(response.data.token);
    }

    return response;
  }

  // Register new user
  static async register(
    userData: RegisterRequest
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiProvider.post<LoginResponse>(
      "/auth/register",
      userData
    );

    // Store token automatically after successful registration
    if (response.success && response.data.token) {
      apiProvider.setAuthToken(response.data.token);
    }

    return response;
  }

  // Logout user
  static async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiProvider.post<void>("/auth/logout");
      return response;
    } finally {
      // Clear token regardless of API response
      apiProvider.clearAuthToken();
    }
  }

  // Get current user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    return apiProvider.get<User>("/auth/profile");
  }

  // Update user profile
  static async updateProfile(
    userData: Partial<User>
  ): Promise<ApiResponse<User>> {
    return apiProvider.patch<User>("/auth/profile", userData);
  }

  // Refresh auth token
  static async refreshToken(
    request: RefreshTokenRequest
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiProvider.post<LoginResponse>(
      "/auth/refresh",
      request
    );

    // Update token if refresh is successful
    if (response.success && response.data.token) {
      apiProvider.setAuthToken(response.data.token);
    }

    return response;
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiProvider.post<void>("/auth/forgot-password", { email });
  }

  // Reset password
  static async resetPassword(
    token: string,
    password: string
  ): Promise<ApiResponse<void>> {
    return apiProvider.post<void>("/auth/reset-password", { token, password });
  }

  // Change password
  static async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    return apiProvider.post<void>("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  }
}
