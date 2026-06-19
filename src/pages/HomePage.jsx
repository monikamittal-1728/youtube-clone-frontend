import VideoCard from "../components/VideoCard";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5000/api/videos"
  );

  if (loading) {
    return (
      <div className="pt-20 text-center">
        Loading videos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  const videoList = data?.data || [];

  return (
    <div className="pt-20 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videoList.map((item) => (
          <VideoCard
            key={item._id}
            video={item}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;