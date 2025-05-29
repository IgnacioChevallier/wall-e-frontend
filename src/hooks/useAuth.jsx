import React, {createContext, useState, useContext, useMemo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLogin} from './useLogin';
import {useRegister} from './useRegister';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const {login: loginUser, loading: loginLoading, error: loginError} = useLogin();
    const {register: registerUser, loading: registerLoading, error: registerError} = useRegister();

    
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/check-auth', {
                    credentials: 'include',
                });
                
                setIsAuthenticated(response.ok);
            } catch (err) {
                setIsAuthenticated(false);
                console.error('Auth check error:', err);
            }
        };
        
        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginUser(email, password);
            if (response.success) {
                setIsAuthenticated(true);
                setJustLoggedIn(true);
                return {success: true};
            } else {
                setError(response.message);
                return {success: false, message: response.message};
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred during login.');
            return {success: false, message: 'An unexpected error occurred during login.'};
        }
    };

    const register = async (email, password) => {
        try {
            const response = await registerUser(email, password);
            if (response.success) {
                navigate('/login');
                return {success: true, message: response.message};
            } else {
                setError(response.message);
                return {success: false, message: response.message};
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An unexpected error occurred during registration.');
            return {success: false, message: 'An unexpected error occurred during registration.'};
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include', // Important for cookies
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setIsAuthenticated(false);
            setJustLoggedIn(false);
            navigate('/login');
        }
    };

    // Effect to handle navigation after login
    useEffect(() => {
        if (justLoggedIn && isAuthenticated) {
            navigate('/'); // Redirect to home
            setJustLoggedIn(false); // Reset the flag
        }
    }, [justLoggedIn, isAuthenticated, navigate]);

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            isLoggedIn: isAuthenticated,
            loading: loginLoading || registerLoading,
            error: error || loginError || registerError,
            login,
            register,
            logout,
            clearError: () => setError(null), // Function to clear errors manually if needed
        }),
        [isAuthenticated, loginLoading, registerLoading, error, loginError, registerError] // Dependencies
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