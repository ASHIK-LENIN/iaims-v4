"use client"

import { useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import AssetCard from "./AssetCard"

const AssetTable = ({ assets, onEditAsset, isAdmin }) => {
  const [activeTab, setActiveTab] = useState("All Assets")

  // Filter assets based on active tab
  const filteredAssets = assets.filter((asset) => {
    if (activeTab === "All Assets") return true
    return asset.type === activeTab.slice(0, -1) // Remove 's' from tab name
  })

  const tabs = ["All Assets", "Desktops", "Monitors", "Printers", "Other"]

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile view */}
      <div className="md:hidden mt-4">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => <AssetCard key={asset.id} asset={asset} onEditAsset={onEditAsset} />)
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">No assets found</div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Asset ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Model
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Serial Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Purchase Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.purchaseDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        asset.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : asset.status === "Under Repair"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.assignedTo || "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => onEditAsset(asset)} className="text-green-600 hover:text-green-900">
                      <span className="sr-only">Edit</span>
                      <FiMoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AssetTable
