"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useStore } from "../store/store"
import { FiPackage, FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi"

const Header = () => {
  const { user, logout, isAdmin } = useStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Add shadow to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`bg-white fixed top-0 left-0 right-0 z-10 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-green-600 font-bold text-xl">
              <FiPackage className="mr-2" />
              <span className="hidden sm:inline">iAIMS.v1</span>
              <span className="sm:hidden">AT</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link to="/reports" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Reports
            </Link>

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="ml-2 text-gray-700">{isAdmin ? "Admin User" : "Regular User"}</span>
                  <svg
                    className="ml-1 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-xs text-gray-500">Logged in as</div>
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{user?.name || "User"}</div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - slide down animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-inner bg-gray-50">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/reports"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Reports
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                <FiUser className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{user?.name || "User"}</div>
              <div className="text-sm font-medium text-gray-500">{isAdmin ? "Admin" : "User"}</div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <button
              onClick={() => {
                logout()
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FiLogOut className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
