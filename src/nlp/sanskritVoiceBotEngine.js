/**
 * Sanskrit Voice Bot Conversational & NLP Engine
 * Project: AI-Enabled Technologies for Sanskrit using Natural Language Processing
 * 
 * Features:
 * 1. Multilingual Natural Language Processing (English, Hindi, Sanskrit, Hinglish)
 * 2. Instant Intent Classification (Vocabulary lookup, sentence translation, pronunciation testing, grammar, shlokas)
 * 3. Text-To-Speech (TTS) Voice Synthesis for automated verbal responses
 * 4. Continuous Voice Interaction Loop (Listens -> Thinks -> Speaks -> Listens)
 * 5. Integrated Acoustic Pronunciation Scoring
 */

import { SANSKRIT_VOICE_KNOWLEDGE_BASE, SANSKRIT_CURRICULUM } from '../data/sanskritCurriculum';
import { analyzeSanskritPronunciation, devanagariToIast } from './sanskritNlp';

/**
 * Clean & normalize query text
 */
function cleanQuery(text) {
  if (!text) return '';
  return text.toLowerCase().trim().replace(/[?!.,'"]/g, '');
}

/**
 * Core query matching engine
 */
export function processUserVoiceQuery(userText) {
  if (!userText || !userText.trim()) {
    return {
      replyText: "I could not hear any speech clearly. Please tap the microphone and speak your question.",
      speechText: "I could not hear any speech clearly. Please speak your question.",
      sanskritCard: null,
      type: "empty"
    };
  }

  const raw = userText.trim();
  const lower = cleanQuery(raw);

  // ----------------------------------------------------
  // 1. CHECK IF USER IS ATTEMPTING PRONUNCIATION OF A KNOWN SANSKRIT ITEM
  // ----------------------------------------------------
  // Look through curriculum words & sentences
  let matchedTarget = null;
  let targetType = 'word';

  for (const lesson of SANSKRIT_CURRICULUM.lessons) {
    for (const w of lesson.words) {
      const wDev = cleanQuery(w.text);
      const wIast = cleanQuery(w.script);
      const wMeaning = cleanQuery(w.meaning);
      
      // If user directly recited the word
      if (lower === wDev || lower === wIast || lower.includes(wIast) || lower === wMeaning) {
        matchedTarget = w;
        targetType = 'word';
        break;
      }
    }
    if (matchedTarget) break;
  }

  if (!matchedTarget) {
    for (const s of SANSKRIT_CURRICULUM.sentences) {
      const sDev = cleanQuery(s.text);
      const sIast = cleanQuery(s.script);
      if (lower === sDev || lower === sIast || (lower.length > 5 && sIast.includes(lower))) {
        matchedTarget = s;
        targetType = 'sentence';
        break;
      }
    }
  }

  // If user recited Sanskrit or asked to check pronunciation
  const isExplicitCheck = lower.startsWith('check') || lower.includes('pronunciation') || lower.includes('saying') || lower.includes('bolna');
  if (matchedTarget && (isExplicitCheck || raw.match(/[\u0900-\u097F]/) || lower === cleanQuery(matchedTarget.script) || lower.length < 15)) {
    const analysis = analyzeSanskritPronunciation(matchedTarget.text, raw);
    const score = analysis.score;
    let evalText = "";
    let speechFeedback = "";

    if (score >= 80) {
      evalText = `Excellent pronunciation! ${score}% acoustic alignment. Your articulation of "${matchedTarget.text}" (${matchedTarget.script}) was clear and authentic.`;
      speechFeedback = `Excellent! ${score} percent accuracy. Your pronunciation of ${matchedTarget.script} was very clear.`;
    } else if (score >= 50) {
      evalText = `Good attempt! ${score}% alignment. Listen to the standard recitation and focus on sustaining vowel length and visarga releases.`;
      speechFeedback = `Good effort. ${score} percent accuracy. Listen to the standard pronunciation and repeat.`;
    } else {
      evalText = `Acoustic match was ${score}%. Notice the difference in syllable stress. Practice with the reference audio below.`;
      speechFeedback = `Keep practicing. Notice how ${matchedTarget.script} is articulated in the reference audio.`;
    }

    return {
      replyText: evalText,
      speechText: speechFeedback,
      sanskritCard: {
        text: matchedTarget.text,
        script: matchedTarget.script,
        meaning: matchedTarget.meaning,
        focus: matchedTarget.focus || matchedTarget.tip,
        units: matchedTarget.units || null,
        score: score
      },
      type: "pronunciation_feedback"
    };
  }

  // ----------------------------------------------------
  // 2. SEARCH RICH SANSKRIT KNOWLEDGE BASE (ENGLISH, HINDI, SANSKRIT)
  // ----------------------------------------------------
  for (const entry of SANSKRIT_VOICE_KNOWLEDGE_BASE) {
    for (const kw of entry.keywords) {
      const kwClean = cleanQuery(kw);
      if (lower === kwClean || lower.includes(kwClean)) {
        return {
          replyText: `${entry.speechText}\n\n**Devanagari:** ${entry.sanskrit}\n**IAST Transliteration:** ${entry.iast}\n**Meaning:** ${entry.meaning}\n*Note: ${entry.note}*`,
          speechText: entry.speechText,
          sanskritCard: {
            text: entry.sanskrit,
            script: entry.iast,
            meaning: entry.meaning,
            focus: entry.note
          },
          type: "knowledge_hit"
        };
      }
    }
  }

  // ----------------------------------------------------
  // 3. SEARCH CURRICULUM VOCABULARY BY ENGLISH / SCRIPT KEYWORD
  // ----------------------------------------------------
  for (const lesson of SANSKRIT_CURRICULUM.lessons) {
    for (const w of lesson.words) {
      const mClean = cleanQuery(w.meaning);
      const wordsInMeaning = mClean.split(/[\s/()]+/);
      
      const isMatch = wordsInMeaning.some(wm => wm.length > 2 && lower.includes(wm));
      if (isMatch || lower.includes(cleanQuery(w.text)) || lower.includes(cleanQuery(w.script))) {
        const speech = `In Sanskrit, ${w.meaning} is ${w.text}, pronounced ${w.script}. Notice the focus: ${w.focus}.`;
        return {
          replyText: `In Sanskrit, **${w.meaning}** is **${w.text}** (*${w.script}*).\n\n**Phonetic Focus:** ${w.focus}.\n**Syllables:** ${w.units ? w.units.join(' • ') : w.script}`,
          speechText: speech,
          sanskritCard: {
            text: w.text,
            script: w.script,
            meaning: w.meaning,
            focus: w.focus,
            units: w.units
          },
          type: "word_lookup"
        };
      }
    }
  }

  // ----------------------------------------------------
  // 4. SEARCH CURRICULUM SENTENCES
  // ----------------------------------------------------
  for (const s of SANSKRIT_CURRICULUM.sentences) {
    const sMean = cleanQuery(s.meaning);
    if (lower.includes(sMean) || sMean.includes(lower) || lower.includes(cleanQuery(s.text))) {
      const speech = `Here is the sentence: ${s.text}. It means: ${s.meaning}. Cadence note: ${s.tip}.`;
      return {
        replyText: `Target Sentence: **${s.text}** (*${s.script}*)\n\n**Meaning:** “${s.meaning}”\n**Cadence Note:** ${s.tip}`,
        speechText: speech,
        sanskritCard: {
          text: s.text,
          script: s.script,
          meaning: s.meaning,
          focus: s.tip
        },
        type: "sentence_lookup"
      };
    }
  }

  // ----------------------------------------------------
  // 5. INTENT HEURISTICS (GREETINGS, ASSISTANT IDENTITY, GRAMMAR)
  // ----------------------------------------------------
  if (lower.includes('who are you') || lower.includes('aap kaun ho') || lower.includes('your name') || lower.includes('what can you do')) {
    const text = "Namaste! I am your AI Sanskrit Guru (संस्कृत गुरु). You can speak to me in English, Hindi, or Sanskrit. Ask me how to say words, translate sentences, explain grammar rules like Visarga and Sandhi, or recite Sanskrit phrases to check your pronunciation!";
    return {
      replyText: text,
      speechText: "Namaste! I am your AI Sanskrit Guru. You can speak to me in English, Hindi, or Sanskrit. Ask me for words, sentences, or recite phrases to check your pronunciation.",
      sanskritCard: null,
      type: "identity"
    };
  }

  if (lower.includes('teach me') || lower.includes('sikhaye') || lower.includes('sikhao') || lower.includes('start') || lower.includes('help')) {
    const text = "Let us start with foundational Sanskrit greetings! The most sacred greeting is **नमस्ते (Namaste)**, followed by **सुप्रभातम् (Suprabhātam)** for good morning, and **धन्यवादः (Dhanyavādaḥ)** for thank you. Tap any card below to listen and practice.";
    return {
      replyText: text,
      speechText: "Let us start with foundational Sanskrit greetings. The most sacred greeting is Namaste, followed by Suprabhātam for good morning, and Dhanyavādaḥ for thank you. Listen and repeat.",
      sanskritCard: {
        text: "नमस्ते",
        script: "na-ma-ste",
        meaning: "Hello / I bow to you",
        focus: "Ending stress on 'ste'"
      },
      type: "lesson_prompt"
    };
  }

  // ----------------------------------------------------
  // 6. GENERAL SANSKRIT PEDAGOGICAL FALLBACK
  // ----------------------------------------------------
  const fallbackSpeech = `You asked: "${raw}". I can teach you any Sanskrit word, sentence, or grammar rule. Try asking: "What is water in Sanskrit?", "Teach me numbers", or recite "Namaste" into the microphone.`;
  const fallbackText = `I heard: “*${raw}*”.\n\nI can teach you any Sanskrit word, sentence, or grammar concept in response to queries in English, Hindi, or Sanskrit.\n\n**Try asking:**\n- “What is water in Sanskrit?” (जलम्)\n- “How do I say thank you?” (धन्यवादः)\n- “Translate 'I am a student'” (अहं छात्रः अस्मि)\n- “Teach me Sanskrit numbers 1 to 10”\n- Or speak any Sanskrit word aloud to check your pronunciation!`;

  return {
    replyText: fallbackText,
    speechText: fallbackSpeech,
    sanskritCard: {
      text: "नमस्ते",
      script: "na-ma-ste",
      meaning: "Hello / Greetings",
      focus: "Try saying: 'Namaste'"
    },
    type: "fallback"
  };
}

/**
 * Text-to-Speech Engine that speaks Sanskrit and English naturally
 */
let currentUtterance = null;

export function stopVoiceBotSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function speakVoiceBotResponse(speechText, { onStart = null, onEnd = null } = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) setTimeout(onEnd, 600);
    return;
  }

  stopVoiceBotSpeech();

  // Create clean speech string without markdown symbols
  const cleanSpoken = speechText
    .replace(/[*_#`~[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanSpoken);
  
  // Find Indian English / Hindi / Sanskrit voice for authentic cadence
  const voices = window.speechSynthesis.getVoices();
  const indianVoice = voices.find(v => v.lang === 'hi-IN' || v.lang === 'sa-IN' || v.lang === 'en-IN') ||
                      voices.find(v => v.lang.includes('IN')) ||
                      voices[0];

  if (indianVoice) {
    utterance.voice = indianVoice;
  }

  utterance.rate = 0.88; // Clear pedagogical pace
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Browser Speech Recognition for Continuous or Single-Shot Multilingual Input
 */
export function createMultilingualVoiceBotListener({
  inputLang = 'en-IN',
  onInterim,
  onResult,
  onError,
  onEnd
}) {
  const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

  if (!SpeechRecognition) {
    return null;
  }

  const recognizer = new SpeechRecognition();
  recognizer.continuous = false;
  recognizer.interimResults = true;
  recognizer.maxAlternatives = 3;
  recognizer.lang = inputLang || 'en-IN';

  recognizer.onresult = (event) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    if (interim && onInterim) onInterim(interim);
    if (final && onResult) onResult(final.trim());
  };

  recognizer.onerror = (err) => {
    if (onError) onError(err);
  };

  recognizer.onend = () => {
    if (onEnd) onEnd();
  };

  return recognizer;
}
