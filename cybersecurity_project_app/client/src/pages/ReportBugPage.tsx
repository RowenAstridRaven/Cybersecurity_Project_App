// client/src/pages/ReportBugPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ReportBugPage.css';

const ReportBugPage: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [occurredAt, setOccurredAt] = useState<string>('');
  const [pageAffected, setPageAffected] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [screenshots, setScreenshots] = useState<FileList | null>(null);
  
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setScreenshots(event.target.files);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!description.trim() || !occurredAt.trim() || !pageAffected.trim()) {
      setError(
        'Please fill in all required fields: Description, When it happened, and Which page was affected.'
      );
      return;
    }
    
    const formData = new FormData();
    formData.append('description', description);
    formData.append('occurredAt', occurredAt); // maps to "when_happened" on the server
    formData.append('pageAffected', pageAffected); // maps to "page"
    formData.append('contactInfo', contactInfo);
    
    if (screenshots) {
      for (let i = 0; i < screenshots.length; i++) {
        formData.append('screenshots', screenshots[i]);
      }
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/report-bug', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Bug report submitted successfully!');
        setDescription('');
        setOccurredAt('');
        setPageAffected('');
        setContactInfo('');
        setScreenshots(null);
      } else {
        setError(result.error || 'Something went wrong. Please try again later.');
        console.error('Server error:', result);
      }
    } catch (err) {
      setError('Failed to submit bug report.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="report-bug-container">
      <div className="smaller-container">
        <h1>Report a Bug</h1>
        <p>Please provide the details of the issue so that our team can promptly address it.</p>
        <form onSubmit={handleSubmit} className="report-bug-form">
          <div className="form-group">
            <label htmlFor="description">
              Bug Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the bug in detail..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="occurredAt">
              When did it happen? <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="occurredAt"
              value={occurredAt}
              onChange={(e) => setOccurredAt(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pageAffected">
              Which page was affected? <span className="required">*</span>
            </label>
            <input
              type="text"
              id="pageAffected"
              value={pageAffected}
              onChange={(e) => setPageAffected(e.target.value)}
              required
              placeholder="e.g., Home, Articles, Videos, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Your Contact Information (optional)</label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Email or phone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="screenshots">Screenshots (optional)</label>
            <input
              type="file"
              id="screenshots"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
          <button type="submit" className="submit-button">
            Submit Bug Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportBugPage;
