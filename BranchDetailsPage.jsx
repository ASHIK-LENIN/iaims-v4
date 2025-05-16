
"use client";

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBranchByCode, addAsset, updateAsset, fetchBranches } from "../utils/api";
import { useStore } from "../store/store";
import { FiArrowLeft, FiPlus, FiAlertCircle, FiSearch } from "react-icons/fi";
import AssetTable from "../components/AssetTable";
import AddAssetModal from "../components/AddAssetModal";
import UpdateAssetModal from "../components/UpdateAssetModal";
import AssetSummary from "../components/AssetSummary";

const BranchDetailsPage = () => {
  const { branchCode } = useParams();
  const { isAdmin } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: branch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["branch", branchCode],
    queryFn: () => fetchBranchByCode(branchCode),
    enabled: !!branchCode,
    retry: 1,
  });

  const { data: branches, isLoading: branchesLoading, error: branchesError } = useQuery({
    queryKey: ["branches"],
    queryFn: fetchBranches,
  });

  const addAssetMutation = useMutation({
    mutationFn: (newAsset) => addAsset(branchCode, newAsset),
    onSuccess: () => {
      queryClient.invalidateQueries(["branch", branchCode]);
      setShowAddModal(false);
    },
  });

  const updateAssetMutation = useMutation({
    mutationFn: ({ assetId, assetData }) => updateAsset(branchCode, assetId, assetData),
    onSuccess: () => {
      queryClient.invalidateQueries(["branch", branchCode]);
      setShowUpdateModal(false);
      setSelectedAsset(null);
    },
  });

  const handleAddAsset = (assetData) => {
    const assetType = assetData.type.substring(0, 3).toUpperCase();
    const existingAssets = branch.assets.filter((a) => a.type === assetData.type);
    const assetNumber = (existingAssets.length + 1).toString().padStart(3, "0");
    const assetId = `${branchCode}-${assetType}-${assetNumber}`;

    const newAsset = {
      ...assetData,
      id: assetId,
      branchCode,
    };

    addAssetMutation.mutate(newAsset);
  };

  const handleUpdateAsset = (assetData) => {
    updateAssetMutation.mutate({
      assetId: selectedAsset.id,
      assetData: {
        ...selectedAsset,
        ...assetData,
      },
    });
  };

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setShowUpdateModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery) {
      setSearchError("Please enter a branch code");
      return;
    }

    if (searchQuery.length < 3) {
      setSearchError("Branch code should be at least 3 digits");
      return;
    }

    const branch = branches?.find((b) => b.code === searchQuery);
    if (branch) {
      navigate(`/branch/${searchQuery}`);
      setSearchQuery("");
      setSearchError("");
    } else {
      setSearchError("Branch not found");
    }
  };

  const getAssetCounts = () => {
    if (!branch?.assets) return {};

    const counts = {
      total: branch.assets.length,
      desktop: 0,
      monitor: 0,
      printer: 0,
      thinClient: 0,
      biometric: 0,
      webcam: 0,
    };

    branch.assets.forEach((asset) => {
      const type = asset.type.toLowerCase();
      if (counts.hasOwnProperty(type)) {
        counts[type]++;
      }
    });

    return counts;
  };

  const assetCounts = getAssetCounts();

  if (isLoading || branchesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || branchesError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error loading branch details. Branch may not exist.</p>
            <p className="mt-2">
              <Link to="/" className="text-red-700 hover:text-red-600 font-medium">
                Return to Dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">

<div className="text-left mb-4">
  <Link
    to="/"
    className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 inline-flex items-center"
  >
    <FiArrowLeft className="mr-2 h-4 w-4" />
    Back to Dashboard
  </Link>
</div>
      {/* Branch Search Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Branch Search</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">Enter a branch code to view and manage its assets</p> */}

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter branch code (e.g., BR001)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError("");
              }}
            />
            {searchError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" /> {searchError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
          >
            <FiSearch className="mr-2" />
            Search Branch
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Branch {branch.name}</h1>
            <p className="text-gray-600">Code: {branch.code}</p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
            >
              <FiPlus className="mr-2" />
              Add New Asset
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Branch Name</h3>
            <p className="mt-1 text-base sm:text-lg font-semibold text-gray-900">{branch.name}</p>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">IT POC Name</h3>
            <p className="mt-1 text-base sm:text-lg font-semibold text-gray-900">{branch.itPocName}</p>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Contact Number</h3>
            <p className="mt-1 text-base sm:text-lg font-semibold text-gray-900">{branch.contactNumber}</p>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Assets</h3>
            <p className="mt-1 text-base sm:text-lg font-semibold text-gray-900">{assetCounts.total}</p>
          </div>
        </div>

        <AssetSummary counts={assetCounts} />

        <div className="mt-6">
          <AssetTable assets={branch.assets} onEditAsset={handleEditAsset} isAdmin={isAdmin} />
        </div>
      </div>

      {showAddModal && (
        <AddAssetModal
          onClose={() => setShowAddModal(false)}
          onAddAsset={handleAddAsset}
          isLoading={addAssetMutation.isLoading}
        />
      )}

      {showUpdateModal && selectedAsset && (
        <UpdateAssetModal
          asset={selectedAsset}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedAsset(null);
          }}
          onUpdateAsset={handleUpdateAsset}
          isLoading={updateAssetMutation.isLoading}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default BranchDetailsPage;
