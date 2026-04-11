import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import CodeGeneratorPage from './pages/CodeGeneratorPage.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pricing" element={<Navigate to="/" state={{ scrollToPricing: true }} replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar />
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/generate"
        element={
          <ProtectedRoute>
            <Navbar />
            <CodeGeneratorPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/builder/:projectId"
        element={
          <ProtectedRoute>
            <Navbar />
            <BuilderPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
