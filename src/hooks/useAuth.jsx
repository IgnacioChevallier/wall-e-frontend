import React, { createContext, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api'; // Assuming api service exists

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken')); // Persist token
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        setUserToken(response.token);
        localStorage.setItem('userToken', response.token); // Store token
        navigate('/'); // Redirect to home on successful login
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred during login.");
      return { success: false, message: "An unexpected error occurred during login." };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(email, password);
      if (response.success) {
        // Optionally navigate to login or show success message
        navigate('/login');
        return { success: true, message: response.message }; // Let component show message
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred during registration.");
      return { success: false, message: "An unexpected error occurred during registration." };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('userToken'); // Remove token
    navigate('/login'); // Redirect to login on logout
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isLoggedIn: !!userToken,
      userToken,
      loading,
      error,
      login,
      register,
      logout,
      clearError: () => setError(null) // Function to clear errors manually if needed
    }),
    [userToken, loading, error] // Dependencies
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 