import React, { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";
import { useToast } from "../ToastContainer";
import ConfirmDialog from "../ConfirmDialog";

const BASE = "http://localhost:5000/api/comments";

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} years ago`;
};

const Comments = ({ videoId }) => {
  const token = localStorage.getItem("yt_token");
  const user = JSON.parse(localStorage.getItem("yt_user") || "null");
  const { showToast } = useToast();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null); // stores commentId

  // ── Fetch comments ─────────────────────────────────────────
  const { data, loading: fetchLoading } = useFetch(
    videoId ? `${BASE}/${videoId}` : null,
  );

  // ── Hooks ──────────────────────────────────────────────────
  const { postData, loading: postLoading } = usePost(`${BASE}/${videoId}`);
  const { deleteData, loading: deleteLoading } = useDelete();

  // ── Sync fetched comments ──────────────────────────────────
  useEffect(() => {
    if (data?.comments) setComments(data.comments);
  }, [data]);

  // ── Add comment ────────────────────────────────────────────
  const handleAdd = async () => {
    if (!text.trim()) return;
    if (!token) {
      showToast("Please sign in to comment", "error");
      return;
    }
    try {
      const data = await postData({ text }, token);
      if (data?.success) {
        setComments((prev) => [data.comment, ...prev]);
        setText("");
        setIsFocused(false);
        showToast("Comment added!", "success");
      } else {
        showToast(data?.message || "Failed to add comment", "error");
      }
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  // ── Step 1: open confirm dialog ────────────────────────────
  const handleDeleteClick = (commentId) => {
    setSelectedComment(commentId);
    setOpenMenuId(null);
    setShowDeleteDialog(true);
  };

  // ── Step 2: confirmed → hit API ────────────────────────────
  const handleConfirmDelete = async () => {
    try {
      await deleteData(`${BASE}/${videoId}/${selectedComment}`, token);
      setComments((prev) => prev.filter((c) => c._id !== selectedComment));
      showToast("Comment deleted!", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete comment", "error");
    } finally {
      setShowDeleteDialog(false);
      setSelectedComment(null);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-primary font-medium text-lg mb-4">
        {comments.length} Comments
      </h2>

      {/* ── Add Comment ───────────────────────────────────── */}
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
                onClick={() => {
                  setIsFocused(false);
                  setText("");
                }}
                className="px-4 py-2 rounded-full text-sm text-primary hover:bg-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!text.trim() || postLoading}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#3ea6ff] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5bb8ff] transition-colors"
              >
                {postLoading ? "Posting..." : "Comment"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Loading skeleton ───────────────────────────────── */}
      {fetchLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-[#3f3f3f] flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded bg-gray-300 dark:bg-[#3f3f3f]" />
                <div className="h-3 w-full rounded bg-gray-200 dark:bg-[#2f2f2f]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Comment List ──────────────────────────────────── */}
      {!fetchLoading && (
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
                            openMenuId === comment._id ? null : comment._id,
                          )
                        }
                      >
                        <BsThreeDotsVertical className="text-secondary text-sm" />
                      </button>

                      {openMenuId === comment._id && (
                        <div className="absolute right-0 top-8 z-50 w-40 rounded-xl border border-theme bg-primary shadow-xl p-2">
                          <button
                            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-primary hover:bg-gray-400/10 transition-colors"
                            onClick={() => {
                              setEditingId(comment._id);
                              setEditText(comment.text);
                              setOpenMenuId(null);
                            }}
                          >
                            <MdOutlineEdit className="text-lg" />
                            <span className="ml-2">Edit</span>
                          </button>

                          <button
                            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                            onClick={() => handleDeleteClick(comment._id)}
                          >
                            <MdDeleteOutline className="text-lg" />
                            <span className="ml-2">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Edit mode */}
                {editingId === comment._id ? (
                  <EditComment
                    editText={editText}
                    setEditText={setEditText}
                    commentId={comment._id}
                    videoId={videoId}
                    token={token}
                    onSaved={(updatedText) => {
                      setComments((prev) =>
                        prev.map((c) =>
                          c._id === comment._id
                            ? { ...c, text: updatedText }
                            : c,
                        ),
                      );
                      setEditingId(null);
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <p className="text-sm text-primary mt-1">{comment.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Confirm Delete Dialog ──────────────────────────── */}
      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This cannot be undone."
        loading={deleteLoading}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedComment(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ── Separate component so usePut is called at top level ────
const EditComment = ({
  editText,
  setEditText,
  commentId,
  videoId,
  token,
  onSaved,
  onCancel,
}) => {
  const { showToast } = useToast();
  const { putData, loading } = usePut(`${BASE}/${videoId}/${commentId}`);

  const handleSave = async () => {
    if (!editText.trim()) return;
    try {
      const data = await putData({ text: editText }, token);
      if (data?.success) {
        onSaved(data.comment.text);
        showToast("Comment updated!", "success");
      } else {
        showToast(data?.message || "Failed to update", "error");
      }
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  return (
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
          onClick={onCancel}
          className="px-4 py-2 rounded-full text-sm text-primary hover:bg-hover"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 rounded-full text-sm font-medium bg-[#3ea6ff] text-black hover:bg-[#5bb8ff] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Comments;
