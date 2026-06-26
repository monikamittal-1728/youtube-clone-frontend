import { useOutletContext, useSearchParams } from "react-router-dom";
import VideoCard from "../components/Home/VideoCard";
import useFetch from "../hooks/useFetch";
import useIsMobile from "../hooks/useIsMobile";
import VideoCardSkeleton from "../components/Home/VideoCardSkeleton";
import CategoryPills from "../components/Home/CategoryPills";

const categories = [
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
  "MongoDB",
  "Express",
  "Tailwind",
  "Programming",
  "Podcasts",
];

const BASE = "http://localhost:5000/api/videos";

const HomePage = () => {
  const { sidebarOpen } = useOutletContext();
  const isMobile = useIsMobile();

  // ── Both search and category live in the URL now ───────────
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "All";

  // ── Update category in URL ─────────────────────────────────
  const handleCategoryChange = (cat) => {
    setSearchParams(cat === "All" ? {} : { category: cat });
  };

  // ── Build API URL ──────────────────────────────────────────
  const apiUrl = (() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (activeCategory !== "All") params.set("category", activeCategory);
    const qs = params.toString();
    return qs ? `${BASE}?${qs}` : BASE;
  })();

  const { data, loading, error } = useFetch(apiUrl);
  const videoList = data?.data || [];

  return (
    <div
      className={`pt-20 px-4 transition-[margin] duration-300 overflow-hidden ease-in-out ${
        isMobile ? "ml-0" : sidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      {/* ── Search result label ───────────────────────────── */}
      {searchQuery && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Showing results for{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            "{searchQuery}"
          </span>
        </p>
      )}

      {/* ── Category Pills ────────────────────────────────── */}
      <CategoryPills
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
      />

      {/* ── Loading ───────────────────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Error ─────────────────────────────────────────── */}
      {error && !loading && (
        <div className="pt-20 text-center text-red-500">{error}</div>
      )}

      {/* ── Empty state ───────────────────────────────────── */}
      {!loading && !error && videoList.length === 0 && (
        <div className="pt-20 text-center text-gray-400 dark:text-gray-500">
          <p className="text-lg font-medium">No videos found</p>
          <p className="text-sm mt-1">
            {searchQuery ? (
              <>
                No results for{" "}
                <span className="font-semibold">"{searchQuery}"</span>
              </>
            ) : (
              <>
                No videos in{" "}
                <span className="font-semibold">"{activeCategory}"</span> yet
              </>
            )}
          </p>
        </div>
      )}

      {/* ── Videos ───────────────────────────────────────── */}
      {!loading && !error && videoList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((item) => (
            <VideoCard key={item._id} video={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
