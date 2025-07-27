import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container py-4 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-4 md:mb-8">
          <div className="h-5 w-28 md:h-6 md:w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="relative mb-6 md:mb-8">
          <div className="relative bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border border-white/50">
            {/* Type Icon Skeleton */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
              <div className="h-8 w-8 md:h-9 md:w-9 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              {/* Pokemon Image Skeleton */}
              <div className="relative">
                <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              {/* Pokemon Info Skeleton */}
              <div className="text-center w-full max-w-lg">
                <div className="mb-2 md:mb-3">
                  <div className="h-8 md:h-10 w-40 md:w-48 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
                </div>

                {/* Type badges skeleton */}
                <div className="flex justify-center gap-2 mb-3 md:mb-4">
                  <div className="h-6 md:h-7 w-16 md:w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 md:h-7 w-18 md:w-24 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Stats skeleton */}
                <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-xs md:max-w-sm mx-auto mb-3 md:mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center p-2 md:p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-lg">
                      <div className="h-5 md:h-6 w-8 md:w-10 bg-gray-200 rounded mx-auto mb-1 animate-pulse"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Button skeleton */}
                <div className="h-9 md:h-10 w-48 md:w-56 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Abilities Card Skeleton */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 md:h-7 w-20 md:w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-40 md:w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 md:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl md:rounded-2xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 md:h-5 w-28 md:w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Base Stats Card Skeleton */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 md:h-7 w-24 md:w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-48 md:w-56 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 md:w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 md:h-7 w-10 md:w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-2 md:h-3 w-full bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl md:rounded-2xl">
                <div className="h-5 md:h-6 w-20 md:w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 md:h-8 w-12 md:w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Moves Card Skeleton */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 md:h-7 w-28 md:w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-52 md:w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-4 md:p-6">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 md:h-8 bg-gray-200 rounded-full animate-pulse"
                    style={{ width: `${Math.random() * 40 + 60}px` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
