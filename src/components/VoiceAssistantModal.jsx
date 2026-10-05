import React, { useState, useEffect, useRef } from 'react';
import {
  processUserVoiceQuery,
  speakVoiceBotResponse,
  stopVoiceBotSpeech,
  createMultilingualVoiceBotListener
} from '../nlp/sanskritVoiceBotEngine';
import { playSanskritSpeech } from '../nlp/sanskritNlp';
import { IconSpeaker, IconMic, IconCross } from './Icons';

export default function VoiceAssistantModal({
  isOpen,
  onClose,
  onSwitchToPractice
}) {
  const tutorName = 'AI Sanskrit Guru (संस्कृत गुरु)';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: 'Namaste! Welcome to your Sanskrit voice session. Speak to me in any language (English, Hindi, or Sanskrit) to ask questions or practice pronunciation.',
      actions: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListeningMic, setIsListeningMic] = useState(false);
  const dialogueEndRef = useRef(null);

  useEffect(() => {
    if (dialogueEndRef.current) {
      dialogueEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend = null) => {
    const query = textToSend !== null ? textToSend : inputValue;
    if (!query || !query.trim()) return;

    const cleanQ = query.trim();
    setInputValue('');

    const userMsg = {
      id: Date.now(),
      sender: 'User',
      text: cleanQ,
      actions: null
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const result = processUserVoiceQuery(cleanQ);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'AI',
        text: result.replyText,
        actions: result.sanskritCard ? [
          {
            label: `Listen "${result.sanskritCard.text}"`,
            onClick: () => playSanskritSpeech(result.sanskritCard.text)
          },
          {
            label: 'Practice in Studio',
            onClick: () => {
              onClose();
              if (onSwitchToPractice) onSwitchToPractice('words');
            }
          }
        ] : null
      };

      setMessages((prev) => [...prev, botMsg]);

      // Speak answer aloud
      if (result.speechText) {
        speakVoiceBotResponse(result.speechText);
      }
    }, 350);
  };

  const handleMicClick = () => {
    setIsListeningMic(true);
    let captured = '';

    try {
      const recognizer = createMultilingualVoiceBotListener({
        inputLang: 'en-IN',
        onInterim: (text) => { captured = text; },
        onResult: (text) => { captured = text; },
        onError: () => {},
        onEnd: () => {
          setIsListeningMic(false);
          if (captured) {
            handleSendMessage(captured);
          } else {
            handleSendMessage('Teach me a Sanskrit greeting.');
          }
        }
      });

      if (recognizer) {
        recognizer.start();
        setTimeout(() => {
          try { recognizer.stop(); } catch (e) {}
        }, 3500);
      } else {
        setTimeout(() => {
          setIsListeningMic(false);
          handleSendMessage('Teach me a Sanskrit greeting.');
        }, 1200);
      }
    } catch (e) {
      setTimeout(() => {
        setIsListeningMic(false);
        handleSendMessage('Teach me a Sanskrit greeting.');
      }, 1200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="assistant-modal open" role="dialog" aria-modal="true">
      <div className="assistant-modal-backdrop" onClick={onClose}></div>
      <div className="assistant-modal-window modal-full-page-styled">
        
        {/* Header */}
        <div className="assistant-header">
          <div className="assistant-title-group">
            <span className="assistant-name">{tutorName}</span>
            <span className="status-indicator">
              <span className="status-dot"></span> Sanskrit Engine Ready
            </span>
          </div>
          <button
            type="button"
            className="btn-close-modal"
            onClick={() => {
              stopVoiceBotSpeech();
              onClose();
            }}
            aria-label="Close Assistant"
          >
            <IconCross size={16} />
          </button>
        </div>

        {/* Dialogue Body */}
        <div className="assistant-dialogue-body">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.sender === 'AI' ? 'msg-ai' : 'msg-user'}`}
            >
              <div className="msg-sender">{msg.sender}</div>
              <div
                className="msg-bubble"
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}
              />
              {msg.actions && msg.actions.length > 0 && (
                <div className="msg-action-chips">
                  {msg.actions.map((act, i) => (
                    <button
                      key={i}
                      type="button"
                      className="btn-action-chip"
                      onClick={act.onClick}
                    >
                      <IconSpeaker size={12} />
                      <span>{act.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={dialogueEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="assistant-quick-prompts">
          <button
            type="button"
            className="btn-mini-prompt"
            onClick={() => handleSendMessage('Teach me a Sanskrit greeting.')}
          >
            “Teach Sanskrit Greeting”
          </button>
          <button
            type="button"
            className="btn-mini-prompt"
            onClick={() => handleSendMessage('How to say water in Sanskrit?')}
          >
            “Water in Sanskrit”
          </button>
          <button
            type="button"
            className="btn-mini-prompt"
            onClick={() => handleSendMessage('What does Namaste mean?')}
          >
            “Meaning of Namaste”
          </button>
          <button
            type="button"
            className="btn-mini-prompt"
            onClick={() => handleSendMessage('Teach me Sanskrit numbers 1 to 5.')}
          >
            “Numbers 1 to 5”
          </button>
        </div>

        {/* Voice & Text Input Footer */}
        <div className="assistant-footer">
          <button
            type="button"
            className={`btn-assistant-mic ${isListeningMic ? 'listening-pulse' : ''}`}
            onClick={handleMicClick}
            title="Tap to speak in English, Hindi, or Sanskrit"
          >
            <IconMic size={18} />
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="assistant-input-form"
          >
            <input
              type="text"
              className="assistant-text-field"
              placeholder="Ask anything about Sanskrit..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="btn-assistant-send"
              disabled={!inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
