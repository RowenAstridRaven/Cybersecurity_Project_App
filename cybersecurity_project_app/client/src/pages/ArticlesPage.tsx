// client/src/pages/ArticlesPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import './ArticlesPage.css';

interface Article {
  title: string;
  link: string;
  snippet: string;
  pubDate: string;
  source: string; // differentiates articles from different feeds
}

interface Feed {
  name_of_site: string;
  endpoint: string;
}

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [postedDate, setPostedDate] = useState<string>(""); // single date filter (YYYY-MM-DD)
  const [sortOrder, setSortOrder] = useState<string>("desc"); // 'asc' or 'desc'

  // Different RSS feeds
  const feeds: Feed[] =[
    {name_of_site: 'The Hacker News', endpoint: 'hackernews'},
    {name_of_site: 'Security Magazine', endpoint: 'securitymagazine'},
    {name_of_site: 'Security Week News', endpoint: 'securityweek'},
    {name_of_site: 'Graham Cluley', endpoint: 'grahamcluley'},
    {name_of_site: 'Schneier', endpoint: 'schneier'},
    {name_of_site: 'Dark Reading RSS Feed', endpoint: 'darkreading'},
    //TO ADD article rss feed
    //{name_of_site: 'Dark Reading RSS Feed', endpoint: ''},
  ];

  useEffect(() => {
    Promise.all(
      feeds.map(feed =>
        fetch(`http://localhost:5000/api/articles/${feed.endpoint}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch articles from ${feed.name_of_site}`);
            }
            return response.json();
          })
          .then((data: Article[]) => {
            return data.map(article => {
              return { ...article, source: `${feed.name_of_site}` };
            });
          })
      )
    )
      .then(results => {
        const allArticles = results.flat();
        setArticles(allArticles);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  }, []);

  // Build a list of unique sources from the fetched articles.
  const sources = useMemo(() => {
    const uniqueSources = Array.from(new Set(articles.map(article => article.source)));
    return ["All", ...uniqueSources];
  }, [articles]);

  // Helper function to format a Date object as "YYYY-MM-DD"
  const formatDate = (dateObj: Date): string => {
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter articles based on search query, source, and posted date.
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      // Search query filter.
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.snippet.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Source filter.
      const matchesSource = selectedSource === "All" || article.source === selectedSource;

      // Posted date filter: if a date is selected, only include articles posted on that date.
      let matchesPostedDate = true;
      if (postedDate) {
        const articleDate = new Date(article.pubDate);
        const formattedArticleDate = formatDate(articleDate);
        matchesPostedDate = (formattedArticleDate === postedDate);
      }

      return matchesSearch && matchesSource && matchesPostedDate;
    });
    
    // Sort articles by publication date.
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    return filtered;
  }, [articles, searchQuery, selectedSource, postedDate, sortOrder]);

  if (loading) {
    return <div className="articles-page-container"><p>Loading articles...</p></div>;
  }
  if (error) {
    return <div className="articles-page-container"><p>Error: {error}</p></div>;
  }

  return (
    //This is the structure of the page 
    <div className="articles-page-container">
      <h1>Cybersecurity Articles</h1>
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="source-select"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          {sources.map((source, idx) => (
            <option key={idx} value={source}>
              {source}
            </option>
          ))}
        </select>
        <div className="date-filter">
          <label>
            Posted Date:
            <input
              type="date"
              value={postedDate}
              onChange={(e) => setPostedDate(e.target.value)}
            />
          </label>
        </div>
        <div className="sort-order">
          <label>
            Sort by Date:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>
      </div>
      <div className="articles-list">
        {filteredArticles.length === 0 ? (
          <p>No articles found for "{searchQuery}"</p>
        ) : (
          filteredArticles.map((article, idx) => (
            <div key={idx} className="article-card">
              <h2>{article.title}</h2>
              <p className="article-meta">
                <span className="source">{article.source}</span> |{" "}
                <span className="date">{article.pubDate}</span>
              </p>
              <p className="article-snippet">{article.snippet}</p>
              <a className="read-more" href={article.link} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
