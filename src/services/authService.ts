import axios from "axios";

const api = axios.create({
  //baseURL: "https://your-backend.com/api", // ✅ change to your backend
   baseURL: "/admin/auth/", // 👈 change to your local backend
  headers: { "Content-Type": "application/json" },
});



export interface LoginPayload {
  email: string;
  password: string;
}


export const authService = {
  // login1: async (credentials: { email: string; password: string }) => {
  //   try {
  //     const res = await api.post("/login", credentials);
  //     localStorage.setItem("token", res.data.token); // store token
  //     return { success: true, data: res.data };
  //   } catch (err: any) {
  //     return {
  //       success: false,
  //       message: err.response?.data?.message || "Login failed",
  //     };
  //   }
  // },
  

  loginmock: async (credentials: { email: string; password: string }) => {
    // Mock credentials
    const mockUser = {
      email: "admin@gruner.com",
      password: "admin123",
      token: "mock-jwt-token-12345"
    };

    return new Promise<{ success: boolean; data?: any; message?: string }>((resolve) => {
      setTimeout(() => {
        if (
          credentials.email === mockUser.email &&
          credentials.password === mockUser.password
        ) {
          localStorage.setItem("token", mockUser.token);
          resolve({ success: true, data: { token: mockUser.token } });
        } else {
          resolve({ success: false, message: "Invalid email or password" });
        }
      }, 500); // simulate API delay
    });
  },


  login: async (payload: LoginPayload) => {
    const response = await fetch("/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Login request failed");
    }

    return response.json(); // expect { token: "...", user: {...} }
  },
  logout: () => {
    localStorage.removeItem("token");
  },

  forgotPassword: async (email: string) => {
    try {
      
      const res = await api.post("/forgot-password", { email },
         {
        headers: {
          "Authorization": "Basic <base64_encoded_credentials>",
          "Content-Type": "application/json",
        },
      }
      );
      return { success: true, data: res.data };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send reset email",
      };
    }
  },

 

  resetPassword: async (token: string, password: string) => {
  try {
    const res = await api.post(
      "/reset-password",
      { password }, // request body
      {
        headers: {
          "Authorization": "Basic <base64_encoded_credentials>",
          "x-reset-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: res.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to reset password",
    };
  }
},



};
