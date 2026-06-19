import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar */}
        <img
          src={video.channelAvatar}
          alt={video.channelName}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />

        {/* Video Info */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-primary line-clamp-2">
            {video.title}
          </h3>

          <p className="text-sm text-secondary mt-1">{video.channelName}</p>

          <p className="text-xs text-secondary">
            {video.views} views • {video.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
