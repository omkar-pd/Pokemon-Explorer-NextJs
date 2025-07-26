export function PokemonLoadingCard({ side }: { side: "left" | "right" }) {
  const borderColor = side === "left" ? "border-blue-200" : "border-red-200"
  const bgGradient = side === "left"
    ? "bg-gradient-to-br from-blue-50 to-blue-100"
    : "bg-gradient-to-br from-red-50 to-red-100"
  const spinnerColor = side === "left" ? "border-t-blue-500" : "border-t-red-500"

  return (
    <div className={`${bgGradient} rounded-xl sm:rounded-2xl border-2 ${borderColor} p-4 sm:p-6 h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden flex flex-col`}>
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 sm:h-6 w-12 sm:w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Pokemon Image Skeleton */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Types Skeleton */}
      <div className="flex justify-center gap-2 mb-4 sm:mb-6">
        <div className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Physical Stats Skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white/60 rounded-lg p-2 sm:p-3 text-center">
          <div className="h-6 sm:h-8 w-8 sm:w-12 bg-gray-200 rounded mx-auto mb-1 sm:mb-2 animate-pulse"></div>
          <div className="h-3 sm:h-4 w-8 sm:w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="bg-white/60 rounded-lg p-2 sm:p-3 text-center">
          <div className="h-6 sm:h-8 w-8 sm:w-12 bg-gray-200 rounded mx-auto mb-1 sm:mb-2 animate-pulse"></div>
          <div className="h-3 sm:h-4 w-8 sm:w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Base Stats Skeleton - Full stats */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
        <div className="h-4 sm:h-5 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-3 sm:h-4 w-6 sm:w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="text-center mt-auto">
        <div className="inline-flex items-center gap-2 text-gray-600 font-medium text-sm">
          <div className={`w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 ${spinnerColor} rounded-full animate-spin`}></div>
          Loading...
        </div>
      </div>
    </div>
  )
}
