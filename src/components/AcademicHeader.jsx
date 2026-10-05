import React from 'react';

export default function AcademicHeader({ isFullscreen, onToggleFullscreen }) {
  return (
    <>
      <aside className="academic-top-bar" aria-label="Academic Research Affiliation">
        <div className="top-bar-inner">
          <div className="project-institution">
            <span className="badge-dept">NLP Research Lab</span>
            <span className="project-title">
              AI-Enabled Technologies for Sanskrit using Natural Language Processing
            </span>
          </div>
          <div className="view-controls">
            <span className="device-label">Device Preview (390×844)</span>
            <button
              type="button"
              className="btn-toggle-view"
              onClick={onToggleFullscreen}
              title="Toggle Full Width / Mobile Frame"
            >
              {isFullscreen ? "Reset to 390×844 Frame" : "Full Width View"}
            </button>
          </div>
        </div>
      </aside>

      <header className="app-header">
        <div className="header-content">
          <div className="header-brand-row">
            <div className="logo-box">
              <span className="logo-text">ORCA</span>
            </div>
            <div className="brand-titles">
              <h1 className="brand-title">Sanskrit Guru AI</h1>
              <p className="brand-tagline">Academic Voice Learning System</p>
            </div>
          </div>
          <p className="header-subtitle">
            Learn Sanskrit. Speak Sanskrit. Improve your pronunciation.
          </p>
        </div>
      </header>
    </>
  );
}
