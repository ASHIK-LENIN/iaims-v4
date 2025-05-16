import { FiMonitor, FiPrinter, FiServer, FiVideo } from "react-icons/fi";
import { BiFingerprint } from "react-icons/bi"; // Import BiFingerprint from Bootstrap Icons

const AssetSummary = ({ counts }) => {
  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
      <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3">Asset Summary</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-green-100 text-green-600 mr-2">
            <FiMonitor className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Desktops</p>
            <p className="text-base sm:text-lg font-semibold">{counts.desktop || 0}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-blue-100 text-blue-600 mr-2">
            <FiMonitor className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Monitors</p>
            <p className="text-base sm:text-lg font-semibold">{counts.monitor || 0}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-purple-100 text-purple-600 mr-2">
            <FiPrinter className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Printers</p>
            <p className="text-base sm:text-lg font-semibold">{counts.printer || 0}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-yellow-100 text-yellow-600 mr-2">
            <FiServer className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Thin Clients</p>
            <p className="text-base sm:text-lg font-semibold">{counts.thinClient || 0}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-red-100 text-red-600 mr-2">
            <BiFingerprint className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Use BiFingerprint */}
          </span>
          <div>
            <p className="text-xs text-gray-500">Biometrics</p>
            <p className="text-base sm:text-lg font-semibold">{counts.biometric || 0}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-indigo-100 text-indigo-600 mr-2">
            <FiVideo className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Webcams</p>
            <p className="text-base sm:text-lg font-semibold">{counts.webcam || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;
