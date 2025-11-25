// client/src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

//Imports all icons located in navBarIcons folder to use for navigation bar
import cyberinfoicon from '../components/navBarIcons/Info_W.svg';
import searchicon from '../components/navBarIcons/Search_W.svg';
import articleicon from '../components/navBarIcons/News_W.svg';
import videoicon from '../components/navBarIcons/Video_W.svg';
import reportbugicon from '../components/navBarIcons/Bug_W.svg';
import reportcyber from '../components/navBarIcons/Report_W.svg';
//To icon
//import icon_name from '../components/navBarIcons/file_name_And_file_extension'

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Cybersecurity App</h1>
        <p>Your go-to application for cybersecurity resources, news, and interactive learning!</p>
      </header>
      <div className="buttons-container">
        <Link to="/cybersecurity-info">
          <button className="button">
            <img src={cyberinfoicon} className="default-icon"/>
            <span className="hover-text">What Is Cyber Security?</span>
          </button>
        </Link>
        <Link to="/search">
          <button className="button">
            <img src={searchicon} className="default-icon"/>
            <span className="hover-text">Search Through App</span>
          </button>
        </Link>
        <Link to="/articles">
          <button className="button">
            <img src={articleicon} className="default-icon"/>
            <span className="hover-text">Articles</span>
          </button>
        </Link>
        <Link to="/videos">
          <button className="button">
            <img src={videoicon} className="default-icon"/>
            <span className="hover-text">Videos</span>
          </button>
        </Link>
        <Link to="/report-bug">
          <button className="button">
            <img src={reportbugicon} className="default-icon"/>
            <span className="hover-text">Report a Bug</span>
          </button>
        </Link>
        <Link to="/cybercrime-report">
          <button className="button">
            <img src={reportcyber} className="default-icon"/>
            <span className="hover-text">Report Cybercrime</span>
          </button>
        </Link>
      </div>
      <footer className = 'homepage-dev-email'>
      <p> Developer Email: a.jankauskaite@se20.qmul.ac.uk</p>
      </footer>
    </div>
  );
};

export default HomePage;
