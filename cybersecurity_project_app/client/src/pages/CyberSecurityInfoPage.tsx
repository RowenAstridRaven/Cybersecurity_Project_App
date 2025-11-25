// client/src/pages/CyberSecurityInfoPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CyberSecurityInfoPage.css';

interface Topic {
  id: number;
  name: string;
}

const CyberSecurityInfoPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/cybercrime/topics')
      .then((response) => response.json())
      .then((data) => {setTopics(data)})
      .catch((error) => console.error('Failed to fetch topics:', error));
  }, []);

  return (
    <div className="cybersecurity-info-container">
      <header className="homepage-header">
        <h1>Cybersecurity Information</h1>
        <p>Your go-to application for cybersecurity resources, news, and interactive learning!</p>
      </header>
      <div className="topics-buttons">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/summary/${encodeURIComponent(topic.name)}`}
            className="topic-button"
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CyberSecurityInfoPage;