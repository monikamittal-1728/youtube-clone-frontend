const VideoCardSkeleton = () => (
  <div className="rounded-xl p-2 animate-pulse">
    {/* Thumbnail skeleton */}
    <div className="w-full aspect-video rounded-xl bg-[#cecdcd]" />

    {/* Details skeleton */}
    <div className="flex gap-3 mt-3">
      {/* Avatar skeleton */}
      <div className="w-9 h-9 rounded-full bg-[#cecdcd] flex-shrink-0" />

      {/* Text skeleton */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3 bg-[#cecdcd] rounded w-full" />
        <div className="h-3 bg-[#cecdcd] rounded w-3/4" />
        <div className="h-3 bg-[#cecdcd] rounded w-1/2 mt-1" />
      </div>
    </div>
  </div>
);

export default VideoCardSkeleton;