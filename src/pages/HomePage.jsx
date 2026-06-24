import VideoCard from "../components/Home/VideoCard";
import useFetch from "../hooks/useFetch";
import { useOutletContext } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import VideoCardSkeleton from "../components/Home/VideoCardSkeleton";
const categories = [
  "All",
  "React",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Express",
  "Tailwind",
  "Web Development",
  "Programming",
  "Podcasts",
];

const HomePage = () => {
  const { sidebarOpen } = useOutletContext();
  const isMobile = useIsMobile();
  const { data, loading, error } = useFetch("http://localhost:5000/api/videos");

  if (loading) {
    return (
      <div className="ml-60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6}).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="pt-20 text-center text-red-500">{error}</div>;
  }

  const videoList = data?.data || [];

  return (
    <div
      className={`pt-20 px-4 transition-[margin] duration-300 overflow-hidden ease-in-out ${
        isMobile ? "ml-0" : sidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6 pb-2 ">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`
              whitespace-nowrap
              px-3
              py-1.5
              rounded-lg
              text-sm
              font-medium
              transition-colors
              ${
                index === 0
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-black"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.map((item) => (
          <VideoCard key={item._id} video={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
