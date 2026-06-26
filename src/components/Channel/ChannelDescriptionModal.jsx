import { IoClose } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import { MdOutlineFlag } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";

const ChannelDescriptionModal = ({ channel, onClose }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (videos) => {
    const totalViews = videos?.reduce((acc, v) => acc + (v.views || 0), 0) || 0;
    if (totalViews >= 1_000_000) return (totalViews / 1_000_000).toFixed(1) + "M";
    if (totalViews >= 1_000) return (totalViews / 1_000).toFixed(1) + "K";
    return totalViews;
  };

  return (
    
    <div
      className="bg-[000000] fixed inset-0 z-50 flex items-center justify-center modal-overlay px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-stone-950 bg-modal rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className=" flex items-center justify-between px-6 py-4 modal-header">
          <h2 className="text-primary font-medium text-lg">
            {channel.channelName}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full icon-btn transition-colors"
          >
            <IoClose className="text-primary text-xl" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-4 flex flex-col gap-5 max-h-[70vh] overflow-y-auto scrollbar-hide">

          {/* Description */}
          {channel.description ? (
            <div>
              <p className="text-primary text-sm leading-relaxed whitespace-pre-wrap">
                {channel.description}
              </p>
            </div>
          ) : (
            <p className="text-secondary text-sm italic">
              No description provided.
            </p>
          )}


          {/* More Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-primary font-bold text-sm">More info</h3>

            {/* Email */}
            <div className="flex items-center gap-3">
              <MdOutlineEmail className="text-secondary text-xl flex-shrink-0" />
              <div>
                <p className="text-xs text-secondary">Email</p>
                <p className="text-sm text-primary">
                  {channel.owner?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MdOutlineLocationOn className="text-secondary text-xl flex-shrink-0" />
              <div>
                <p className="text-xs text-secondary">Location</p>
                <p className="text-sm text-primary">India</p>
              </div>
            </div>

            {/* Joined date */}
            <div className="flex items-center gap-3">
              <MdOutlineDateRange className="text-secondary text-xl flex-shrink-0" />
              <div>
                <p className="text-xs text-secondary">Joined</p>
                <p className="text-sm text-primary">
                  {formatDate(channel.createdAt)}
                </p>
              </div>
            </div>

            {/* Total views */}
            <div className="flex items-center gap-3">
              <MdOutlineVisibility className="text-secondary text-xl flex-shrink-0" />
              <div>
                <p className="text-xs text-secondary">Total views</p>
                <p className="text-sm text-primary">
                  {formatViews(channel.videos)} views
                </p>
              </div>
            </div>
          </div>


          {/* Share + Report */}
          <div className="flex items-center gap-3 pb-2">
            <button className="flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium hover-bg transition-colors flex-1 justify-center border-theme">
              <PiShareFatLight className="text-lg" />
              Share channel
            </button>
            <button className="flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium hover-bg transition-colors flex-1 justify-center border-theme">
              <MdOutlineFlag className="text-lg" />
              Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChannelDescriptionModal;