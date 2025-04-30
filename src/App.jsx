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

// Protected Route Component
const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
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
  const { isLoggedIn } = useAuth();

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