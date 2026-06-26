const ConfirmDialog = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-[#272727] p-6 shadow-xl">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-2 text-sm text-gray-500">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;