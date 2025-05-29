import React, {createContext, useState, useContext, useMemo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLogin} from './useLogin';
import {useRegister} from './useRegister';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const {login: loginUser, loading: loginLoading, error: loginError} = useLogin();
    const {register: registerUser, loading: registerLoading, error: registerError} = useRegister();

    
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/auth/check-auth', {
                    credentials: 'include',
                });
                
                setIsAuthenticated(response.ok);
            } catch (err) {
                setIsAuthenticated(false);
                console.error('Auth check error:', err);
            } finally {
                setAuthChecked(true);
                setLoading(false);
            }
        };
        
        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setIsAuthenticated(false);
            setJustLoggedIn(false);
            setLoading(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (justLoggedIn && isAuthenticated) {
            navigate('/');
            setJustLoggedIn(false);
        }
    }, [justLoggedIn, isAuthenticated, navigate]);

    const value = useMemo(
        () => ({
            isLoggedIn: isAuthenticated,
            authChecked,
            loading: loading || loginLoading || registerLoading,
            error: error || loginError || registerError,
            login,
            register,
            logout,
            clearError: () => setError(null),
        }),
        [isAuthenticated, authChecked, loading, loginLoading, registerLoading, error, loginError, registerError]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};