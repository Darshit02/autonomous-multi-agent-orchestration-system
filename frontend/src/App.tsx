import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import ChatPage from "./pages/chat";
import TasksPage from "./pages/tasks";
import AgentsPage from "./pages/agents";
import SettingsPage from "./pages/settings";
import MainLayout from "./components/layout/main-layout";
import ProtectedRoute from "./components/auth/protected-route";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><MainLayout><ChatPage /></MainLayout></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><MainLayout><TasksPage /></MainLayout></ProtectedRoute>} />
        <Route path="/agents" element={<ProtectedRoute><MainLayout><AgentsPage /></MainLayout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><MainLayout><SettingsPage /></MainLayout></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
