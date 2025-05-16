"use client"

import { useState, useEffect } from "react"
import { FiX, FiAlertCircle } from "react-icons/fi"
import { assetTypes, statusOptions } from "../utils/mockData"

const AddAssetModal = ({ onClose, onAddAsset, isLoading }) => {
  const [formData, setFormData] = useState({
    type: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
    status: "Active",
    assignedTo: "",
    employeeId: "",
    employeeName: "",
    group: "",
    businessImpact: "",
    assetTag: "",
    description: "",
    productName: "",
    currentStatus: "Operational",
    remarks: "",
    itPocRemarks: "",
  })

  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState("basic")

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.type) newErrors.type = "Asset type is required"
    if (!formData.model) newErrors.model = "Model is required"
    if (!formData.serialNumber) newErrors.serialNumber = "Serial number is required"
    if (!formData.purchaseDate) newErrors.purchaseDate = "Purchase date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onAddAsset(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Asset</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile tabs */}
        <div className="sm:hidden border-b border-gray-200">
          <div className="flex space-x-2 px-4">
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === "basic"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Info
            </button>
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === "details"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === "notes"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <p className="mb-4 text-sm sm:text-base text-gray-600">Enter details for the new asset</p>

            {/* Basic Info - Always visible on desktop, conditionally on mobile */}
            <div className={`${activeTab !== "basic" && "sm:block hidden"}`}>
              <h3 className="text-md font-medium text-gray-700 mb-3 sm:hidden">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Asset Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    className={`w-full px-3 py-2 border ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Select type</option>
                    {assetTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    placeholder="e.g., Dell OptiPlex 7070"
                    className={`w-full px-3 py-2 border ${
                      errors.model ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    value={formData.model}
                    onChange={handleChange}
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.model}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    placeholder="e.g., DELL7070XJ23"
                    className={`w-full px-3 py-2 border ${
                      errors.serialNumber ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    value={formData.serialNumber}
                    onChange={handleChange}
                  />
                  {errors.serialNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.serialNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    className={`w-full px-3 py-2 border ${
                      errors.purchaseDate ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    value={formData.purchaseDate}
                    onChange={handleChange}
                  />
                  {errors.purchaseDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.purchaseDate}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    id="assignedTo"
                    name="assignedTo"
                    placeholder="e.g., Front Desk"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Details - Always visible on desktop, conditionally on mobile */}
            <div className={`${activeTab !== "details" && "sm:block hidden"}`}>
              <h3 className="text-md font-medium text-gray-700 mb-3 sm:hidden">Additional Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    placeholder="e.g., EMP001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.employeeId}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    placeholder="e.g., John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.employeeName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                    Group
                  </label>
                  <input
                    type="text"
                    id="group"
                    name="group"
                    placeholder="e.g., Operations"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.group}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="businessImpact" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Impact
                  </label>
                  <select
                    id="businessImpact"
                    name="businessImpact"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.businessImpact}
                    onChange={handleChange}
                  >
                    <option value="">Select impact</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="assetTag" className="block text-sm font-medium text-gray-700 mb-1">
                    Asset Tag
                  </label>
                  <input
                    type="text"
                    id="assetTag"
                    name="assetTag"
                    placeholder="e.g., AST-PC-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.assetTag}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="e.g., Desktop Computer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    placeholder="e.g., HP EliteDesk 800 G6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Status
                  </label>
                  <input
                    type="text"
                    id="currentStatus"
                    name="currentStatus"
                    placeholder="e.g., Operational"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.currentStatus}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Notes - Always visible on desktop, conditionally on mobile */}
            <div className={`${activeTab !== "notes" && "sm:block hidden"}`}>
              <h3 className="text-md font-medium text-gray-700 mb-3 sm:hidden">Remarks and Notes</h3>
              <div className="mb-6">
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows="3"
                  placeholder="e.g., Regular maintenance done"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.remarks}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="itPocRemarks" className="block text-sm font-medium text-gray-700 mb-1">
                  IT POC Remarks
                </label>
                <textarea
                  id="itPocRemarks"
                  name="itPocRemarks"
                  rows="3"
                  placeholder="e.g., No issues reported"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.itPocRemarks}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Add Asset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAssetModal;
