import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container py-8 md:py-12">
        {/* Hero Section Skeleton */}
        <div className="relative mb-8">
          <div className="relative bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Pokemon Image Skeleton */}
              <div className="relative">
                <div className="h-48 w-48 md:h-64 md:w-64 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              
              {/* Pokemon Info Skeleton */}
              <div className="text-center md:text-left w-full">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="h-12 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                
                {/* Type badges skeleton */}
                <div className="flex justify-center md:justify-start gap-3 mb-6">
                  <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                
                {/* Stats skeleton */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
                      <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Abilities Card Skeleton */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Base Stats Card Skeleton */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6 space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              ))}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Moves Card Skeleton */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-full animate-pulse"
                    style={{ width: `${Math.random() * 60 + 80}px` }}
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
