import { create } from "zustand"
import { mockUsers } from "../utils/mockData"

const useStore = create((set, get) => ({
  // Auth state
  user: null,
  isAuthenticated: false,
  isAdmin: false,

  // Login function
  login: (username, password) => {
    const user = mockUsers.find((user) => user.username === username && user.password === password)

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      set({
        user,
        isAuthenticated: true,
        isAdmin: user.role === "admin",
      })
      return true
    }
    return false
  },

  // Check if user is authenticated
  checkAuth: () => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      set({
        user,
        isAuthenticated: true,
        isAdmin: user.role === "admin",
      })
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("user")
    set({ user: null, isAuthenticated: false, isAdmin: false })
  },

  // Current branch
  currentBranch: null,
  setCurrentBranch: (branch) => set({ currentBranch: branch }),

  // Asset management
  addAsset: (branchCode, newAsset) => {
    set((state) => {
      const updatedBranches = state.branches.map((branch) => {
        if (branch.code === branchCode) {
          return {
            ...branch,
            assets: [...branch.assets, newAsset],
          }
        }
        return branch
      })

      return { branches: updatedBranches }
    })
  },

  updateAsset: (branchCode, assetId, updatedFields) => {
    set((state) => {
      const updatedBranches = state.branches.map((branch) => {
        if (branch.code === branchCode) {
          return {
            ...branch,
            assets: branch.assets.map((asset) => (asset.id === assetId ? { ...asset, ...updatedFields } : asset)),
          }
        }
        return branch
      })

      return { branches: updatedBranches }
    })
  },
}))

export { useStore }
