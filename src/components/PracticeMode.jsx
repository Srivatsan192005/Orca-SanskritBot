import React, { useState, useEffect, useRef } from 'react';
import { playSanskritSpeech, createSpeechRecognizer, analyzeSanskritPronunciation } from '../nlp/sanskritNlp';

export default function PracticeMode({ sentences, onContinueSuccess }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [practiceState, setPracticeState] = useState('ready'); // 'ready' | 'listening' | 'analyzing' | 'result'
  const [meterBars, setMeterBars] = useState([8, 14, 22, 30, 36, 18, 12]);
  const [currentScore, setCurrentScore] = useState(76);
  const [currentFeedback, setCurrentFeedback] = useState("Good attempt. Practice the pronunciation of the middle word again.");
  const [currentDefect, setCurrentDefect] = useState("Notice the Visarga (ः) sound in छात्रः (chā-traḥ). Release gentle breath at the end.");
  const [heardSentence, setHeardSentence] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [manualSentenceInput, setManualSentenceInput] = useState('');

  const timerRef = useRef(null);
  const meterIntervalRef = useRef(null);
  const recognizerRef = useRef(null);
  const capturedTextRef = useRef('');

  const sentence = sentences[selectedIdx] || sentences[0];

  const handleListen = () => {
    playSanskritSpeech(sentence.sanskrit);
  };

  const startPracticeRecording = () => {
    setPracticeState('listening');
    setLiveTranscript('');
    capturedTextRef.current = '';

    // Animate audio waveform bars
    let tick = 0;
    meterIntervalRef.current = setInterval(() => {
      const heights = [8, 14, 22, 30, 36, 18, 12];
      setMeterBars(heights.map((_, i) => heights[(i + tick) % heights.length]));
      tick++;
    }, 120);

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
          console.warn("Speech recognition warning:", err);
        },
        onEnd: () => {}
      });

      recognizerRef.current = recognizer;
      if (recognizer) recognizer.start();
    } catch (e) {
      console.warn("Speech recognition error:", e);
    }

    // Auto transition to Analyzing after 4.5s
    timerRef.current = setTimeout(() => {
      stopAndAnalyze();
    }, 4500);
  };

  const stopAndAnalyze = (overrideText = null) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
    if (recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch (e) {}
      recognizerRef.current = null;
    }

    setPracticeState('analyzing');

    const spokenText = overrideText !== null 
      ? overrideText 
      : (capturedTextRef.current || liveTranscript || '');

    setHeardSentence(spokenText);

    // Run NLP Engine
    const analysis = analyzeSanskritPronunciation(sentence.sanskrit, spokenText);

    setTimeout(() => {
      setCurrentScore(analysis.score);
      setCurrentFeedback(analysis.aiMessage);
      setCurrentDefect(
        analysis.isDifferentWord
          ? `Mismatched sentence: AI detected “${spokenText}” instead of “${sentence.sanskrit}”.`
          : sentence.defect
      );
      setPracticeState('result');
    }, 1100);
  };

  const handleManualTestSubmit = (e) => {
    e.preventDefault();
    if (!manualSentenceInput.trim()) return;
    stopAndAnalyze(manualSentenceInput.trim());
  };

  const handleTryAgain = () => {
    setPracticeState('ready');
  };

  const handleContinue = () => {
    const nextIdx = (selectedIdx + 1) % sentences.length;
    setSelectedIdx(nextIdx);
    setPracticeState('ready');
    if (onContinueSuccess) onContinueSuccess();
  };

  const handleSelectSentence = (idx) => {
    setSelectedIdx(idx);
    setPracticeState('ready');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
      if (recognizerRef.current) {
        try { recognizerRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="screen-scrollable">
      <div className="screen-header-block">
        <span className="screen-subtitle-tag">Vedic NLP Sentence Engine</span>
        <h2 className="screen-title">Speaking Practice</h2>
      </div>

      {/* Practice Sentence Card */}
      <div className="content-card practice-card">
        <div className="sentence-instruction">Say the sentence:</div>

        <div className="prominent-sentence-box">
          <div className="sanskrit-sentence">{sentence.sanskrit}</div>
          <div className="sentence-translation">“{sentence.meaning}”</div>
          <div className="sentence-phonetic-guide">{sentence.phonetics}</div>
        </div>

        <button
          type="button"
          className="btn-listen-sentence"
          onClick={handleListen}
          title="Listen to standard recitation"
        >
          <span className="btn-icon"></span> Listen to Sentence
        </button>
      </div>

      {/* Interactive Recording / State Machine Card */}
      <div className="content-card recording-state-card">
        {/* State 1: Ready to Record */}
        {practiceState === 'ready' && (
          <div className="state-container">
            <button
              type="button"
              className="btn-mic-large"
              onClick={startPracticeRecording}
            >
              <span className="mic-icon">[REC]</span>
              <span className="mic-label">Start Recording</span>
            </button>
            <p className="voice-instruction">Tap microphone and recite the sentence.</p>

            <div className="test-input-container">
              <span className="test-input-label">Sentence Simulation / Test:</span>
              <form onSubmit={handleManualTestSubmit} className="test-input-row">
                <input
                  type="text"
                  className="test-text-input"
                  placeholder="e.g. I am a doctor, student, random..."
                  value={manualSentenceInput}
                  onChange={(e) => setManualSentenceInput(e.target.value)}
                />
                <button type="submit" className="btn-test-submit">Test</button>
              </form>
            </div>
          </div>
        )}

        {/* State 2: Listening... */}
        {practiceState === 'listening' && (
          <div className="state-container">
            <div className="recording-badge-active">
              <span className="pulse-indicator"></span>
              <span>Listening...</span>
            </div>

            <div className="live-hearing-display">
              <span className="hearing-tag">Live Hearing:</span>
              <span className="hearing-content">
                {liveTranscript ? `“${liveTranscript}”` : "Speak the sentence into your microphone..."}
              </span>
            </div>

            <div className="rigid-audio-meter">
              {meterBars.map((height, i) => (
                <span
                  key={i}
                  className="meter-bar"
                  style={{ height: `${height}px` }}
                ></span>
              ))}
            </div>

            <button
              type="button"
              className="btn-secondary-flat"
              onClick={() => stopAndAnalyze()}
            >
              Stop & Analyze
            </button>
          </div>
        )}

        {/* State 3: Analyzing... */}
        {practiceState === 'analyzing' && (
          <div className="state-container">
            <div className="analyzing-spinner-box">
              <div className="spinner-rigid"></div>
              <div className="analyzing-text">Analyzing pronunciation...</div>
              <div className="analyzing-sub">Running acoustic phoneme comparison</div>
            </div>
          </div>
        )}

        {/* State 4: Evaluated Result */}
        {practiceState === 'result' && (
          <div className="state-container">
            <div className="practice-result-score-box">
              <span className="metric-label">Pronunciation Accuracy</span>
              <span className={`metric-score ${currentScore < 50 ? 'score-low' : ''}`}>
                {currentScore}%
              </span>
              <div className="progress-bar-track">
                <div
                  className={`progress-bar-fill ${currentScore < 50 ? 'fill-warn' : 'fill-secondary'}`}
                  style={{ width: `${Math.max(5, currentScore)}%` }}
                ></div>
              </div>
            </div>

            {heardSentence && (
              <div className="recognized-speech-row" style={{ margin: '8px 0 12px 0' }}>
                <span className="recognized-tag">What AI Heard:</span>
                <span className="recognized-value">“{heardSentence}”</span>
              </div>
            )}

            <div className="diagnostic-feedback-box">
              <div className={`feedback-badge ${currentScore < 50 ? 'error' : 'warning'}`}>
                {currentScore < 50 ? 'Mismatched Sentence' : 'Diagnostic Feedback'}
              </div>
              <p className="feedback-statement">{currentFeedback}</p>
              <div className="specific-defect-box">
                <span className="defect-bullet">[!]</span>
                <span className="defect-text">{currentDefect}</span>
              </div>
            </div>

            <div className="practice-actions-row">
              <button
                type="button"
                className="btn-primary-action btn-try-again"
                onClick={handleTryAgain}
              >
                Try Again
              </button>
              <button
                type="button"
                className="btn-secondary-flat"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sentence Selector Pill List */}
      <div className="content-card sentence-selector-card">
        <div className="card-section-label">Practice Library</div>
        <div className="sentence-pills">
          {sentences.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`sentence-pill ${idx === selectedIdx ? 'active' : ''}`}
              onClick={() => handleSelectSentence(idx)}
            >
              {idx + 1}. {s.sanskrit}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
