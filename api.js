import axios from "axios"
import { mockBranches, mockSystemOverview } from "./mockData"

// Create axios instance
const api = axios.create({
  baseURL: "/api", // This will be replaced with your Django backend URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Mock API functions that will be replaced with real API calls
export const fetchBranches = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBranches)
    }, 500)
  })
}

export const fetchBranchByCode = async (branchCode) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const branch = mockBranches.find((b) => b.code === branchCode)
      if (branch) {
        resolve(branch)
      } else {
        reject(new Error("Branch not found"))
      }
    }, 500)
  })
}

export const fetchSystemOverview = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSystemOverview)
    }, 500)
  })
}

export const addAsset = async (branchCode, assetData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: assetData })
    }, 500)
  })
}

export const updateAsset = async (branchCode, assetId, assetData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { ...assetData, id: assetId } })
    }, 500)
  })
}

// Function to connect to real backend
export const connectToBackend = (baseURL) => {
  api.defaults.baseURL = baseURL

  // Replace mock functions with real API calls
  return {
    fetchBranches: async () => {
      const response = await api.get("/branches/")
      return response.data
    },
    fetchBranchByCode: async (branchCode) => {
      const response = await api.get(`/branches/${branchCode}/`)
      return response.data
    },
    fetchSystemOverview: async () => {
      const response = await api.get("/system-overview/")
      return response.data
    },
    addAsset: async (branchCode, assetData) => {
      const response = await api.post(`/branches/${branchCode}/assets/`, assetData)
      return response.data
    },
    updateAsset: async (branchCode, assetId, assetData) => {
      const response = await api.put(`/branches/${branchCode}/assets/${assetId}/`, assetData)
      return response.data
    },
  }
}

export default {
  fetchBranches,
  fetchBranchByCode,
  fetchSystemOverview,
  addAsset,
  updateAsset,
  connectToBackend,
}
