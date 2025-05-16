import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"

const BranchCard = ({ branch }) => {
  return (
    <Link
      to={`/branch/${branch.code}`}
      className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
          <p className="text-sm text-gray-500">{branch.code}</p>
        </div>
        <FiChevronRight className="text-gray-400" />
      </div>
    </Link>
  )
}

export default BranchCard
