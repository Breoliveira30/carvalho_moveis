export default function Loading() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-6 bg-amber-200 rounded w-32 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 lg:h-[500px] bg-amber-200 rounded-lg"></div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 bg-amber-200 rounded w-20"></div>
                <div className="h-8 bg-amber-200 rounded w-3/4"></div>
                <div className="h-6 bg-amber-200 rounded w-full"></div>
              </div>
              <div className="h-20 bg-amber-200 rounded"></div>
              <div className="h-12 bg-amber-200 rounded"></div>
              <div className="h-32 bg-amber-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
