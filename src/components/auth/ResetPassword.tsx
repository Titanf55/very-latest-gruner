import React, { useState } from "react";
import { Sprout, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from '../../services/authService';


const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🔹 Normally you'd get a token from email link
  const token = searchParams.get("token") || "dummy-token";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 
const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!password || !confirmPassword) {
    setError("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setIsLoading(true);
    // 🔹 Mock API simulation
    setTimeout(() => {
      if (token === "bXlzZWNyZXQ6cGFzc3dvcmQ=") {
        setMessage("Your password has been successfully reset!");
        setTimeout(() => navigate("/login"), 2000); // redirect after success
      } else {
        setError("Invalid or expired reset link");
      }
      setIsLoading(false);
    }, 1500);


  // try {
  //   // 🔹 Call real API
  //   const response = await authService.resetPassword(token, password);

  //   if (response.success) {
  //     setMessage("Your password has been successfully reset!");
  //     setTimeout(() => navigate("/login"), 2000); // redirect after success
  //   } else {
  //     setError(response.message || "Invalid or expired reset link");
  //   }
  // } catch (error) {
  //   setError("Something went wrong. Please try again.");
  // } finally {
  //   setIsLoading(false);
  // }
};

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
};

export default ResetPassword;
