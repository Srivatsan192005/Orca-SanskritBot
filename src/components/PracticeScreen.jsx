import React, { useState, useEffect, useRef } from 'react';
import { playMultilingualSpeech, createSpeechRecognizer, analyzeSpeechPronunciation } from '../nlp/multiLingualNlp';
import { startAudioCapture, stopAudioCapture, playRecordedAudio, stopRecordedAudio } from '../utils/audioRecorder';
import { IconSpeaker, IconMic, IconStop, IconPlay, IconCheck, IconCross } from './Icons';

export default function PracticeScreen({
  activeLang,
  curriculum,
  onRecordAttempt
}) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stage, setStage] = useState('ready'); // 'ready' | 'listening' | 'analyzing' | 'result'
  const [liveTranscript, setLiveTranscript] = useState('');
  const [meterBars, setMeterBars] = useState([8, 16, 24, 32, 40, 20, 12, 28, 14]);
  const [evalResult, setEvalResult] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);

  const timerRef = useRef(null);
  const meterIntervalRef = useRef(null);
  const recognizerRef = useRef(null);
  const capturedTextRef = useRef('');

  const langData = curriculum[activeLang];
  const challenges = [
    ...langData.sentences.map(s => ({ type: 'Sentence', text: s.text, script: s.script, meaning: s.meaning, tip: s.tip })),
    ...langData.lessons[0].words.map(w => ({ type: 'Word', text: w.text, script: w.script, meaning: w.meaning, tip: w.focus }))
  ];

  const currentItem = challenges[challengeIdx] || challenges[0];

  useEffect(() => {
    setChallengeIdx(0);
    setStage('ready');
    setEvalResult(null);
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);
  }, [activeLang]);

  const handleListen = () => {
    playMultilingualSpeech(currentItem.text, activeLang);
  };

  const startPractice = async () => {
    setStage('listening');
    setLiveTranscript('');
    capturedTextRef.current = '';
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);

    await startAudioCapture();

    let tick = 0;
    meterIntervalRef.current = setInterval(() => {
      const heights = [10, 18, 28, 36, 44, 22, 14, 32, 16];
      setMeterBars(heights.map((_, i) => heights[(i + tick) % heights.length]));
      tick++;
    }, 110);

    try {
      const recognizer = createSpeechRecognizer({
        lang: activeLang,
        onInterim: (i) => {
          setLiveTranscript(i);
          capturedTextRef.current = i;
        },
        onResult: (f) => {
          setLiveTranscript(f);
          capturedTextRef.current = f;
        },
        onError: () => {},
        onEnd: () => {}
      });

      recognizerRef.current = recognizer;
      if (recognizer) recognizer.start();
    } catch (e) {}

    timerRef.current = setTimeout(() => {
      stopAndEvaluate();
    }, 4500);
  };

  const stopAndEvaluate = async (overrideText = null) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
    if (recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch (e) {}
      recognizerRef.current = null;
    }

    setStage('analyzing');

    const { audioUrl } = await stopAudioCapture();
    if (audioUrl) {
      setUserAudioUrl(audioUrl);
    }

    const spokenText = overrideText !== null
      ? overrideText
      : (capturedTextRef.current || liveTranscript || '');

    const result = analyzeSpeechPronunciation(currentItem.text, spokenText, activeLang);

    setTimeout(() => {
      setEvalResult(result);
      setStage('result');

      if (onRecordAttempt) {
        onRecordAttempt({
          wordText: currentItem.text,
          lang: activeLang,
          score: result.score,
          isDifferentWord: result.isDifferentWord,
          audioUrl: audioUrl || null
        });
      }
    }, 1100);
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

  const handleNextChallenge = () => {
    setChallengeIdx((prev) => (prev + 1) % challenges.length);
    setStage('ready');
    setEvalResult(null);
    setUserAudioUrl(null);
    stopRecordedAudio();
    setIsPlayingUserAudio(false);
  };

  const handleManualTest = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    stopAndEvaluate(manualInput.trim());
    setManualInput('');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
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
            {langData.name} Oral Diagnostic Studio
          </span>
          <h2 className="module-heading">Oral Speaking & Pronunciation Practice</h2>
        </div>
        <div className="challenge-counter">
          Challenge {challengeIdx + 1} of {challenges.length}
        </div>
      </div>

      <div className="practice-full-layout">
        <div className="academic-card practice-hero-card">
          <div className="card-top-tag-row">
            <span className="challenge-tag">{currentItem.type} Recitation Challenge</span>
            <span className="tip-tag">Goal: Accurate Phoneme Realization</span>
          </div>

          <div className="practice-target-box">
            <div className="practice-target-glyph font-devanagari">
              {currentItem.text}
            </div>
            <div className="practice-target-script">{currentItem.script}</div>
            <div className="practice-target-meaning">“{currentItem.meaning}”</div>
          </div>

          <div className="practice-audio-buttons-row">
            <button
              type="button"
              className="btn-academic-listen"
              onClick={handleListen}
            >
              <IconSpeaker size={16} />
              <span>Listen Reference Audio</span>
            </button>
          </div>

          {/* Interactive State Engine */}
          <div className="practice-state-machine-box">
            
            {/* Stage 1: Ready */}
            {stage === 'ready' && (
              <div className="stage-content">
                <button
                  type="button"
                  className="btn-large-mic-practice"
                  onClick={startPractice}
                >
                  <IconMic size={28} />
                  <span className="mic-text-large">Start Voice Recording</span>
                </button>
                <p className="stage-instruction-sub">
                  Tap microphone, recite the {currentItem.type.toLowerCase()} aloud, and rehear your recorded speech.
                </p>

                <div className="test-simulation-strip">
                  <span className="sim-label">Text Simulation Input:</span>
                  <form onSubmit={handleManualTest} className="sim-form">
                    <input
                      type="text"
                      className="sim-input"
                      placeholder="Type phrase to test NLP acoustic grading..."
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                    />
                    <button type="submit" className="btn-sim-test">Run NLP Grading</button>
                  </form>
                </div>
              </div>
            )}

            {/* Stage 2: Listening */}
            {stage === 'listening' && (
              <div className="stage-content listening-stage">
                <div className="listening-badge-pulse">
                  <span className="pulse-indicator"></span>
                  <span>Recording & Listening... Speak into microphone</span>
                </div>

                <div className="live-hearing-bubble">
                  <span className="hearing-tag">Live Hearing:</span>
                  <span className="hearing-text">
                    {liveTranscript ? `“${liveTranscript}”` : "Recite now..."}
                  </span>
                </div>

                <div className="meter-bars-row">
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
                  className="btn-academic-stop"
                  onClick={() => stopAndEvaluate()}
                >
                  <IconStop size={16} />
                  <span>Stop Recording & Grade</span>
                </button>
              </div>
            )}

            {/* Stage 3: Analyzing */}
            {stage === 'analyzing' && (
              <div className="stage-content analyzing-stage">
                <div className="spinner-rigid-academic"></div>
                <h4 className="analyzing-heading">Analyzing Speech Waveform...</h4>
                <p className="analyzing-details">
                  Segmenting phonological units and computing acoustic edit distance against native model.
                </p>
              </div>
            )}

            {/* Stage 4: Result */}
            {stage === 'result' && evalResult && (
              <div className="stage-content result-stage">
                <div className="result-header-row">
                  <div className="result-score-block">
                    <span className="result-score-num">{evalResult.score}%</span>
                    <span className="result-score-label">Pronunciation Accuracy</span>
                  </div>
                  <div className="result-status-block">
                    <span className="result-status-tag">{evalResult.evaluation}</span>
                  </div>
                </div>

                <div className="hearing-audit-box">
                  <span className="audit-label">What AI Heard:</span>
                  <span className="audit-value">“{evalResult.rawRecognized}”</span>
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
                        title="Replay your recorded attempt"
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

                <div className="diagnostics-checklist">
                  <span className="checklist-title">Acoustic Check:</span>
                  <ul>
                    {evalResult.checks.map((chk, i) => (
                      <li key={i} className={chk.pass ? 'pass' : 'fail'}>
                        <span className="check-icon">
                          {chk.pass ? <IconCheck size={14} /> : <IconCross size={14} />}
                        </span>
                        <span className="check-text">{chk.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`ai-feedback-quote-box ${evalResult.isDifferentWord ? 'warn-theme' : ''}`}>
                  <div className="quote-badge">AI Corrective Feedback</div>
                  <p className="quote-body">{evalResult.aiMessage}</p>
                </div>

                <div className="result-actions-strip">
                  <button
                    type="button"
                    className="btn-academic-listen"
                    onClick={() => { setStage('ready'); setEvalResult(null); }}
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    className="btn-academic-record"
                    onClick={handleNextChallenge}
                  >
                    Next Challenge →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
