import { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const CATEGORIES = [
  "All",
  "Web Development",
  "JavaScript",
  "React",
  "Node.js",
  "Data Structures",
  "Python",
  "CSS",
  "Database",
  "DevOps",
  "Music",
  "Gaming",
  "News",
  "Sports",
];

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
      const body = isEdit ? form : { ...form, channelId };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEdit ? "Edit Video" : "Upload Video"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Title *
            </label>

            <input
              name="title"
              type="text"
              placeholder="Add a title"
              value={form.title}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#3ea6ff] transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Video URL *
            </label>

            <input
              name="videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={form.videoUrl}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#3ea6ff] transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Thumbnail URL
            </label>

            <input
              name="thumbnailUrl"
              type="url"
              placeholder="https://img.youtube.com/vi/.../hqdefault.jpg"
              value={form.thumbnailUrl}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#3ea6ff] transition-colors text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-white outline-none focus:border-[#3ea6ff] transition-colors text-sm cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Tell viewers about your video"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#3ea6ff] transition-colors text-sm resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-full text-sm font-medium bg-[#3ea6ff] text-black hover:bg-[#5bb8ff] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoFormModal;
