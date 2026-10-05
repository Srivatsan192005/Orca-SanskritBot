import React, { useState, useEffect, useRef } from 'react';
import { playMultilingualSpeech, createSpeechRecognizer, analyzeSpeechPronunciation } from '../nlp/multiLingualNlp';
import { startAudioCapture, stopAudioCapture, playRecordedAudio, stopRecordedAudio } from '../utils/audioRecorder';
import { IconSpeaker, IconMic, IconStop, IconPlay, IconCheck, IconCross, IconChevronDown } from './Icons';

export default function WordsScreen({
  activeLang,
  curriculum,
  onRecordAttempt
}) {
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [meterWidth, setMeterWidth] = useState(40);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);

  const meterIntervalRef = useRef(null);
  const recognizerRef = useRef(null);
  const capturedTextRef = useRef('');
  const recordingTimeoutRef = useRef(null);

  const langData = curriculum[activeLang];
  const lesson = langData.lessons[selectedLessonIdx] || langData.lessons[0];
  const word = lesson.words[selectedWordIdx] || lesson.words[0];

  useEffect(() => {
    setSelectedWordIdx(0);
    setAnalysisResult(null);
    setLiveTranscript('');
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);
  }, [activeLang, selectedLessonIdx]);

  useEffect(() => {
    setAnalysisResult(null);
    setLiveTranscript('');
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);
  }, [selectedWordIdx]);

  const handleListen = () => {
    playMultilingualSpeech(word.text, activeLang);
  };

  const startRecording = async () => {
    setIsRecording(true);
    setLiveTranscript('');
    setAnalysisResult(null);
    setUserAudioUrl(null);
    capturedTextRef.current = '';
    stopRecordedAudio();
    setIsPlayingUserAudio(false);

    await startAudioCapture();

    let step = 0;
    meterIntervalRef.current = setInterval(() => {
      step = (step + 1) % 10;
      setMeterWidth(25 + Math.sin(step) * 55);
    }, 100);

    try {
      const recognizer = createSpeechRecognizer({
        lang: activeLang,
        onInterim: (interim) => {
          setLiveTranscript(interim);
          capturedTextRef.current = interim;
        },
        onResult: (final) => {
          setLiveTranscript(final);
          capturedTextRef.current = final;
        },
        onError: (err) => {
          console.warn("Speech recognition warning:", err);
        },
        onEnd: () => {}
      });

      recognizerRef.current = recognizer;
      if (recognizer) recognizer.start();
    } catch (e) {
      console.warn("Speech recognition error:", e);
    }

    recordingTimeoutRef.current = setTimeout(() => {
      stopRecordingAndAnalyze();
    }, 4200);
  };

  const stopRecordingAndAnalyze = async (overrideText = null) => {
    if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
    if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
    if (recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch (e) {}
      recognizerRef.current = null;
    }

    setIsRecording(false);

    const { audioUrl } = await stopAudioCapture();
    if (audioUrl) {
      setUserAudioUrl(audioUrl);
    }

    const spokenText = overrideText !== null
      ? overrideText
      : (capturedTextRef.current || liveTranscript || '');

    const result = analyzeSpeechPronunciation(word.text, spokenText, activeLang);
    setAnalysisResult(result);

    if (onRecordAttempt) {
      onRecordAttempt({
        wordText: word.text,
        lang: activeLang,
        score: result.score,
        isDifferentWord: result.isDifferentWord,
        audioUrl: audioUrl || null
      });
    }
  };

  const handleToggleReplayVoice = () => {
    if (isPlayingUserAudio) {
      stopRecordedAudio();
      setIsPlayingUserAudio(false);
    } else {
      if (!userAudioUrl) return;
      setIsPlayingUserAudio(true);
      playRecordedAudio(userAudioUrl, () => {
        setIsPlayingUserAudio(false);
      });
    }
  };

  const handleManualTest = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    stopRecordingAndAnalyze(manualInput.trim());
    setManualInput('');
  };

  const handleNextWord = () => {
    if (selectedWordIdx + 1 < lesson.words.length) {
      setSelectedWordIdx(selectedWordIdx + 1);
    } else if (selectedLessonIdx + 1 < langData.lessons.length) {
      setSelectedLessonIdx(selectedLessonIdx + 1);
      setSelectedWordIdx(0);
    }
  };

  const handlePrevWord = () => {
    if (selectedWordIdx > 0) {
      setSelectedWordIdx(selectedWordIdx - 1);
    }
  };

  useEffect(() => {
    return () => {
      if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
      if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
      if (recognizerRef.current) {
        try { recognizerRef.current.stop(); } catch (e) {}
      }
      stopRecordedAudio();
    };
  }, []);

  return (
    <div className="full-page-module-container">
      {/* Redesigned Academic Module Header & Unit Picker */}
      <div className="module-title-bar academic-refined-header">
        <div className="module-title-left">
          <div className="module-subtag-row">
            <span className="lang-code-tag">{langData.code}</span>
            <span className="module-subtag">{langData.name} Vocabulary Studio</span>
          </div>
          <h2 className="module-heading">
            Unit {lesson.number}: {lesson.title}
          </h2>
          <p className="module-unit-summary">{lesson.summary}</p>
        </div>

        {/* Refined Academic Unit Selector */}
        <div className="unit-selector-wrapper">
          <label htmlFor="lessonSelect" className="unit-selector-label">
            Curriculum Unit
          </label>
          <div className="custom-select-container">
            <select
              id="lessonSelect"
              className="academic-select-refined"
              value={selectedLessonIdx}
              onChange={(e) => setSelectedLessonIdx(Number(e.target.value))}
            >
              {langData.lessons.map((les, i) => (
                <option key={les.id} value={i}>
                  Unit {les.number} — {les.title} ({les.words.length} words)
                </option>
              ))}
            </select>
            <span className="select-arrow-icon">
              <IconChevronDown size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Unit Tabs for Quick Switching */}
      <div className="unit-pills-bar" role="tablist" aria-label="Units">
        {langData.lessons.map((les, i) => (
          <button
            key={les.id}
            type="button"
            className={`btn-unit-pill ${i === selectedLessonIdx ? 'active' : ''}`}
            onClick={() => setSelectedLessonIdx(i)}
          >
            <span className="unit-pill-num">0{i + 1}</span>
            <span className="unit-pill-title">{les.title}</span>
          </button>
        ))}
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="module-two-columns">
        
        {/* Left Column: Word Display & Interactive Audio Recording */}
        <div className="column-main">
          <div className="academic-card prominent-word-card">
            <div className="word-card-top-bar">
              <span className="unit-badge">
                Word {selectedWordIdx + 1} of {lesson.words.length}
              </span>
              <span className="focus-pill">
                Phonetic Focus: {word.focus}
              </span>
            </div>

            {/* Hero Word Display */}
            <div className="hero-word-display-area">
              <div className="hero-word-glyph font-devanagari">
                {word.text}
              </div>
              <div className="hero-word-script">{word.script}</div>
              <div className="hero-word-meaning">“{word.meaning}”</div>
            </div>

            {/* Syllable Breakdown Chips */}
            <div className="units-breakdown-section">
              <span className="section-label-tiny">
                Syllable Segmentation (Akṣara):
              </span>
              <div className="chips-row">
                {word.units.map((unit, idx) => (
                  <span
                    key={idx}
                    className={`phonetic-chip ${idx === word.units.length - 1 ? 'chip-highlight' : ''}`}
                  >
                    {unit}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="interactive-controls-strip">
              <button
                type="button"
                className="btn-academic-listen"
                onClick={handleListen}
                title="Play native reference pronunciation"
              >
                <IconSpeaker size={16} />
                <span>Listen Native (Sanskrit)</span>
              </button>

              {!isRecording ? (
                <button
                  type="button"
                  className="btn-academic-record"
                  onClick={startRecording}
                  title="Record speech"
                >
                  <IconMic size={16} />
                  <span>Tap to Speak</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-academic-stop"
                  onClick={() => stopRecordingAndAnalyze()}
                >
                  <IconStop size={16} />
                  <span>Stop & Analyze</span>
                </button>
              )}
            </div>

            {/* Active Recording State */}
            {isRecording && (
              <div className="active-recording-panel">
                <div className="recording-status-line">
                  <span className="pulse-indicator"></span>
                  <span className="status-text">
                    Recording microphone audio (Sanskrit speech model)...
                  </span>
                </div>

                <div className="live-hearing-bubble">
                  <span className="hearing-tag">Live Hearing:</span>
                  <span className="hearing-text">
                    {liveTranscript ? `“${liveTranscript}”` : "Speak clearly into your microphone..."}
                  </span>
                </div>

                <div className="audio-level-track">
                  <div
                    className="audio-level-fill"
                    style={{ width: `${Math.max(15, Math.min(100, meterWidth))}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Simulation Test Input */}
            <div className="test-simulation-strip">
              <span className="sim-label">Text Simulation Input:</span>
              <form onSubmit={handleManualTest} className="sim-form">
                <input
                  type="text"
                  className="sim-input"
                  placeholder={
                    activeLang === 'sanskrit'
                      ? 'Type word to test (e.g. namaste, apple, student...)'
                      : 'Type word to test (e.g. konnichiwa, apple, gakusei...)'
                  }
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                />
                <button type="submit" className="btn-sim-test">Run NLP Analysis</button>
              </form>
            </div>

            {/* Navigation Carousel */}
            <div className="card-pagination-nav">
              <button
                type="button"
                className="btn-paging"
                onClick={handlePrevWord}
                disabled={selectedWordIdx === 0}
              >
                Previous Word
              </button>
              <span className="paging-indicator">
                {selectedWordIdx + 1} / {lesson.words.length}
              </span>
              <button
                type="button"
                className="btn-paging"
                onClick={handleNextWord}
              >
                Next Word
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Feedback & Voice Rehearing */}
        <div className="column-sidebar">
          
          {/* Analysis Feedback Panel */}
          {analysisResult ? (
            <div className="academic-card analysis-result-card">
              <div className="card-header-bar">
                <span className="card-heading-tag">Acoustic Analysis</span>
                <span
                  className={`score-badge ${
                    analysisResult.score >= 80 ? 'good' : analysisResult.score >= 50 ? 'mid' : 'low'
                  }`}
                >
                  {analysisResult.score}% Accuracy
                </span>
              </div>

              {/* What AI Heard */}
              <div className="hearing-audit-box">
                <span className="audit-label">What AI Heard:</span>
                <span className="audit-value">“{analysisResult.rawRecognized}”</span>
                <span className="audit-target">Target: {word.text} ({word.script})</span>
              </div>

              {/* Voice Rehearing Studio */}
              <div className="voice-rehear-studio-box">
                <span className="rehear-title">Audio Replay & Comparison</span>
                <div className="rehear-buttons-grid">
                  {userAudioUrl ? (
                    <button
                      type="button"
                      className={`btn-rehear-voice ${isPlayingUserAudio ? 'playing' : ''}`}
                      onClick={handleToggleReplayVoice}
                      title="Play back your recorded voice"
                    >
                      {isPlayingUserAudio ? <IconStop size={14} /> : <IconPlay size={14} />}
                      <span>{isPlayingUserAudio ? 'Stop My Voice' : 'Rehear My Voice'}</span>
                    </button>
                  ) : (
                    <div className="no-audio-notice">
                      (Microphone audio saved for this attempt)
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn-rehear-reference"
                    onClick={handleListen}
                    title="Play back standard reference"
                  >
                    <IconSpeaker size={14} />
                    <span>Standard Model</span>
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="eval-status-row">
                <span className="eval-label">Diagnostic Status:</span>
                <span
                  className={`eval-pill ${
                    analysisResult.score >= 80 ? 'pill-good' : analysisResult.score >= 50 ? 'pill-mid' : 'pill-low'
                  }`}
                >
                  {analysisResult.evaluation}
                </span>
              </div>

              {/* Categorical Diagnostics */}
              <div className="diagnostics-checklist">
                <span className="checklist-title">Checklist:</span>
                <ul>
                  {analysisResult.checks.map((chk, i) => (
                    <li key={i} className={chk.pass ? 'pass' : 'fail'}>
                      <span className="check-icon">
                        {chk.pass ? <IconCheck size={14} /> : <IconCross size={14} />}
                      </span>
                      <span className="check-text">{chk.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Feedback Quote */}
              <div className={`ai-feedback-quote-box ${analysisResult.isDifferentWord ? 'warn-theme' : ''}`}>
                <div className="quote-badge">AI Tutor Feedback</div>
                <p className="quote-body">{analysisResult.aiMessage}</p>
              </div>

              <button
                type="button"
                className="btn-try-again-large"
                onClick={startRecording}
              >
                <IconMic size={15} />
                <span>Practice Again</span>
              </button>
            </div>
          ) : (
            <div className="academic-card prompt-card">
              <div className="prompt-badge-indicator">Voice Ready</div>
              <h3 className="prompt-title">Acoustic Pronunciation Check</h3>
              <p className="prompt-desc">
                Tap <strong>Listen</strong> to hear authentic reference cadence, then tap <strong>Speak</strong> to recite the phrase. Your voice is stored temporarily so you can rehear your attempt immediately.
              </p>
            </div>
          )}

          {/* Quick Word List in Unit */}
          <div className="academic-card word-list-sidebar-card">
            <span className="card-heading-tag">Vocabulary in Unit {lesson.number}</span>
            <div className="sidebar-word-items">
              {lesson.words.map((w, idx) => (
                <div
                  key={w.id}
                  className={`sidebar-word-item ${idx === selectedWordIdx ? 'active' : ''}`}
                  onClick={() => setSelectedWordIdx(idx)}
                >
                  <span className="item-num">{idx + 1}.</span>
                  <div className="item-text-group">
                    <span className="item-main">{w.text}</span>
                    <span className="item-sub">{w.meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
