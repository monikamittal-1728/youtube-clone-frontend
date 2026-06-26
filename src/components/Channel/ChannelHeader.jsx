import { useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import ChannelDescriptionModal from "./ChannelDescriptionModal";

const ChannelHeader = ({ channel, videosCount, isOwner, onUploadClick }) => {
  const [showDescModal, setShowDescModal] = useState(false);
  return (
    <>
      {/* Banner */}
      <div
        className="max-w-[1280px] mx-auto mt-4 h-40 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-r from-[#1a1a2e] to-[#16213e]"
        style={{
          backgroundImage: channel.channelBanner
            ? `url(${channel.channelBanner})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Channel Content */}
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 py-6 mb-2">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden bg-red-600 flex items-center justify-center text-white text-4xl font-bold">
              {channel.channelAvatar ? (
                <img
                  src={channel.channelAvatar}
                  alt={channel.channelName}
                  className="w-full h-full object-cover"
                />
              ) : (
                channel.channelName?.[0]?.toUpperCase()
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {channel.channelName}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-stone-950 dark:text-white font-semibold">
                {channel.handle}
              </span>
              <span>•</span>
              <span>
                {videosCount} {videosCount === 1 ? "video" : "videos"}
              </span>
            </div>

            {/* Description — clickable */}
            {channel.description && (
              <div
                onClick={() => setShowDescModal(true)}
                className="flex items-baseline  text-sm  cursor-pointer "
              >
                <p className="text-secondary  mt-2 max-w-60 line-clamp-1 hover:text-primary transition-colors">
                  {channel.description}
                </p>
                <span className="text-primary  font-semibold ml-1">
                  ...more
                </span>
              </div>
            )}

            {isOwner && (
              <button
                onClick={onUploadClick}
                className="mt-4 w-fit flex items-center gap-2 rounded-full bg-gray-200   dark:bg-black px-5 py-2.5 text-sm font-medium text-stone-950 dark:text-white hover:bg-gray-300 dark:hover:bg-[#272727] transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <MdOutlineVideoCall className="text-xl" />
                Upload video
              </button>
            )}
          </div>
        </div>
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-[#3f3f3f] font-semibold">
          <button className=" px-3 pb-3 text-sm font-medium text-gray-500 dark:text-white">
            Home
          </button>
          <button className="border-b-2 border-black dark:border-white px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
            Videos
          </button>
          <button className=" px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
            Shorts
          </button>
          <button className="px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
            PlayList
          </button>
        </div>
      </div>

      {/* Description Modal */}
      {showDescModal && (
        <ChannelDescriptionModal
          channel={channel}
          onClose={() => setShowDescModal(false)}
        />
      )}
    </>
  );
};

export default ChannelHeader;
