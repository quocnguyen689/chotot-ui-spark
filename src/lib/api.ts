import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Define common response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

// Define base API configuration
const API_CONFIG = {
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://trao.onrender.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

class ApiProvider {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create(API_CONFIG);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: any) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        config.metadata = { startTime: new Date() };

        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse | any) => {
        const duration =
          new Date().getTime() - response.config.metadata?.startTime?.getTime();
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${
            response.config.url
          } (${duration}ms)`
        );
        return response;
      },
      (error: AxiosError) => {
        console.error(
          "❌ Response Error:",
          error.response?.data || error.message
        );

        // Handle specific error cases
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        return Promise.reject(this.transformError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  private handleUnauthorized(): void {
    // Clear auth token and redirect to login
    localStorage.removeItem("auth_token");
    // You can add redirect logic here
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }

  private transformError(error: AxiosError): ApiError {
    const response: any = error.response;

    return {
      message:
        response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      status: response?.status,
      code: response?.data?.code,
      errors: response?.data?.errors,
    };
  }

  // Generic HTTP methods
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Upload file method
  async uploadFile<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  // Set auth token
  setAuthToken(token: string): void {
    localStorage.setItem("auth_token", token);
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // Clear auth token
  clearAuthToken(): void {
    localStorage.removeItem("auth_token");
    delete this.client.defaults.headers.common.Authorization;
  }

  // Get raw axios instance for custom usage
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

// Create and export singleton instance
export const apiProvider = new ApiProvider();

// Export types for use in other files
export type { AxiosRequestConfig, AxiosResponse };
