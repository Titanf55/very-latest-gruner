import { httpApiService } from "@/lib/httpClient";


interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token?: string;
  message?: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin.gruner@yopmail.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'manager.gruner@gruner.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    await delay(1000); // Simulate network delay

    const { email, password } = credentials;

    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: 'Email and password are required'
      };
    }

    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    // Generate mock token
    const token = btoa(`${user.id}-${Date.now()}`);

    // Store token in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }));

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token,
      message: 'Login successful'
    };
  },


  // async function apiForgotPassword(data: ForgotPassword) {
  // return httpApiService.fetchData({
  //   url: "/admin/forgot-password",
  //   method: "post",
  //   data,
  // });
  // }
  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    await delay(800); // Simulate network delay

    const { email } = request;

    if (!email) {
      return {
        success: false,
        message: 'Email is required'
      };
    }

    // Check if user exists
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return {
        success: false,
        message: 'No account found with this email address'
      };
    }

    // In a real app, you would send an email here
    return {
      success: true,
      message: 'Password reset link has been sent to your email address'
    };
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};