import React from 'react';
import { playSanskritSpeech } from '../nlp/sanskritNlp';

export default function HomeDashboard({ onNavigate, onStartLesson, onOpenAssistant }) {
  const handleListen = () => {
    playSanskritSpeech("नमस्ते");
  };

  const handlePractice = () => {
    onStartLesson(0, 0); // Lesson 1, Word 1 (नमस्ते)
  };

  return (
    <div className="screen-scrollable">
      {/* Quick Status & Assistant Trigger */}
      <div className="assistant-callout-card">
        <div className="card-header-line">
          <span className="card-tag">AI Voice Assistant</span>
          <span className="status-indicator">
            <span className="status-dot"></span> Ready to help
          </span>
        </div>
        <p className="callout-dialogue">“Namaste! What would you like to learn today?”</p>
        <button
          type="button"
          className="btn-assistant-open"
          onClick={onOpenAssistant}
        >
          <span className="btn-icon"></span> Talk to Sanskrit Guru
        </button>
      </div>

      {/* Main Section: Today's Lesson */}
      <div className="content-card">
        <div className="card-section-label">Today's Lesson</div>
        <h2 className="lesson-main-title">Lesson 01 — Basic Sanskrit Greetings</h2>

        <div className="sanskrit-display-box">
          <span className="sanskrit-phrase">नमस्ते</span>
          <span className="sanskrit-meaning">“Hello / Greetings”</span>
          <span className="sanskrit-phonetics">Pronunciation: na-ma-ste</span>
        </div>

        <div className="dual-actions-row">
          <button
            type="button"
            className="btn-primary-action btn-listen"
            onClick={handleListen}
            title="Listen to standard Vedic pronunciation"
          >
            <span className="btn-icon"></span> Listen
          </button>
          <button
            type="button"
            className="btn-primary-action btn-practice"
            onClick={handlePractice}
            title="Start speech practice session"
          >
            <span className="btn-icon"></span> Practice
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="content-card">
        <div className="card-section-label">Learning Progress</div>

        <div className="progress-item-block">
          <div className="progress-header-row">
            <span className="metric-label">Lessons Completed</span>
            <span className="metric-value">4 / 20</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: '20%' }}></div>
          </div>
        </div>

        <div className="progress-item-block">
          <div className="progress-header-row">
            <span className="metric-label">Pronunciation Accuracy</span>
            <span className="metric-value">82%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill fill-secondary" style={{ width: '82%' }}></div>
          </div>
        </div>

        <div className="stats-mini-row">
          <div className="stat-mini-box">
            <span className="stat-mini-num">12</span>
            <span className="stat-mini-title">Practice Sessions</span>
          </div>
          <div className="stat-mini-box">
            <span className="stat-mini-num">38</span>
            <span className="stat-mini-title">Words Mastered</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-view-details"
          onClick={() => onNavigate('screenProgress')}
        >
          View Comprehensive Report →
        </button>
      </div>

      {/* Active Syllabus Quick Access */}
      <div className="content-card quick-links-card">
        <div className="card-section-label">Active Syllabus</div>
        <ul className="mini-lesson-list">
          <li>
            <span className="lesson-num">01.</span>
            <span className="lesson-name">Greetings (नमस्ते)</span>
            <span className="tag-status done">Done</span>
          </li>
          <li>
            <span className="lesson-num">02.</span>
            <span className="lesson-name">Self Intro (अहं छात्रः अस्मि)</span>
            <span className="tag-status next">Current</span>
          </li>
          <li>
            <span className="lesson-num">03.</span>
            <span className="lesson-name">Numbers (एकम्, द्वे, त्रीणि)</span>
            <span className="tag-status pending">Locked</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
