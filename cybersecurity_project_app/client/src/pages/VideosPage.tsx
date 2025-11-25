// client/src/pages/VideosPage.tsx
import React, { useState, useEffect } from "react";
import "./VideosPage.css";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const VideosPage: React.FC = () => {
  // the search query defaults to "cybersecurity" (feel free to adjust as desired)
  const [searchQuery, setSearchQuery] = useState<string>("cybersecurity");
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Note: Ensure you have added REACT_APP_YOUTUBE_API_KEY in your .env file
  const API_KEY = "API_KEY";

  const fetchVideos = async () => {
    setLoading(true);
    setError("");
    try {
      // Construct the YouTube Search API URL
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
        searchQuery
      )}&key=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await res.json();
      const videosData: Video[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url
      }));
      setVideos(videosData);
      // Optionally select the first video by default.
      if (videosData.length > 0) {
        setSelectedVideoId(videosData[0].id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos when the component mounts (or when searchQuery changes)
  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <div className="videos-page-container">
      <h1>Cybersecurity Videos</h1>
      
      <form onSubmit={handleSearchSubmit} className="video-search-form">
        <input
          type="text"
          className="video-search-input"
          placeholder="Search for cybersecurity videos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="video-search-button">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading videos...</p>}
      <div className='video-player-container'>
        {/* Display the embedded YouTube player if a video has been selected */}
        {selectedVideoId && (
          <div className="video-player">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Selected Video"
            ></iframe>
          </div>
        )}
        
        {/* List of video results */}
        <div className="videos-list">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-item"
              onClick={() => setSelectedVideoId(video.id)}
            >
              <img src={video.thumbnail} alt={video.title} />
              <p>{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
