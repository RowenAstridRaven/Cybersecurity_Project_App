// client/src/pages/SearchPage.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SearchPage.css';

interface Search_Items{
  search_name:string;
  link:string;
}

//This is for all avaliable search items
const availableItems: Search_Items[]=[
    {search_name:'Cybersecurity Information', link:'cybersecurity-info'},
    {search_name:'Articles', link:'articles'},
    {search_name:'Videos', link:'videos'},
    {search_name:'Report Bug', link:'report-bug'},
    {search_name:'Cybercrime Report', link:'cybercrime-report'},
]

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Search_Items[]>([]);

  //This is for the searching function that searches through the avaliable items
  const handleSearch = () => {
    const filtered = availableItems.filter((item) =>
    item.search_name.toLowerCase().includes(query.toLowerCase())
  );
    setResults(filtered);
  };
  //This is the code for how the page looks 
  return (
    <div className="search-page">
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        //This is for the search results
      />
      <button onClick={handleSearch}>Search</button>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((res, index) => (
            <div key={index} className="search-item">
              <NavLink to={`/${res.link}`}>{res.search_name}</NavLink>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
