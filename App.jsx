"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useStore } from "./store/store.js"
import LoginPage from "./pages/LoginPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx";
import BranchDetailsPage from "./pages/BranchDetailsPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Layout from "./components/Layout.jsx"

function App() {
  const { checkAuth } = useStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/branch/:branchCode"
          element={
            <ProtectedRoute>
              <Layout>
                <BranchDetailsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
