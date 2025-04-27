import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogFeed from "./components/BlogFeed";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contex/authContex";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
