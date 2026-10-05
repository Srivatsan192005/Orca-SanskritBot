import React, { useState, useEffect, useRef } from 'react';
import { playMultilingualSpeech, createSpeechRecognizer, analyzeSpeechPronunciation } from '../nlp/multiLingualNlp';
import { startAudioCapture, stopAudioCapture, playRecordedAudio, stopRecordedAudio } from '../utils/audioRecorder';
import { IconSpeaker, IconMic, IconStop, IconPlay, IconCheck, IconCross } from './Icons';

export default function SentencesScreen({
  activeLang,
  curriculum,
  onRecordAttempt
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [meterWidth, setMeterWidth] = useState(30);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);

  const meterIntervalRef = useRef(null);
  const recognizerRef = useRef(null);
  const capturedTextRef = useRef('');
  const timeoutRef = useRef(null);

  const langData = curriculum[activeLang];
  const sentences = langData.sentences;
  const sentence = sentences[selectedIdx] || sentences[0];

  useEffect(() => {
    setSelectedIdx(0);
    setAnalysisResult(null);
    setLiveTranscript('');
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);
  }, [activeLang]);

  useEffect(() => {
    setAnalysisResult(null);
    setLiveTranscript('');
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);
  }, [selectedIdx]);

  const handleListen = () => {
    playMultilingualSpeech(sentence.text, activeLang);
  };

  const startSentenceRecording = async () => {
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
      setMeterWidth(20 + Math.sin(step) * 60);
    }, 110);

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
        onError: () => {},
        onEnd: () => {}
      });

      recognizerRef.current = recognizer;
      if (recognizer) recognizer.start();
    } catch (e) {}

    timeoutRef.current = setTimeout(() => {
      stopAndAnalyze();
    }, 5000);
  };

  const stopAndAnalyze = async (overrideText = null) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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

    const result = analyzeSpeechPronunciation(sentence.text, spokenText, activeLang);
    setAnalysisResult(result);

    if (onRecordAttempt) {
      onRecordAttempt({
        wordText: sentence.text,
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
    stopAndAnalyze(manualInput.trim());
    setManualInput('');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
      if (recognizerRef.current) {
        try { recognizerRef.current.stop(); } catch (e) {}
      }
      stopRecordedAudio();
    };
  }, []);

  return (
    <div className="full-page-module-container">
      <div className="module-title-bar academic-refined-header">
        <div>
          <span className="module-subtag">
            {langData.name} Sentence Mastery Studio
          </span>
          <h2 className="module-heading">Sentential Cadence & Speech Flow</h2>
        </div>

        <div className="sentence-counter-badge">
          Sentence {selectedIdx + 1} of {sentences.length}
        </div>
      </div>

      <div className="module-two-columns">
        {/* Main Sentence Card */}
        <div className="column-main">
          <div className="academic-card prominent-sentence-card">
            <span className="section-label-tiny">Target Sentence:</span>

            <div className="hero-sentence-area">
              <div className="hero-sentence-glyph font-devanagari">
                {sentence.text}
              </div>
              <div className="hero-sentence-script">{sentence.script}</div>
              <div className="hero-sentence-meaning">“{sentence.meaning}”</div>
            </div>

            <div className="sentence-tip-box">
              <span className="tip-badge">Cadence Note:</span>
              <span className="tip-text">{sentence.tip}</span>
            </div>

            {/* Listen & Record Row */}
            <div className="interactive-controls-strip">
              <button
                type="button"
                className="btn-academic-listen"
                onClick={handleListen}
              >
                <IconSpeaker size={16} />
                <span>Listen Native Recitation</span>
              </button>

              {!isRecording ? (
                <button
                  type="button"
                  className="btn-academic-record"
                  onClick={startSentenceRecording}
                >
                  <IconMic size={16} />
                  <span>Recite Sentence</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-academic-stop"
                  onClick={() => stopAndAnalyze()}
                >
                  <IconStop size={16} />
                  <span>Stop & Check Sentence</span>
                </button>
              )}
            </div>

            {/* Live Recording Status */}
            {isRecording && (
              <div className="active-recording-panel">
                <div className="recording-status-line">
                  <span className="pulse-indicator"></span>
                  <span className="status-text">Recording audio & analyzing sentence recitation...</span>
                </div>

                <div className="live-hearing-bubble">
                  <span className="hearing-tag">Live Hearing:</span>
                  <span className="hearing-text">
                    {liveTranscript ? `“${liveTranscript}”` : "Speak the complete sentence now..."}
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

            {/* Simulation Input */}
            <div className="test-simulation-strip">
              <span className="sim-label">Text Simulation Input:</span>
              <form onSubmit={handleManualTest} className="sim-form">
                <input
                  type="text"
                  className="sim-input"
                  placeholder="Type sentence to test NLP scoring..."
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                />
                <button type="submit" className="btn-sim-test">Run NLP Analysis</button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Sentence Feedback & Rehear My Voice */}
        <div className="column-sidebar">
          {analysisResult ? (
            <div className="academic-card analysis-result-card">
              <div className="card-header-bar">
                <span className="card-heading-tag">Sentence Pronunciation Check</span>
                <span
                  className={`score-badge ${
                    analysisResult.score >= 80 ? 'good' : analysisResult.score >= 50 ? 'mid' : 'low'
                  }`}
                >
                  {analysisResult.score}%
                </span>
              </div>

              <div className="hearing-audit-box">
                <span className="audit-label">What AI Heard:</span>
                <span className="audit-value">“{analysisResult.rawRecognized}”</span>
              </div>

              {/* Rehear My Voice Studio */}
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
                    <span>Standard Reference</span>
                  </button>
                </div>
              </div>

              <div className="eval-status-row">
                <span className="eval-label">Evaluation:</span>
                <span
                  className={`eval-pill ${
                    analysisResult.score >= 80 ? 'pill-good' : analysisResult.score >= 50 ? 'pill-mid' : 'pill-low'
                  }`}
                >
                  {analysisResult.evaluation}
                </span>
              </div>

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

              <div className="ai-feedback-quote-box">
                <div className="quote-badge">AI Feedback</div>
                <p className="quote-body">{analysisResult.aiMessage}</p>
              </div>

              <button
                type="button"
                className="btn-try-again-large"
                onClick={startSentenceRecording}
              >
                <IconMic size={15} />
                <span>Recite Again</span>
              </button>
            </div>
          ) : (
            <div className="academic-card prompt-card">
              <div className="prompt-badge-indicator">Sentence Studio</div>
              <h3 className="prompt-title">Sentence Practice</h3>
              <p className="prompt-desc">
                Select any sentence below, listen to the native speech flow, and recite it. Your speech is temporarily stored so you can rehear your accent immediately.
              </p>
            </div>
          )}

          {/* Sentence Library */}
          <div className="academic-card word-list-sidebar-card">
            <span className="card-heading-tag">Curriculum Sentences</span>
            <div className="sidebar-word-items">
              {sentences.map((s, idx) => (
                <div
                  key={s.id}
                  className={`sidebar-word-item ${idx === selectedIdx ? 'active' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <span className="item-num">{idx + 1}.</span>
                  <div className="item-text-group">
                    <span className="item-main">{s.text}</span>
                    <span className="item-sub">{s.meaning}</span>
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
