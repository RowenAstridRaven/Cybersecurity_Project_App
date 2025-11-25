import React, { useState } from 'react';
import './CyberCrimeReportPage.css';

const CyberCrimeReportPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Cybercrime report form fields
  const [crimeType, setCrimeType] = useState<string>('');
  const [deviceSite, setDeviceSite] = useState<string>('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [reportMessage, setReportMessage] = useState<string>('');

  const handleIndividualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReportMessage('');

    if (!crimeType.trim() || !deviceSite.trim()) {
      setReportMessage('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('type', crimeType);
    formData.append('device_or_site', deviceSite);
    if (screenshot) {
      formData.append('screenshot', screenshot);
    }
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/api/indiviual', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setReportMessage(result.message || 'Cybercrime report submitted successfully!');
        setCrimeType('');
        setDeviceSite('');
        setScreenshot(null);
        setDescription('');
        setTimeout(() => setShowModal(false), 2000);
      } else {
        setReportMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setReportMessage('Failed to submit cybercrime report.');
      console.error('Fetch error:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleOrganisationReport = () => {
    window.open('https://signpost-cyber-incident.service.gov.uk/', '_blank');
  };

  return (
    <div className="cybercrime-report-page">
      <h1>Report a Cybercrime</h1>
      <div className="button-container">
        <button onClick={() => setShowModal(true)}>Individual Report</button>
        <button onClick={handleOrganisationReport}>Organisation Report</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Individual Cybercrime Report</h2>
            <form onSubmit={handleIndividualSubmit}>
              <div className="form-group">
                <label htmlFor="crimeType">Type of Cybercrime*</label>
                <input
                  type="text"
                  id="crimeType"
                  value={crimeType}
                  onChange={(e) => setCrimeType(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="deviceSite">Device/Site Affected*</label>
                <input
                  type="text"
                  id="deviceSite"
                  value={deviceSite}
                  onChange={(e) => setDeviceSite(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="screenshot">Screenshot (optional)</label>
                <input
                  type="file"
                  id="screenshot"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {reportMessage && <p className="report-message">{reportMessage}</p>}
              <div className="modal-buttons">
                <button type="submit">Submit Report</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CyberCrimeReportPage;
