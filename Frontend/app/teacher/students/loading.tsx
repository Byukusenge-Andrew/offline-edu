export default function StudentsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                <div>
                  <div className="w-48 h-5 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                  <div>
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Card Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-10 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Student Cards Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                    <div>
                      <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j}>
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1" />
                      <div className="w-full h-2 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
