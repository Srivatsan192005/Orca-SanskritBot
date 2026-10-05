import React, { useState, useEffect, useRef } from 'react';
import {
  processUserVoiceQuery,
  speakVoiceBotResponse,
  stopVoiceBotSpeech,
  createMultilingualVoiceBotListener
} from '../nlp/sanskritVoiceBotEngine';
import { playSanskritSpeech } from '../nlp/sanskritNlp';
import { IconSpeaker, IconMic, IconStop, IconPlay, IconCheck, IconRefresh } from './Icons';

export default function VoiceBotStudio({ onNavigateToPractice, onRecordAttempt }) {
  // Conversational state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: "Namaste! I am your **AI Sanskrit Guru (संस्कृत गुरु)**. You can speak to me in **any language** (English, Hindi, or Sanskrit).\n\nAsk me how to say words, translate sentences, explain grammar rules, or recite Sanskrit phrases to check your pronunciation!",
      speechText: "Namaste! I am your AI Sanskrit Guru. Speak to me in any language. Ask me for words, sentences, or recite phrases to check your pronunciation.",
      sanskritCard: {
        text: "नमस्ते",
        script: "na-ma-ste",
        meaning: "Hello / I bow to you",
        focus: "Foundational Vedic greeting"
      },
      time: "Just now"
    }
  ]);

  // Voice & Interaction states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isContinuousMode, setIsContinuousMode] = useState(false);
  const [autoSpeakReplies, setAutoSpeakReplies] = useState(true);
  const [inputLang, setInputLang] = useState('en-IN'); // 'en-IN' | 'hi-IN' | 'sa-IN' | 'en-US'
  const [liveTranscript, setLiveTranscript] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [meterBars, setMeterBars] = useState([12, 24, 18, 30, 16, 22, 28]);

  const recognizerRef = useRef(null);
  const capturedTextRef = useRef('');
  const messagesEndRef = useRef(null);
  const isContinuousModeRef = useRef(isContinuousMode);
  const autoSpeakRef = useRef(autoSpeakReplies);
  const meterIntervalRef = useRef(null);
  const isComponentMounted = useRef(true);

  // Keep refs synchronized
  useEffect(() => {
    isContinuousModeRef.current = isContinuousMode;
  }, [isContinuousMode]);

  useEffect(() => {
    autoSpeakRef.current = autoSpeakReplies;
  }, [autoSpeakReplies]);

  // Auto scroll conversation to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, liveTranscript, isListening]);

  // Cleanup on unmount
  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
      stopVoiceBotSpeech();
      if (recognizerRef.current) {
        try { recognizerRef.current.stop(); } catch (e) {}
      }
      if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
    };
  }, []);

  /**
   * Start Voice Listener
   */
  const startListening = () => {
    stopVoiceBotSpeech();
    setIsSpeaking(false);
    setIsListening(true);
    setLiveTranscript('');
    capturedTextRef.current = '';

    // Animate audio waveform
    if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
    meterIntervalRef.current = setInterval(() => {
      setMeterBars([
        Math.floor(10 + Math.random() * 30),
        Math.floor(15 + Math.random() * 35),
        Math.floor(12 + Math.random() * 40),
        Math.floor(20 + Math.random() * 45),
        Math.floor(14 + Math.random() * 38),
        Math.floor(18 + Math.random() * 32),
        Math.floor(10 + Math.random() * 25)
      ]);
    }, 100);

    const recognizer = createMultilingualVoiceBotListener({
      inputLang: inputLang,
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
      onEnd: () => {
        setIsListening(false);
        if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
        const finalSpoken = capturedTextRef.current.trim();
        if (finalSpoken) {
          handleProcessQuery(finalSpoken);
        } else {
          setLiveTranscript('');
          if (isContinuousModeRef.current) {
            // Wait slightly before retry in continuous mode
            setTimeout(() => {
              if (isComponentMounted.current && isContinuousModeRef.current) {
                startListening();
              }
            }, 1200);
          }
        }
      }
    });

    recognizerRef.current = recognizer;
    if (recognizer) {
      try {
        recognizer.start();
      } catch (e) {
        console.warn("Speech recognizer start error:", e);
        setIsListening(false);
      }
    } else {
      setIsListening(false);
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or enter text below.");
    }
  };

  /**
   * Stop Voice Listener Manually
   */
  const stopListening = () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
  };

  /**
   * Process Question & Reply via Voice
   */
  const handleProcessQuery = (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const cleanText = queryText.trim();
    setLiveTranscript('');
    setManualInput('');

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add User Message
    const userMessage = {
      id: Date.now(),
      sender: 'User',
      text: cleanText,
      time: timeStr
    };

    setMessages((prev) => [...prev, userMessage]);

    // 2. Process with Sanskrit Voice Bot NLP Engine
    const botAnalysis = processUserVoiceQuery(cleanText);

    // 3. Record attempt in stats if it was a pronunciation test
    if (botAnalysis.type === 'pronunciation_feedback' && botAnalysis.sanskritCard && onRecordAttempt) {
      onRecordAttempt({
        wordText: botAnalysis.sanskritCard.text,
        lang: 'sanskrit',
        score: botAnalysis.sanskritCard.score || 85,
        isDifferentWord: false,
        audioUrl: null
      });
    }

    // 4. Add Bot Message after short realistic thought interval
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'AI',
        text: botAnalysis.replyText,
        speechText: botAnalysis.speechText,
        sanskritCard: botAnalysis.sanskritCard,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);

      // 5. Bot Speaks Out Loud (The key feature: "it speaks when i speak and replies to me")
      if (autoSpeakRef.current && botAnalysis.speechText) {
        setIsSpeaking(true);
        speakVoiceBotResponse(botAnalysis.speechText, {
          onStart: () => {
            setIsSpeaking(true);
          },
          onEnd: () => {
            setIsSpeaking(false);
            // Continuous Dialogue Loop: If continuous mode is enabled, re-arm the mic!
            if (isContinuousModeRef.current && isComponentMounted.current) {
              setTimeout(() => {
                if (isContinuousModeRef.current && isComponentMounted.current) {
                  startListening();
                }
              }, 800);
            }
          }
        });
      } else if (isContinuousModeRef.current && isComponentMounted.current) {
        setTimeout(() => {
          if (isContinuousModeRef.current && isComponentMounted.current) {
            startListening();
          }
        }, 1200);
      }
    }, 380);
  };

  /**
   * Replay Bot Audio
   */
  const handleReplayBotSpeech = (speechText) => {
    if (!speechText) return;
    setIsSpeaking(true);
    speakVoiceBotResponse(speechText, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false)
    });
  };

  /**
   * Stop Speech
   */
  const handleStopSpeech = () => {
    stopVoiceBotSpeech();
    setIsSpeaking(false);
  };

  /**
   * Listen to Sanskrit reference
   */
  const handleListenSanskrit = (sanskritText) => {
    stopVoiceBotSpeech();
    setIsSpeaking(false);
    playSanskritSpeech(sanskritText);
  };

  /**
   * Quick Prompt Click
   */
  const handlePromptClick = (prompt) => {
    handleProcessQuery(prompt);
  };

  /**
   * Manual Submit Form
   */
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    handleProcessQuery(manualInput.trim());
  };

  return (
    <div className="full-page-module-container voice-bot-studio-root">
      {/* Top Academic Subheader */}
      <div className="module-title-bar academic-refined-header">
        <div>
          <span className="module-subtag">
            Conversational Sanskrit Voice Engine & Tutor
          </span>
          <h2 className="module-heading">AI Sanskrit Guru (संस्कृत वाग्-गुरु)</h2>
        </div>

        {/* Input Language & Speech Controls */}
        <div className="bot-controls-header-strip">
          {/* Spoken Language Selector */}
          <div className="input-lang-selector-group">
            <label htmlFor="botInputLang" className="bot-ctrl-label">
              You Speak In:
            </label>
            <div className="custom-select-container">
              <select
                id="botInputLang"
                className="academic-select-refined select-small"
                value={inputLang}
                onChange={(e) => setInputLang(e.target.value)}
              >
                <option value="en-IN">Indian English / Hinglish (en-IN)</option>
                <option value="hi-IN">Hindi (हिन्दी - hi-IN)</option>
                <option value="sa-IN">Sanskrit (संस्कृतम् - sa-IN)</option>
                <option value="en-US">Standard English (en-US)</option>
              </select>
            </div>
          </div>

          {/* Continuous Loop Toggle */}
          <button
            type="button"
            className={`btn-continuous-toggle ${isContinuousMode ? 'active' : ''}`}
            onClick={() => setIsContinuousMode(!isContinuousMode)}
            title="When active, the bot automatically listens after replying"
          >
            <span className="toggle-indicator-dot"></span>
            <span>{isContinuousMode ? 'Continuous Voice: ON' : 'Continuous Voice: OFF'}</span>
          </button>

          {/* Auto Speak Toggle */}
          <button
            type="button"
            className={`btn-auto-speak-toggle ${autoSpeakReplies ? 'active' : ''}`}
            onClick={() => setAutoSpeakReplies(!autoSpeakReplies)}
            title="Automatically speak bot replies out loud"
          >
            <IconSpeaker size={14} />
            <span>{autoSpeakReplies ? 'Auto-Voice: ON' : 'Auto-Voice: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="module-two-columns bot-layout-two-columns">
        
        {/* Left Column: Conversational Timeline */}
        <div className="column-main bot-dialogue-column">
          <div className="academic-card bot-chat-container">
            <div className="bot-chat-header-bar">
              <span className="chat-title-badge">
                Live Sanskrit Voice Dialogue Session
              </span>
              {isSpeaking && (
                <button
                  type="button"
                  className="btn-stop-speech-mini"
                  onClick={handleStopSpeech}
                  title="Stop AI speech"
                >
                  <IconStop size={12} />
                  <span>Stop Speaking</span>
                </button>
              )}
            </div>

            {/* Conversation Messages */}
            <div className="dialogue-messages-scroll" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender === 'AI' ? 'row-ai' : 'row-user'}`}
                >
                  <div className="chat-avatar-badge">
                    {msg.sender === 'AI' ? 'GURU' : 'YOU'}
                  </div>

                  <div className={`chat-bubble ${msg.sender === 'AI' ? 'bubble-ai' : 'bubble-user'}`}>
                    <div className="chat-bubble-top-meta">
                      <span className="bubble-sender-name">
                        {msg.sender === 'AI' ? 'AI Sanskrit Guru' : 'You (Learner)'}
                      </span>
                      <span className="bubble-timestamp">{msg.time}</span>
                    </div>

                    <div className="bubble-text-content">
                      {msg.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split('**').map((chunk, cIdx) => 
                            cIdx % 2 === 1 ? <strong key={cIdx}>{chunk}</strong> : chunk
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Interactive Sanskrit Flashcard (Embedded in Bot Reply) */}
                    {msg.sanskritCard && (
                      <div className="bot-sanskrit-card">
                        <div className="sanskrit-card-header">
                          <span className="card-badge-small">Sanskrit Concept</span>
                          {msg.sanskritCard.score && (
                            <span className="score-badge-inline">
                              Score: {msg.sanskritCard.score}%
                            </span>
                          )}
                        </div>

                        <div className="sanskrit-card-main-display">
                          <div className="sanskrit-card-glyph font-devanagari">
                            {msg.sanskritCard.text}
                          </div>
                          <div className="sanskrit-card-iast">
                            {msg.sanskritCard.script}
                          </div>
                          <div className="sanskrit-card-meaning">
                            “{msg.sanskritCard.meaning}”
                          </div>
                        </div>

                        {msg.sanskritCard.focus && (
                          <div className="sanskrit-card-note">
                            <strong>Note:</strong> {msg.sanskritCard.focus}
                          </div>
                        )}

                        <div className="sanskrit-card-actions">
                          <button
                            type="button"
                            className="btn-card-listen"
                            onClick={() => handleListenSanskrit(msg.sanskritCard.text)}
                            title="Hear authentic Sanskrit pronunciation"
                          >
                            <IconSpeaker size={14} />
                            <span>Listen Reference</span>
                          </button>

                          {onNavigateToPractice && (
                            <button
                              type="button"
                              className="btn-card-practice"
                              onClick={() => onNavigateToPractice(msg.sanskritCard.text)}
                              title="Practice speaking this word with real-time scoring"
                            >
                              <span>Practice In Studio</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Spoken Audio Replay for Bot Message */}
                    {msg.sender === 'AI' && msg.speechText && (
                      <div className="bubble-actions-row">
                        <button
                          type="button"
                          className="btn-replay-message"
                          onClick={() => handleReplayBotSpeech(msg.speechText)}
                          title="Replay bot voice explanation"
                        >
                          <IconSpeaker size={13} />
                          <span>Rehear Bot Explanation</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Real-Time Live Transcript Preview */}
              {isListening && (
                <div className="chat-bubble-row row-user listening-preview-row">
                  <div className="chat-avatar-badge listening">MIC</div>
                  <div className="chat-bubble bubble-user preview-listening-bubble">
                    <span className="preview-label">Listening in real-time...</span>
                    <p className="preview-text">
                      {liveTranscript || "Speak now into your microphone..."}
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Keyboard Fallback Input */}
            <form onSubmit={handleManualSubmit} className="bot-chat-input-bar">
              <input
                type="text"
                className="academic-text-input"
                placeholder="Or type your question in English, Hindi, or Sanskrit..."
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
              />
              <button
                type="submit"
                className="btn-academic-secondary"
                disabled={!manualInput.trim()}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Prominent Voice Interaction Station */}
        <div className="column-sidebar bot-interaction-column">
          
          {/* Main Microphone Console Card */}
          <div className="academic-card voice-action-console">
            <span className="section-label-tiny">Interactive Voice Console</span>

            <div className="mic-interactive-center">
              {!isListening ? (
                <button
                  type="button"
                  className="btn-giant-voice-mic"
                  onClick={startListening}
                  title="Click and speak your question in any language"
                >
                  <IconMic size={44} />
                  <span className="mic-action-title">Tap to Speak</span>
                  <span className="mic-action-subtitle">
                    Speak in English, Hindi, or Sanskrit
                  </span>
                </button>
              ) : (
                <div className="mic-listening-active-box">
                  <button
                    type="button"
                    className="btn-giant-voice-mic recording-pulse"
                    onClick={stopListening}
                    title="Click to stop listening and get answer"
                  >
                    <IconStop size={40} />
                    <span className="mic-action-title">Listening...</span>
                    <span className="mic-action-subtitle">
                      Tap when done speaking
                    </span>
                  </button>

                  {/* Audio Waveform Meter */}
                  <div className="voice-meter-row">
                    {meterBars.map((height, idx) => (
                      <span
                        key={idx}
                        className="voice-meter-bar"
                        style={{ height: `${height}px` }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Voice Status Indicator */}
            <div className="voice-status-banner">
              {isListening ? (
                <div className="status-live-item listening">
                  <span className="status-dot-pulse"></span>
                  <span>Microphone Active — Listening for speech...</span>
                </div>
              ) : isSpeaking ? (
                <div className="status-live-item speaking">
                  <span className="status-dot-pulse green"></span>
                  <span>AI Guru is speaking out loud...</span>
                </div>
              ) : (
                <div className="status-live-item ready">
                  <span className="status-dot ready"></span>
                  <span>Voice Bot Ready. Ask anything about Sanskrit.</span>
                </div>
              )}
            </div>

            {isContinuousMode && (
              <div className="continuous-hint-box">
                <strong>Continuous Mode Active:</strong> After the Guru finishes speaking, the microphone will automatically reopen for your next question.
              </div>
            )}
          </div>

          {/* Quick Voice Prompt Suggestions Card */}
          <div className="academic-card prompt-suggestions-card">
            <span className="section-label-tiny">Suggested Questions & Prompts</span>
            <p className="suggestions-intro">
              Click or speak any of these questions to test the voice engine:
            </p>

            <div className="prompt-chips-list">
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("How do I say 'Thank you' in Sanskrit?")}
              >
                “How do I say 'Thank you' in Sanskrit?”
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("What is water in Sanskrit?")}
              >
                “What is water in Sanskrit?” (जलम्)
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("Translate 'I am a student' into Sanskrit")}
              >
                “Translate: 'I am a student'”
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("What are the numbers from 1 to 10 in Sanskrit?")}
              >
                “Numbers 1 to 10 in Sanskrit”
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("What does Namaste mean?")}
              >
                “What does 'Namaste' mean?”
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("What is a Visarga in Sanskrit phonetics?")}
              >
                “What is a Visarga (ः)?”
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("Teach me a sacred Vedic shloka")}
              >
                “Teach me a sacred Vedic shloka”
              </button>
              <button
                type="button"
                className="btn-prompt-chip"
                onClick={() => handlePromptClick("How do I ask 'What is your name?' in Sanskrit?")}
              >
                “How do I ask 'What is your name?'”
              </button>
            </div>
          </div>

          {/* Pedagogical Capabilities Card */}
          <div className="academic-card bot-info-card">
            <span className="section-label-tiny">Voice Engine Capabilities</span>
            <ul className="academic-checklist-compact">
              <li>
                <IconCheck size={13} className="text-success" />
                <span>Understands spoken English, Hindi, and Sanskrit queries.</span>
              </li>
              <li>
                <IconCheck size={13} className="text-success" />
                <span>Speaks answers back out loud with authentic Vedic phonetics.</span>
              </li>
              <li>
                <IconCheck size={13} className="text-success" />
                <span>Analyzes spoken pronunciation with acoustic alignment.</span>
              </li>
              <li>
                <IconCheck size={13} className="text-success" />
                <span>Provides instant links to practice any concept in the studio.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
