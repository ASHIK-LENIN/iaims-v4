"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBranches, fetchSystemOverview } from "../utils/api";
import {
  FiSearch,
  FiDatabase,
  FiMonitor,
  FiPrinter,
  FiServer,
  FiVideo,
  FiAlertCircle,
} from "react-icons/fi";
import { BiFingerprint } from "react-icons/bi";
import BranchCard from "../components/BranchCard";
import StatCard from "../components/StatCard";

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  const { data: branches, isLoading: branchesLoading, error: branchesError } = useQuery({
    queryKey: ["branches"],
    queryFn: fetchBranches,
  });

  const {
    data: systemOverview,
    isLoading: overviewLoading,
    error: overviewError,
  } = useQuery({
    queryKey: ["systemOverview"],
    queryFn: fetchSystemOverview,
  });

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
    } else {
      setSearchError("Branch not found");
    }
  };

  const recentBranches = branches?.slice(0, 4) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Branch Search Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Branch Search</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">Enter a branch code to view and manage its assets</p>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Branches Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Recent Branches</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Quickly access recently viewed branches</p>

          {branchesLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : branchesError ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">Error loading branches. Please try again later.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBranches.length > 0 ? (
                recentBranches.map((branch) => <BranchCard key={branch.id} branch={branch} />)
              ) : (
                <p className="text-gray-500 text-center py-8">No recent branches found</p>
              )}
            </div>
          )}
        </div>

        {/* System Overview Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">System Overview</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Current inventory status across all branches</p>

          {overviewLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : overviewError ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">Error loading system overview. Please try again later.</p>
                </div>
              </div>
            </div>
          ) : (
            systemOverview && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <StatCard
                    title="Total Branches"
                    value={systemOverview.totalBranches.toLocaleString()}
                    icon={<FiDatabase className="h-6 w-6" />}
                  />
                  <StatCard
                    title="Total Assets"
                    value={systemOverview.totalAssets.toLocaleString()}
                    icon={<FiServer className="h-6 w-6" />}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard
                    title="Desktops"
                    value={systemOverview.assetCounts.desktops.toLocaleString()}
                    icon={<FiMonitor className="h-5 w-5" />}
                    size="small"
                  />
                  <StatCard
                    title="Monitors"
                    value={systemOverview.assetCounts.monitors.toLocaleString()}
                    icon={<FiMonitor className="h-5 w-5" />}
                    size="small"
                  />
                  <StatCard
                    title="Printers"
                    value={systemOverview.assetCounts.printers.toLocaleString()}
                    icon={<FiPrinter className="h-5 w-5" />}
                    size="small"
                  />
                  <StatCard
                    title="Thin Clients"
                    value={systemOverview.assetCounts.thinClients.toLocaleString()}
                    icon={<FiServer className="h-5 w-5" />}
                    size="small"
                  />
                  <StatCard
                    title="Biometrics"
                    value={systemOverview.assetCounts.biometrics.toLocaleString()}
                    icon={<BiFingerprint className="h-5 w-5" />}
                    size="small"
                  />
                  <StatCard
                    title="Webcams"
                    value={systemOverview.assetCounts.webcams.toLocaleString()}
                    icon={<FiVideo className="h-5 w-5" />}
                    size="small"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
