import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineVideoCall, MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import VideoCard from "../components/Home/VideoCard";
import PageLoader from "../components/PageLoader";

const CATEGORIES = [
  "All", "Web Development", "JavaScript", "React", "Node.js",
  "Data Structures", "Python", "CSS", "Database",
  "DevOps", "Music", "Gaming", "News", "Sports",
];

// ── Video Form Modal ──────────────────────────────────────
const VideoFormModal = ({ channelId, video, onClose, onSaved }) => {
  const isEdit = !!video;
  const token = localStorage.getItem("yt_token");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: video?.title || "",
    description: video?.description || "",
    videoUrl: video?.videoUrl || "",
    thumbnailUrl: video?.thumbnailUrl || "",
    category: video?.category || "All",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.videoUrl.trim()) {
      toast.error("Title and Video URL are required");
      return;
    }
    setLoading(true);
    try {
      const url = isEdit
        ? `http://localhost:5000/api/videos/${video._id}`
        : "http://localhost:5000/api/videos";
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit
        ? form
        : { ...form, channelId };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? "Video updated!" : "Video uploaded!");
        onSaved(data.video, isEdit);
        onClose();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full h-11 px-4 rounded-xl border border-[#3f3f3f]
    bg-[#121212] text-white outline-none
    focus:border-[#3ea6ff] transition-colors text-sm
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg bg-[#212121] rounded-2xl shadow-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f3f]">
          <h2 className="text-white font-medium text-lg">
            {isEdit ? "Edit Video" : "Upload Video"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#3f3f3f] transition-colors"
          >
            <IoClose className="text-white text-xl" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs text-[#aaaaaa] mb-1 block">
              Title *
            </label>
            <input
              name="title"
              type="text"
              placeholder="Add a title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="text-xs text-[#aaaaaa] mb-1 block">
              Video URL *
            </label>
            <input
              name="videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={form.videoUrl}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="text-xs text-[#aaaaaa] mb-1 block">
              Thumbnail URL
            </label>
            <input
              name="thumbnailUrl"
              type="url"
              placeholder="https://img.youtube.com/vi/.../hqdefault.jpg"
              value={form.thumbnailUrl}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs text-[#aaaaaa] mb-1 block">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-[#aaaaaa] mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Tell viewers about your video"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#3f3f3f] bg-[#121212] text-white outline-none focus:border-[#3ea6ff] transition-colors text-sm resize-none"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-sm text-[#aaaaaa] hover:bg-[#3f3f3f] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-full text-sm font-medium bg-[#3ea6ff] text-black hover:bg-[#5bb8ff] transition-colors disabled:opacity-60"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Channel Page ──────────────────────────────────────────
const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("yt_token");
  const user = JSON.parse(localStorage.getItem("yt_user") || "null");

  const [videos, setVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/channel/${id}`
  );

  const channel = data?.channel;

  // ── Redirect if not logged in ─────────────
  useEffect(() => {
    if (!token) navigate("/auth");
  }, []);

  // ── Set videos from API ───────────────────
  useEffect(() => {
    if (channel?.videos) {
      setVideos(channel.videos);
    }
  }, [channel]);

  // ── Handle video saved ────────────────────
  const handleVideoSaved = (video, isEdit) => {
    if (isEdit) {
      setVideos((prev) => prev.map((v) => v._id === video._id ? video : v));
    } else {
      setVideos((prev) => [video, ...prev]);
    }
  };

  // ── Handle delete video ───────────────────
  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/videos/${videoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) => prev.filter((v) => v._id !== videoId));
        toast.success("Video deleted!");
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <PageLoader />;
  if (error) return (
    <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
      <p className="text-red-500">{error}</p>
    </div>
  );
  if (!channel) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-14">

      {/* ── Banner ── */}
      <div
        className="w-full h-36 md:h-48 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]"
        style={{
          backgroundImage: channel.channelBanner
            ? `url(${channel.channelBanner})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ── Channel Info ── */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-8 mb-6">

          {/* Avatar */}
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-[#0f0f0f] bg-red-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 overflow-hidden">
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

          {/* Name + Handle + Stats */}
          <div className="flex-1">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              {channel.channelName}
            </h1>
            <p className="text-[#aaaaaa] text-sm mt-1">
              {channel.handle}
            </p>
            <p className="text-[#aaaaaa] text-sm mt-0.5">
              {videos.length} {videos.length === 1 ? "video" : "videos"}
            </p>
            {channel.description && (
              <p className="text-[#aaaaaa] text-sm mt-2 max-w-xl line-clamp-2">
                {channel.description}
              </p>
            )}
          </div>

          {/* Upload button — owner only */}
          {user?._id === channel.owner?._id || user?.id === channel.owner?._id ? (
            <button
              onClick={() => { setEditingVideo(null); setShowVideoModal(true); }}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <MdOutlineVideoCall className="text-xl" />
              Upload video
            </button>
          ) : null}

        </div>

        {/* ── Divider ── */}
        <div className="border-b border-[#3f3f3f] mb-6">
          <button className="text-white text-sm font-medium border-b-2 border-white pb-3 px-2">
            Videos
          </button>
        </div>

        {/* ── Videos Grid ── */}
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <FiUpload className="text-[#aaaaaa] text-5xl" />
            <p className="text-[#aaaaaa] text-lg">No videos yet</p>
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-2 bg-[#3ea6ff] text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-[#5bb8ff] transition-colors"
            >
              <MdOutlineVideoCall className="text-xl" />
              Upload your first video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="flex flex-col gap-2">
                <VideoCard video={video} />

                {/* Edit / Delete buttons */}
                {(user?._id === channel.owner?._id ||
                  user?.id === channel.owner?._id) && (
                  <div className="flex gap-2 px-2">
                    <button
                      onClick={() => {
                        setEditingVideo(video);
                        setShowVideoModal(true);
                      }}
                      className="flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-lg border border-[#3f3f3f] text-[#aaaaaa] hover:bg-[#272727] hover:text-white text-xs transition-colors"
                    >
                      <MdOutlineEdit className="text-sm" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video._id)}
                      className="flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-lg border border-[#3f3f3f] text-red-400 hover:bg-red-600/10 text-xs transition-colors"
                    >
                      <MdDeleteOutline className="text-sm" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Video Modal ── */}
      {showVideoModal && (
        <VideoFormModal
          channelId={id}
          video={editingVideo}
          onClose={() => { setShowVideoModal(false); setEditingVideo(null); }}
          onSaved={handleVideoSaved}
        />
      )}

    </div>
  );
};

export default ChannelPage;