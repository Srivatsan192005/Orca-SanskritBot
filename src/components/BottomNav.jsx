import React from 'react';

export default function BottomNav({ currentScreen, onSelectTab }) {
  const tabs = [
    { id: 'screenHome', label: 'Home', icon: 'H' },
    { id: 'screenLessonList', label: 'Lessons', icon: 'L' },
    { id: 'screenPractice', label: 'Practice', icon: 'P' },
    { id: 'screenProgress', label: 'Progress', icon: 'S' }
  ];

  return (
    <nav className="bottom-nav" aria-label="Main Application Navigation">
      {tabs.map((tab) => {
        const isActive =
          currentScreen === tab.id ||
          (tab.id === 'screenLessonList' && (currentScreen === 'screenLesson' || currentScreen === 'screenAnalysis'));

        return (
          <button
            key={tab.id}
            type="button"
            className={`nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-text">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
