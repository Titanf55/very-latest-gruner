import React, { useState } from "react";
import { authService } from '../../services/authService';
import { Eye, EyeOff, Sprout, Loader2 } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  const [searchParams] = useSearchParams();

  // 🔹 Normally you'd get a token from email link
  const token = searchParams.get("token") || "bXlzZWNyZXQ6cGFzc3dvcmQ=";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


 const { login } = useAuth();
  const navigate = useNavigate()

const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
   const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
  
      try {
        // 🔑 Call API
        // const response = await authService.login({
        //   email: formData.email,
        //   password: formData.password
        // });

        //  if (response?.token) {
       
        if (formData.email === "admin@gruner.com" && formData.password === "admin123") {
           //login(response.token);
           login("bXlzZWNyZXQ6cGFzc3dvcmQ=");
              // onLogin();
             // store token and update auth context + set isAuthenticated true
            navigate("/dashboard"); // redirect to dashboard
          } else {
            setError("Invalid email or password");
          }
        // if (response.success) {
        //   onLogin();
        // } else {
        //   setError(response.message || 'Invalid email or password');
        // }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };
    // 🔹 Forgot password handler (mocked)
    const handleForgotPasswordmock = async (e: React.FormEvent) => {
      e.preventDefault();
      setResetError("");
      setResetMessage("");

      if (!validateEmail(resetEmail)) {
        setResetError("Please enter a valid email address");
        return;
      }

      setIsLoading(true);

      // Mock API simulation
      setTimeout(() => {
        if (resetEmail === "admin@gruner.com") {
          setResetMessage("Password reset link sent to your email!");
        } else {
          setResetError("Email not found. Please try again.");
        }
        setIsLoading(false);
      }, 1500);
    };

  const handleForgotPasswordapi= async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setResetError('');
      setResetMessage('');
  
      try {
        const response = await authService.forgotPassword({ email: resetEmail });
        
        if (response.success) {
          setResetMessage(response.message);
          setTimeout(() => {
            setShowForgotPassword(false);
            setResetEmail('');
            setResetMessage('');
          }, 3000);
        } else {
          setResetError(response.message);
        }
      } catch (err) {
        setResetError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
// const handleResetPassword1 = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!newPassword || !confirmPassword) {
//       setError("Please fill in all fields");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setIsLoading(true);

//     // 🔹 Mock API simulation
//     setTimeout(() => {
//       if (token === "bXlzZWNyZXQ6cGFzc3dvcmQ=") {
//         setMessage("Your password has been successfully reset!");
//         setTimeout(() => navigate("/login"), 2000); // redirect after success
//       } else {
//         setError("Invalid or expired reset link");
//       }
//       setIsLoading(false);
//     }, 1500);
//   };

      if (showForgotPassword) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
                <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
              </div>
    
              <form onSubmit={handleForgotPassword}>
                {resetError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{resetError}</p>
                  </div>
                )}
                
                {resetMessage && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-600">{resetMessage}</p>
                  </div>
                )}
    
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="admin@gruner.com"
                    required
                  />
                </div>
    
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
    
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800"
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        );
      }

      if(showResetPassword){
           return (
         <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Sprout className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleResetPassword}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
        );

      }
  return (
   
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Sprout className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Gruner's Admin</h1>
          <p className="text-gray-600 mt-2">Smart Agriculture Management System</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
            //     value={email}
            // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="admin@gruner.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-green-600 hover:text-green-700"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p>Email: admin@gruner.com</p>
          <p>Password: admin123</p>
          <p> <a href="http://localhost:5174/reset-password?token=bXlzZWNyZXQ6cGFzc3dvcmQ=" target="_blank" className="text-blue-600">Reset Password Link</a>
          </p>
        </div>
      </div>
      </div>
     
  );
};

export default Login;
