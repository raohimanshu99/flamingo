export default function SkeletonCard() {
  return (
    <div className="card-dark overflow-hidden">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-12 rounded mt-2" />
        <div className="skeleton h-5 w-24 rounded mt-1" />
      </div>
    </div>
  )
}