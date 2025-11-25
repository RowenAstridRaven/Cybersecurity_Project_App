// client/src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//Components import
import NavigationBar from './components/NavigationBar';

//Pages import
import HomePage from './pages/HomePage';
import CyberSecurityInfoPage from './pages/CyberSecurityInfoPage';
import SummaryPage from './pages/SummaryPage';
import ArticlesPage from './pages/ArticlesPage';
import VideosPage from './pages/VideosPage';
import ReportBugPage from './pages/ReportBugPage';
import CyberCrimeReportPage from './pages/CyberCrimeReportPage';
import SearchPage from './pages/SearchPage';
//To add page
//import exported_function_for_that_page from './pages/name_of_page'

/*
import SearchPage from './pages/SearchPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
*/


const App: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);

  //This checks if maintenance is on or off
  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/status');
        if (response.ok) {
          const data = await response.json();
          setMaintenance(data.maintenance);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkMaintenance();
  }, []);

  //If maintenance is on then the site will say under maintenance
  if (maintenance) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>App Under Maintenance</h1>
        <p>Please check back later!</p>
        <p>Developer Email: a.jankauskaite@se20.qmul.ac.uk</p>
      </div>
    );
  }

  return (
    //This is for navigation of the paths and the page for that path
    //To add page, one before path="*"
    //<Route path="/path_name" element={<page_name_imported />} />
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cybersecurity-info" element={<CyberSecurityInfoPage />} />
        <Route path="/summary/:topic" element={<SummaryPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/report-bug" element={<ReportBugPage />} />
        <Route path="/cybercrime-report" element={<CyberCrimeReportPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
