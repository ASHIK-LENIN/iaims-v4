const StatCard = ({ title, value, icon, size = "normal" }) => {
  return (
    <div className={`bg-gray-50 rounded-md ${size === "small" ? "p-2 sm:p-3" : "p-3 sm:p-4"} flex flex-col`}>
      <div className="flex items-center mb-1 sm:mb-2">
        <div className="mr-2 text-green-600">{icon}</div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <p className={`font-bold ${size === "small" ? "text-lg sm:text-xl" : "text-xl sm:text-3xl"} text-gray-900`}>
        {value}
      </p>
    </div>
  )
}

export default StatCard;
