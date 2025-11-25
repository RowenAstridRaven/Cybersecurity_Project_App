// client/src/pages/SummaryPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SummaryPage.css';

interface SummaryContent {
  name: string;
  description: string;
  video_link: string;
  additional_info: string;
}

const SummaryPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [content, setContent] = useState<SummaryContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper to embed YouTube links properly.
  const getEmbedUrl = (videoUrl: string) => {
    try {
      const url = new URL(videoUrl);
      // Handle full YouTube URL (e.g. https://www.youtube.com/watch?v=VIDEO_ID)
      if (url.hostname.includes('youtube.com')) {
        const videoId = url.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
      }
      // Handle youtu.be short links.
      if (url.hostname.includes('youtu.be')) {
        const videoId = url.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return videoUrl;
    } catch (error) {
      return videoUrl;
    }
  };

  useEffect(() => {
    if (!topic) {                                      // Check if topic exists
      setError('No topic provided.');
      return;
    }
    
    fetch(`http://localhost:5000/api/cybercrime/summary/${encodeURIComponent(topic)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setContent(data);
        }
      })
      .catch(() => setError('Failed to fetch cybersecurity details'));
  }, [topic]);

  if (error) {
    return (
      <div className="summary-container">
        <div className="header-container">
          <Link to="/cybersecurity-info" className="back-button">
            Back to Cybersecurity Info
          </Link>
          <h1 className="page-title">Summary</h1>
        </div>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <div className="header-container">
        <Link to="/cybersecurity-info" className="back-button">
          Back to Cybersecurity Info
        </Link>
        <h1 className="page-title">{content ? `${content.name} Summary` : "Loading..."}</h1>
      </div>
      {content ? (
        <>
          <p className="summary-text">{content.description}</p>
          <h3>Examples:</h3>
          <p>{content.additional_info}</p>
          <h3>Video Resource:</h3>
          <div className="video-container">
            <iframe 
              src={getEmbedUrl(content.video_link)} 
              title="Video Resource" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default SummaryPage;
