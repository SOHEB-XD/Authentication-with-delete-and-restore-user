import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RestorePage } from './pages/RestorePage';
import { Dashboard } from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/restore" element={<PublicRoute><RestorePage /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
