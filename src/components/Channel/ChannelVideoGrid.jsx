import { MdOutlineVideoCall, MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import VideoCard from "../Home/VideoCard";
import ChannelVideoCard from "./ChannelVideoCard";

const ChannelVideoGrid = ({ videos, isOwner, onUploadClick, onEditClick, onDeleteClick }) => {

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <FiUpload className="text-secondary text-5xl" />
        <p className="text-secondary text-lg">No videos yet</p>
        {isOwner && (
          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 bg-[#3ea6ff] text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-[#5bb8ff] transition-colors"
          >
            <MdOutlineVideoCall className="text-xl" />
            Upload your first video
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {videos.map((video) => (
        <div key={video._id} className="flex flex-col gap-2">
          <ChannelVideoCard video={video} isOwner={isOwner} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>

        
        </div>
      ))}
    </div>
  );
};

export default ChannelVideoGrid;