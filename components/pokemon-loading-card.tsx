export function PokemonLoadingCard({ side }: { side: "left" | "right" }) {
  const sideColor = side === "left" ? "blue" : "red"
  const borderColor = side === "left" ? "border-blue-200" : "border-red-200"
  const bgGradient = side === "left"
    ? "bg-gradient-to-br from-blue-50 to-blue-100"
    : "bg-gradient-to-br from-red-50 to-red-100"

  return (
    <div className={`${bgGradient} rounded-2xl border-2 ${borderColor} p-6 h-[500px]`}>
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Pokemon Image Skeleton */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Types Skeleton */}
      <div className="flex justify-center gap-2 mb-6">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Physical Stats Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/60 rounded-lg p-3 text-center">
          <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="bg-white/60 rounded-lg p-3 text-center">
          <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Base Stats Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 text-${sideColor}-600 font-medium`}>
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          Loading Pokémon...
        </div>
      </div>
    </div>
  )
}
