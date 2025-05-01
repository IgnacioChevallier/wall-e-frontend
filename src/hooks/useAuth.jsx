import React, {createContext, useState, useContext, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLogin} from './useLogin';
import {useRegister} from './useRegister';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken')); // Persist token
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {login: loginUser, loading: loginLoading, error: loginError} = useLogin();
    const {register: registerUser, loading: registerLoading, error: registerError} = useRegister();

    const login = async (email, password) => {
        try {
            const response = await loginUser(email, password);
            if (response.success) {
                setUserToken(response.data.token);
                localStorage.setItem('userToken', response.data.token); // Store token
                navigate('/'); // Redirect to home on successful login
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
                navigate('/login'); // Redirect to login on successful registration
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
            loading: loginLoading || registerLoading,
            error: error || loginError || registerError,
            login,
            register,
            logout,
            clearError: () => setError(null), // Function to clear errors manually if needed
        }),
        [userToken, loginLoading, registerLoading, error, loginError, registerError] // Dependencies
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