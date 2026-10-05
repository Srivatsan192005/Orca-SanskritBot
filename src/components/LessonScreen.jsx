import React, { useState, useEffect, useRef } from 'react';
import { playSanskritSpeech, createSpeechRecognizer, analyzeSanskritPronunciation } from '../nlp/sanskritNlp';

export default function LessonScreen({
  lesson,
  wordIndex,
  onBack,
  onCompleteAnalysis
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [meterWidth, setMeterWidth] = useState(40);
  const [manualWordInput, setManualWordInput] = useState('');

  const meterIntervalRef = useRef(null);
  const recognizerRef = useRef(null);
  const capturedTextRef = useRef('');
  const recordingTimeoutRef = useRef(null);

  const word = lesson.words[wordIndex] || lesson.words[0];

  const handleListen = () => {
    playSanskritSpeech(word.sanskrit);
  };

  const startRecording = () => {
    setIsRecording(true);
    setLiveTranscript('');
    capturedTextRef.current = '';

    // Animate audio level meter
    let step = 0;
    meterIntervalRef.current = setInterval(() => {
      step = (step + 1) % 10;
      setMeterWidth(25 + Math.sin(step) * 55);
    }, 100);

    // Initialize Web Speech Recognition
    try {
      const recognizer = createSpeechRecognizer({
        onInterim: (interim) => {
          setLiveTranscript(interim);
          capturedTextRef.current = interim;
        },
        onResult: (final) => {
          setLiveTranscript(final);
          capturedTextRef.current = final;
        },
        onError: (err) => {
          console.warn("Speech recognition warning/error:", err);
        },
        onEnd: () => {
          // If stopped naturally
        }
      });

      recognizerRef.current = recognizer;
      if (recognizer) {
        recognizer.start();
      }
    } catch (e) {
      console.warn("Microphone recognition unavailable:", e);
    }

    // Auto-stop after 4 seconds if learner doesn't click "Finish Speaking"
    recordingTimeoutRef.current = setTimeout(() => {
      stopRecordingAndAnalyze();
    }, 4200);
  };

  const stopRecordingAndAnalyze = (overrideText = null) => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    if (meterIntervalRef.current) {
      clearInterval(meterIntervalRef.current);
      meterIntervalRef.current = null;
    }
    if (recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch (e) {}
      recognizerRef.current = null;
    }

    setIsRecording(false);

    // Get the recognized text captured by microphone (or override)
    const spokenText = overrideText !== null 
      ? overrideText 
      : (capturedTextRef.current || liveTranscript || '');

    // Execute Sanskrit NLP Pronunciation Analysis Engine
    const analysisResult = analyzeSanskritPronunciation(word.sanskrit, spokenText);
    onCompleteAnalysis(analysisResult);
  };

  const handleManualTestSubmit = (e) => {
    e.preventDefault();
    if (!manualWordInput.trim()) return;
    stopRecordingAndAnalyze(manualWordInput.trim());
  };

  useEffect(() => {
    return () => {
      if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
      if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
      if (recognizerRef.current) {
        try { recognizerRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="screen-scrollable">
      <div className="lesson-top-bar">
        <button type="button" className="btn-back-nav" onClick={onBack}>
          ← Back
        </button>
        <span className="lesson-badge">Curriculum: {lesson.tier}</span>
      </div>

      <div className="screen-header-block">
        <span className="screen-subtitle-tag">Individual Word Training</span>
        <h2 className="screen-title">Lesson {lesson.number} — {lesson.title}</h2>
      </div>

      {/* Sanskrit Word Display Box */}
      <div className="content-card lesson-word-card">
        <div className="word-stage-header">
          <span className="stage-step">Word {wordIndex + 1} of {lesson.words.length}</span>
          <span className="stage-tag">{word.phoneticFocus}</span>
        </div>

        <div className="prominent-sanskrit-container">
          <div className="sanskrit-hero-word">{word.sanskrit}</div>
          <div className="sanskrit-detail-line">
            <span className="detail-label">Meaning:</span>
            <span className="detail-text">{word.meaning}</span>
          </div>
          <div className="sanskrit-detail-line">
            <span className="detail-label">Pronunciation:</span>
            <span className="detail-text phonetic-script">{word.pronunciation}</span>
          </div>
        </div>

        <div className="phoneme-breakdown-box">
          <span className="breakdown-label">Syllable Breakdown:</span>
          <div className="syllables-row">
            {word.syllables.map((syl, i) => (
              <span
                key={i}
                className={`syllable-chip ${i === word.syllables.length - 1 ? 'highlight' : ''}`}
              >
                {syl}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Controls */}
      <div className="content-card voice-controls-card">
        <button
          type="button"
          className="btn-listen-large"
          onClick={handleListen}
          title="Play correct pronunciation"
        >
          <span className="listen-icon"></span>
          <span className="listen-text">Listen</span>
        </button>
        <p className="voice-hint">Listen to the correct pronunciation</p>

        <div className="divider-rigid">
          <span>Your Turn</span>
        </div>

        {!isRecording ? (
          <>
            <button
              type="button"
              className="btn-mic-large"
              onClick={startRecording}
              title="Record your speech"
            >
              <span className="mic-icon">[REC]</span>
              <span className="mic-label">Tap to Speak</span>
            </button>
            <p className="voice-instruction">Say the Sanskrit word clearly into your microphone.</p>
          </>
        ) : (
          <div className="recording-live-box">
            <div className="live-status-row">
              <span className="pulse-indicator"></span>
              <span className="live-status-text">Listening... Speak now</span>
            </div>

            {/* Live Real-time Hearing Indicator */}
            <div className="live-hearing-display">
              <span className="hearing-tag">Live Hearing:</span>
              <span className="hearing-content">
                {liveTranscript ? `“${liveTranscript}”` : "Listening for Sanskrit speech..."}
              </span>
            </div>

            <div className="audio-level-track">
              <div
                className="audio-level-bar"
                style={{ width: `${Math.max(15, Math.min(100, meterWidth))}%` }}
              ></div>
            </div>

            <button
              type="button"
              className="btn-secondary-flat"
              onClick={() => stopRecordingAndAnalyze()}
            >
              Finish Speaking & Check
            </button>
          </div>
        )}

        {/* Quick Testing Panel for Words */}
        <div className="test-input-container">
          <span className="test-input-label">Speech Input Simulation / Test:</span>
          <form onSubmit={handleManualTestSubmit} className="test-input-row">
            <input
              type="text"
              className="test-text-input"
              placeholder="e.g. apple, namaste, banana..."
              value={manualWordInput}
              onChange={(e) => setManualWordInput(e.target.value)}
            />
            <button type="submit" className="btn-test-submit">Test Word</button>
          </form>
        </div>
      </div>
    </div>
  );
}
