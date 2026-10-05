import React from 'react';
import { playSanskritSpeech } from '../nlp/sanskritNlp';

export default function PronunciationAnalysis({
  analysisData,
  onTryAgain,
  onNextWord
}) {
  const {
    targetSanskrit = "नमस्ते",
    targetIast = "na-ma-ste",
    score = 82,
    evaluation = "Good",
    checks = [
      { pass: true, text: "Correct syllables" },
      { pass: true, text: "Correct vowel sound" },
      { pass: false, text: "Improve the final sound" }
    ],
    aiMessage = "“Try saying the final syllable more clearly.”",
    rawRecognized = "नमस्ते",
    isDifferentWord = false
  } = analysisData || {};

  const handlePlayStandard = () => {
    playSanskritSpeech(targetSanskrit);
  };

  const handleReplayUser = () => {
    // Replay acoustic feedback tone
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isDifferentWord ? 220 : 320, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  const isLowScore = score < 50;
  const isGoodScore = score >= 75;

  return (
    <div className="screen-scrollable">
      <div className="screen-header-block">
        <span className="screen-subtitle-tag">NLP Diagnostic Feedback</span>
        <h2 className="screen-title">Pronunciation Check</h2>
      </div>

      {/* Target Word Card */}
      <div className="content-card analysis-target-card">
        <div className="analysis-meta-row">
          <span className="card-section-label">Target Word</span>
          <span className="target-phonetics">{targetIast}</span>
        </div>
        <div className="target-word-prominent">{targetSanskrit}</div>

        <div className="result-banner">
          <div className="result-evaluation">
            <span className="eval-label">Your pronunciation:</span>
            <span
              className={`eval-badge ${
                isLowScore ? 'mismatch' : isGoodScore ? 'good' : 'average'
              }`}
            >
              {evaluation}
            </span>
          </div>

          <div className="score-display">
            <span
              className={`score-number ${
                isLowScore ? 'score-low' : isGoodScore ? 'score-high' : 'score-mid'
              }`}
            >
              {score}%
            </span>
            <span className="score-caption">Pronunciation Accuracy</span>
          </div>

          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${
                isLowScore ? 'fill-warn' : isGoodScore ? 'fill-secondary' : 'fill-accent'
              }`}
              style={{ width: `${Math.max(5, score)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Acoustic Hearing Capture Box */}
      <div className="content-card acoustic-capture-card">
        <div className="card-section-label">Acoustic Input Captured</div>
        <div className="recognized-speech-row">
          <span className="recognized-tag">What AI Heard:</span>
          <span className="recognized-value">
            “{rawRecognized || '(No input)'}”
          </span>
        </div>
        {isDifferentWord && (
          <div className="mismatch-warning-banner">
            <span className="warn-icon">[!]</span>
            <span className="warn-text">
              Phonetic mismatch detected. The spoken word differs significantly from the target phrase.
            </span>
          </div>
        )}
      </div>

      {/* Detailed Categorical Feedback */}
      <div className="content-card feedback-categories-card">
        <div className="card-section-label">Phonetic Diagnosis</div>

        <ul className="feedback-checks-list">
          {checks.map((chk, index) => (
            <li
              key={index}
              className={`check-item ${chk.pass ? 'check-pass' : 'check-warn'}`}
            >
              <span className="check-icon">{chk.pass ? '[PASS]' : '[FAIL]'}</span>
              <span className="check-text">{chk.text}</span>
            </li>
          ))}
        </ul>

        {/* AI Feedback Box */}
        <div className={`ai-feedback-box ${isLowScore ? 'feedback-warn-theme' : ''}`}>
          <div className={`feedback-badge ${isLowScore ? 'error' : ''}`}>
            {isLowScore ? 'Correction Required' : 'AI Feedback'}
          </div>
          <p className="feedback-quote">{aiMessage}</p>
          <div className="audio-replay-row">
            <button
              type="button"
              className="btn-inline-replay"
              onClick={handlePlayStandard}
              title="Hear correct pronunciation"
            >
              Play Standard
            </button>
            <button
              type="button"
              className="btn-inline-replay"
              onClick={handleReplayUser}
              title="Replay user sample"
            >
              Replay Attempt
            </button>
          </div>
        </div>
      </div>

      {/* Conceptual NLP Pipeline Indicator */}
      <div className="content-card nlp-pipeline-card">
        <div className="card-section-label">NLP Processing Pipeline</div>
        <div className="pipeline-steps">
          <span className="pipeline-step done">Speech Input</span>
          <span className="pipeline-arrow">→</span>
          <span className="pipeline-step done">Phoneme Match</span>
          <span className="pipeline-arrow">→</span>
          <span className="pipeline-step done">Acoustic Score</span>
          <span className="pipeline-arrow">→</span>
          <span className="pipeline-step active">Diagnosis</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions-card-bottom">
        <button
          type="button"
          className="btn-primary-action btn-try-again"
          onClick={onTryAgain}
        >
          <span className="btn-icon"></span> Try Again
        </button>
        <button
          type="button"
          className="btn-secondary-flat btn-next-word"
          onClick={onNextWord}
        >
          Next Word →
        </button>
      </div>
    </div>
  );
}
