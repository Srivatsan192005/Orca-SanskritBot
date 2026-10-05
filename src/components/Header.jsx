import React from 'react';
import { IconBook, IconChat, IconTarget, IconChart, IconMic } from './Icons';

export default function Header({
  activeTab,
  onSelectTab,
  stats
}) {
  const navTabs = [
    { id: 'voice-bot', label: 'Voice Bot Tutor', icon: <IconMic size={16} /> },
    { id: 'words', label: 'Learn Words', icon: <IconBook size={16} /> },
    { id: 'sentences', label: 'Learn Sentences', icon: <IconChat size={16} /> },
    { id: 'practice', label: 'Oral Practice', icon: <IconTarget size={16} /> },
    { id: 'curriculum', label: 'Curriculum', icon: <IconBook size={16} /> },
    { id: 'progress', label: 'My Progress', icon: <IconChart size={16} /> }
  ];

  return (
    <header className="full-page-header">
      {/* Top Academic Department Notice */}
      <div className="header-meta-bar">
        <div className="header-meta-inner">
          <div className="meta-left">
            <span className="meta-badge">NLP Research Lab</span>
            <span className="meta-title">
              AI-Enabled Technologies for Sanskrit using Natural Language Processing
            </span>
          </div>
          <div className="meta-right">
            <span className="meta-status">
              <span className="pulse-dot"></span> Sanskrit Acoustic Models Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Strip */}
      <div className="header-main-strip">
        <div className="header-main-inner">
          {/* Brand */}
          <div className="brand-group">
            <div className="brand-logo-box">
              <span className="brand-om-icon">ॐ</span>
              <span className="brand-logo-text">ORCA</span>
            </div>
            <div className="brand-text-block">
              <div className="brand-heading-row">
                <h1 className="brand-main-name">Sanskrit Guru AI</h1>
                <span className="lang-indicator-tag tag-sa">
                  संस्कृतम् (Sanskrit)
                </span>
              </div>
              <p className="brand-description">
                Interactive Multilingual Voice Tutor & Sanskrit Acoustic Pronunciation Assessment
              </p>
            </div>
          </div>

          {/* Direct Voice Bot Action Button */}
          <div className="header-controls-group">
            <button
              type="button"
              className={`btn-talk-assistant-top ${activeTab === 'voice-bot' ? 'active-glow' : ''}`}
              onClick={() => onSelectTab('voice-bot')}
              title="Speak with AI Sanskrit Guru"
            >
              <IconMic size={15} />
              <span>Talk to Sanskrit Guru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Page Navigation Tabs Bar */}
      <nav className="full-page-nav-bar" aria-label="Learning Modules Navigation">
        <div className="nav-bar-inner">
          <div className="tabs-list">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Real-Time Stats Badge */}
          <div className="live-stats-strip">
            <span className="stat-pill">
              <strong>{stats.wordsPracticed}</strong> Words Tested
            </span>
            <span className="stat-pill">
              <strong>{stats.sessionsCount}</strong> Voice Sessions
            </span>
            <span className="stat-pill">
              Avg: <strong>{stats.averageAccuracy > 0 ? `${stats.averageAccuracy}%` : 'Fresh'}</strong>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
