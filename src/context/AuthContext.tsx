// // import React, { createContext, useContext, useState, ReactNode } from "react";

// // interface AuthContextType {
// //   isAuthenticated: boolean;
// //   login: () => void;
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider = ({ children }: { children: ReactNode }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   const login = () => setIsAuthenticated(true);
// //   const logout = () => setIsAuthenticated(false);

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = (): AuthContextType => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error("useAuth must be used within an AuthProvider");
// //   }
// //   return context;
// // };



// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   // initialize from localStorage
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     const stored = localStorage.getItem("isAuthenticated");
//     return stored === "true"; // fallback is false
//   });

//   // keep localStorage in sync
//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", String(isAuthenticated));
//   }, [isAuthenticated]);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

 
  //when api will be provided 

  const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("logout");
    // 🔑 Call backend API to invalidate token/session
    await fetch("/admin/auth/logout", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // if backend needs auth
      },
    });

  } catch (error) {
    console.error("Logout API failed:", error);
    // even if API fails, proceed with clearing local state
  } finally {
    // 🧹 Clear local storage & state
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
