import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layout
import NavigationBar from './components/Layout/NavigationBar';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import SendMoneyPage from './pages/SendMoneyPage';
import AddMoneyPage from './pages/AddMoneyPage';

// Loading Spinner Component
const LoadingSpinner = () => {
  const styles = {
    loadingAuth: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f8f9fa',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTop: '4px solid #3498db',
      animation: 'spin 1s linear infinite',
    },
  };

  // Add the keyframes animation to the document
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div style={styles.loadingAuth}>
      <div style={styles.spinner}></div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = () => {
  const { isLoggedIn, authChecked, loading } = useAuth();
  const location = useLocation();

  // Show loading while authentication is being checked
  if (!authChecked || loading) {
    return <LoadingSpinner />;
  }

  // Only redirect if we've completed the auth check and user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render the child routes within a layout
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet /> {/* Renders the matched child route component */}
      </main>
      <NavigationBar />
    </div>
  );
};

function App() {
  const { isLoggedIn, authChecked, loading } = useAuth();

  // Don't render routes until auth check is complete
  if (!authChecked) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />} />

      {/* Protected Routes - Render inside ProtectedRoute layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/send" element={<SendMoneyPage />} />
        <Route path="/add" element={<AddMoneyPage />} />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App; 