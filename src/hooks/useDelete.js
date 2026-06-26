import { useState } from "react";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const deleteData = async (url, token = null) => {
    setLoading(true);
    setError(null);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(url, { method: "DELETE", headers });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to delete");
      return data;
    } catch (err) {
      const message = err.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;