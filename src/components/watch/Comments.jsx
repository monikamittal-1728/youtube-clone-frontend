import React, { useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Comments = ({ videoId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const token = localStorage.getItem("yt_token");
  const user = JSON.parse(localStorage.getItem("yt_user") || "null");

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return "Today";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    return `${Math.floor(months / 12)} years ago`;
  };

  // Add comment
  const handleAdd = async () => {
    if (!text.trim()) return;
    if (!token) return alert("Please sign in to comment");
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setComments((prev) => [data.comment, ...prev]);
        setText("");
        setIsFocused(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit comment
  const handleEdit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${videoId}/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: editText }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, text: data.comment.text } : c
          )
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${videoId}/${commentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-primary font-medium text-lg mb-4">
        {comments.length} Comments
      </h2>

      {/* Add Comment */}
      <div className="flex gap-3 mb-6">
        <BiSolidUserCircle className="text-4xl text-secondary flex-shrink-0" />
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full bg-transparent border-b border-[#3f3f3f] focus:border-primary outline-none text-sm text-primary pb-1 transition-colors"
          />
          {isFocused && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => { setIsFocused(false); setText(""); }}
                className="px-4 py-2 rounded-full text-sm text-primary hover:bg-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!text.trim()}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#3ea6ff] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5bb8ff] transition-colors"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comment List */}
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3">
            <BiSolidUserCircle className="text-4xl text-secondary flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">
                    @{comment.username}
                  </span>
                  <span className="text-xs text-secondary">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>

                {/* 3 dots — only for comment owner */}
                {user && user.username === comment.username && (
                  <div className="relative">
                    <button
                      className="p-1 rounded-full hover:bg-hover"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === comment._id ? null : comment._id
                        )
                      }
                    >
                      <BsThreeDotsVertical className="text-secondary text-sm" />
                    </button>
                    {openMenuId === comment._id && (
                      <div className="absolute right-0 top-8 z-50 bg-[#212121] border border-[#3f3f3f] rounded-xl shadow-xl w-36 py-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-hover"
                          onClick={() => {
                            setEditingId(comment._id);
                            setEditText(comment.text);
                            setOpenMenuId(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-hover"
                          onClick={() => {
                            handleDelete(comment._id);
                            setOpenMenuId(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Edit mode */}
              {editingId === comment._id ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-transparent border-b border-primary outline-none text-sm text-primary pb-1"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 rounded-full text-sm text-primary hover:bg-hover"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEdit(comment._id)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-[#3ea6ff] text-black hover:bg-[#5bb8ff]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-primary mt-1">{comment.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;