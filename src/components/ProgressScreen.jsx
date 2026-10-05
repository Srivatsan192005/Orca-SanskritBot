import React, { useState } from 'react';
import { playRecordedAudio, stopRecordedAudio } from '../utils/audioRecorder';
import { IconPlay, IconStop, IconRefresh } from './Icons';

export default function ProgressScreen({
  stats,
  attemptLogs,
  onResetStats
}) {
  const [playingLogIndex, setPlayingLogIndex] = useState(null);

  const handlePlayLogAudio = (audioUrl, index) => {
    if (playingLogIndex === index) {
      stopRecordedAudio();
      setPlayingLogIndex(null);
    } else {
      stopRecordedAudio();
      setPlayingLogIndex(index);
      playRecordedAudio(audioUrl, () => {
        setPlayingLogIndex(null);
      });
    }
  };

  return (
    <div className="full-page-module-container">
      <div className="module-title-bar academic-refined-header">
        <div>
          <span className="module-subtag">Academic Diagnostic Records</span>
          <h2 className="module-heading">Personal Learning Progress & Oral Logs</h2>
          <p className="module-caption">
            Real-time evaluation logs updated dynamically from your actual speech practice sessions.
          </p>
        </div>

        <button
          type="button"
          className="btn-reset-academic"
          onClick={onResetStats}
          title="Clear logs and reset counters"
        >
          <IconRefresh size={14} />
          <span>Reset Progress to 0</span>
        </button>
      </div>

      {/* Fresh Stats Grid */}
      <div className="stats-metric-cards-grid">
        <div className="academic-card metric-card">
          <span className="metric-tag">Words Practiced</span>
          <span className="metric-number-big">{stats.wordsPracticed}</span>
          <span className="metric-footer-note">Unique words tested with voice</span>
        </div>

        <div className="academic-card metric-card">
          <span className="metric-tag">Oral Sessions</span>
          <span className="metric-number-big">{stats.sessionsCount}</span>
          <span className="metric-footer-note">Microphone recording attempts</span>
        </div>

        <div className="academic-card metric-card">
          <span className="metric-tag">Average Accuracy</span>
          <span className="metric-number-big">
            {stats.averageAccuracy > 0 ? `${stats.averageAccuracy}%` : '—'}
          </span>
          <span className="metric-footer-note">
            {stats.sessionsCount > 0 ? 'Calculated across all attempts' : 'Speak to start measuring'}
          </span>
        </div>

        <div className="academic-card metric-card">
          <span className="metric-tag">Curriculum Focus</span>
          <span className="metric-number-big">100%</span>
          <span className="metric-footer-note">Classical Vedic Sanskrit (संस्कृतम्)</span>
        </div>
      </div>

      {/* Oral Practice Log Table */}
      <div className="academic-card logs-table-card">
        <div className="card-header-bar">
          <span className="card-heading-tag">Real-Time Pronunciation Attempt History & Audio Rehearing</span>
          <span className="log-count-indicator">{attemptLogs.length} Records</span>
        </div>

        {attemptLogs.length > 0 ? (
          <div className="table-responsive">
            <table className="academic-table-full">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Focus</th>
                  <th>Target Phrase</th>
                  <th>Accuracy</th>
                  <th>Diagnostic Evaluation</th>
                  <th>Voice Rehearing</th>
                </tr>
              </thead>
              <tbody>
                {attemptLogs.map((log, i) => (
                  <tr key={i}>
                    <td>{log.time}</td>
                    <td>
                      <span className="lang-badge-small badge-sa">
                        Sanskrit
                      </span>
                    </td>
                    <td className="phrase-cell"><strong>{log.wordText}</strong></td>
                    <td>
                      <span
                        className={`accuracy-score-pill ${
                          log.score >= 80 ? 'pill-good' : log.score >= 50 ? 'pill-mid' : 'pill-low'
                        }`}
                      >
                        {log.score}%
                      </span>
                    </td>
                    <td>
                      {log.isDifferentWord ? (
                        <span className="status-warn-tag">Mismatched Word</span>
                      ) : log.score >= 80 ? (
                        <span className="status-good-tag">Clear Articulation</span>
                      ) : (
                        <span className="status-mid-tag">Needs Cadence Refinement</span>
                      )}
                    </td>
                    <td>
                      {log.audioUrl ? (
                        <button
                          type="button"
                          className={`btn-table-rehear ${playingLogIndex === i ? 'playing' : ''}`}
                          onClick={() => handlePlayLogAudio(log.audioUrl, i)}
                          title="Rehear your recorded voice"
                        >
                          {playingLogIndex === i ? <IconStop size={12} /> : <IconPlay size={12} />}
                          <span>{playingLogIndex === i ? 'Stop' : 'Rehear'}</span>
                        </button>
                      ) : (
                        <span className="no-audio-text">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-logs-placeholder">
            <div className="empty-badge-label">Fresh Session</div>
            <h4>Starting from Scratch & Fresh</h4>
            <p>
              No speech records yet. Head over to <strong>Learn Words</strong>, <strong>Learn Sentences</strong>, or <strong>Oral Practice</strong>, tap the microphone, recite a word, and you will be able to rehear your exact voice recording.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
