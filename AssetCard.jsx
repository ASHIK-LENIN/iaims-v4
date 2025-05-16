"use client"

import { FiMoreVertical } from "react-icons/fi"

const AssetCard = ({ asset, onEditAsset }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{asset.id}</h3>
          <p className="text-sm text-gray-500">
            {asset.type} - {asset.model}
          </p>
        </div>
        <button onClick={() => onEditAsset(asset)} className="text-green-600 hover:text-green-900">
          <FiMoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <p className="text-xs text-gray-500">Serial Number</p>
          <p className="text-sm">{asset.serialNumber}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Purchase Date</p>
          <p className="text-sm">{asset.purchaseDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Status</p>
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
        </div>
        <div>
          <p className="text-xs text-gray-500">Assigned To</p>
          <p className="text-sm">{asset.assignedTo || "—"}</p>
        </div>
      </div>
    </div>
  )
}

export default AssetCard;
