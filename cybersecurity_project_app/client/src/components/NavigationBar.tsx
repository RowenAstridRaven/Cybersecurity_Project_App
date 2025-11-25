// client/src/components/NavigationBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';

//Imports all icons located in navBarIcons folder to use for navigation bar
import homeicon from './navBarIcons/Home_B.svg';
import cyberinfoicon from './navBarIcons/Info_B.svg';
import searchicon from './navBarIcons/Search_B.svg';
import articleicon from './navBarIcons/News_B.svg';
import videoicon from './navBarIcons/Video_B.svg';
import reportbugicon from './navBarIcons/Bug_B.svg';
import reportcyber from './navBarIcons/Report_B.svg';
//To icon
//import icon_name from './navBarIcons/file_name_And_file_extension'

const NavigationBar: React.FC = () => (
  //This is for ensuring that there is a navigation bar and how each page is linked
  //To add a navigation bar item:
  /*
    <span className="separator">|</span>
    <NavLink
      to="/path_name"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={icon_name} alt="name_of_page Page Current" className="nav-icon" />
        ) : (
          <img src={icon_name} alt="name_of_page Page" className="nav-icon" />
        )
      }
    </NavLink>
  */
  <nav className="navbar">
    <NavLink
      to="/" //The path_name to the page from App.tsx
    >
      {//Check if the user is on that page, changes the size depending on the page and if hovering over it
      ({ isActive }: { isActive: boolean }) => 
        isActive ? (
          <img src={homeicon} alt="Home Page Current" className="nav-icon-active" />
        ) : (
          <img src={homeicon} alt="Home Page" className="nav-icon-inactive" />
        )
      }
    </NavLink>
    <span className="separator">|</span>
    <NavLink
      to="/cybersecurity-info"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={cyberinfoicon} alt="Cybersecurity Information Page Current" className="nav-icon-active" />
        ) : (
          <img src={cyberinfoicon} alt="Cybersecurity Information Page" className="nav-icon-inactive" />
        )
      }
    </NavLink>
    <span className="separator">|</span>
    <NavLink
      to="/search"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={searchicon} alt="Search Page Current" className="nav-icon-active" />
        ) : (
          <img src={searchicon} alt="Search Page" className="nav-icon-inactive" />
        )
      }
    </NavLink>
    <span className="separator">|</span>
    <NavLink
      to="/articles"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={articleicon} alt="Articles Page Current" className="nav-icon-active" />
        ) : (
          <img src={articleicon} alt="Articles Page" className="nav-icon-inactive" />
        )
      }
    </NavLink>
    <span className="separator">|</span>
    <NavLink
      to="/videos"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={videoicon} alt="Video Page Current" className="nav-icon-active" />
        ) : (
          <img src={videoicon} alt="Video Page" className="nav-icon-inactive" />
        )
      }
    </NavLink>
    <span className="separator">|</span>
    <NavLink
      to="/report-bug"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={reportbugicon} alt="Report Bug Page Current" className="nav-icon-active" />
        ) : (
          <img src={reportbugicon} alt="Report Bug Page" className="nav-icon-inactive" />
        )
      }
    </NavLink>
    <span className="separator">|</span>
    <NavLink
      to="/cybercrime-report"
    >
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <img src={reportcyber} alt="Cybercrime Report Page Current" className="nav-icon-active"/>
        ) : (
          <img src={reportcyber} alt="Cybercrime Report Page" className="nav-icon-inactive"/>
        )
      }
    </NavLink>
  </nav>
);

export default NavigationBar;
