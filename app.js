/**
 * ORCA — Sanskrit Guru AI: Academic Voice Learning Assistant
 * UI/UX Application Logic & NLP Conceptual Engine
 * Project: AI-Enabled Technologies for Sanskrit using Natural Language Processing
 */

// --- 1. CURRICULUM DATABASE ---
const CURRICULUM = {
  lessons: [
    {
      id: 1,
      number: "01",
      title: "Basic Greetings",
      status: "completed",
      words: [
        {
          sanskrit: "नमस्ते",
          meaning: "Hello / Greetings",
          pronunciation: "na-ma-ste",
          syllables: ["na [न]", "ma [म]", "ste [स्ते]"],
          targetFeedback: {
            score: 82,
            evaluation: "Good",
            checks: [
              { pass: true, text: "Correct syllables" },
              { pass: true, text: "Correct vowel sound" },
              { pass: false, text: "Improve the final sound" }
            ],
            aiMessage: "“Try saying the final syllable more clearly.”"
          }
        },
        {
          sanskrit: "सुप्रभातम्",
          meaning: "Good morning",
          pronunciation: "su-pra-bhā-tam",
          syllables: ["su [सु]", "pra [प्र]", "bhā [भा]", "tam [तम्]"],
          targetFeedback: {
            score: 88,
            evaluation: "Very Good",
            checks: [
              { pass: true, text: "Clear initial aspiration" },
              { pass: true, text: "Vowel length accurate" },
              { pass: false, text: "Sustain the anusvāra nasalization" }
            ],
            aiMessage: "“Great rhythm. Prolong the final nasal 'm' sound slightly.”"
          }
        },
        {
          sanskrit: "शुभरात्रिः",
          meaning: "Good night",
          pronunciation: "shu-bha-rā-triḥ",
          syllables: ["shu [शु]", "bha [भ]", "rā [रा]", "triḥ [त्रिः]"],
          targetFeedback: {
            score: 79,
            evaluation: "Good",
            checks: [
              { pass: true, text: "Correct retroflex sibilant" },
              { pass: false, text: "Visarga (ः) breath too soft" },
              { pass: true, text: "Correct vowel duration" }
            ],
            aiMessage: "“Pay attention to the visarga at the end of rātriḥ.”"
          }
        }
      ]
    },
    {
      id: 2,
      number: "02",
      title: "Introducing Yourself",
      status: "completed",
      words: [
        {
          sanskrit: "अहं छात्रः अस्मि।",
          meaning: "I am a student.",
          pronunciation: "a-haṃ chā-traḥ as-mi",
          syllables: ["a-haṃ", "chā-traḥ", "as-mi"],
          targetFeedback: {
            score: 76,
            evaluation: "Good attempt",
            checks: [
              { pass: true, text: "Clear sentence cadence" },
              { pass: false, text: "Aspiration on middle word छात्रः" },
              { pass: true, text: "Final verb अस्मि articulation clear" }
            ],
            aiMessage: "“Good attempt. Practice the pronunciation of the middle word again.”"
          }
        }
      ]
    },
    {
      id: 3,
      number: "03",
      title: "Numbers",
      status: "completed",
      words: [
        {
          sanskrit: "एकम्, द्वे, त्रीणि",
          meaning: "One, Two, Three",
          pronunciation: "e-kam, dve, trī-ṇi",
          syllables: ["e-kam", "dve", "trī-ṇi"],
          targetFeedback: {
            score: 86,
            evaluation: "Very Good",
            checks: [
              { pass: true, text: "Clear numeric inflection" },
              { pass: true, text: "Correct retroflex 'ṇi'" },
              { pass: false, text: "Sharpen the initial vowel 'e'" }
            ],
            aiMessage: "“Very crisp pronunciation of trīṇi.”"
          }
        }
      ]
    },
    {
      id: 4,
      number: "04",
      title: "Family",
      status: "completed",
      words: [
        {
          sanskrit: "माता, पिता, भ्राता",
          meaning: "Mother, Father, Brother",
          pronunciation: "mā-tā, pi-tā, bhrā-tā",
          syllables: ["mā-tā", "pi-tā", "bhrā-tā"],
          targetFeedback: {
            score: 84,
            evaluation: "Good",
            checks: [
              { pass: true, text: "Proper vowel lengthening (dīrgha)" },
              { pass: true, text: "Clear dental consonants" },
              { pass: false, text: "Aspirate the 'bh' in bhrātā" }
            ],
            aiMessage: "“Ensure the 'bh' sound has adequate vocal cord vibration.”"
          }
        }
      ]
    },
    {
      id: 5,
      number: "05",
      title: "Everyday Words",
      status: "ready",
      words: [
        {
          sanskrit: "जलम्",
          meaning: "Water",
          pronunciation: "ja-lam",
          syllables: ["ja [ज]", "lam [लम्]"],
          targetFeedback: {
            score: 88,
            evaluation: "Very Good",
            checks: [
              { pass: true, text: "Pure vowel articulation" },
              { pass: true, text: "Precise palatal consonant" },
              { pass: false, text: "Pronounce final nasal clearly" }
            ],
            aiMessage: "“Nice attempt! Your pronunciation is 88% accurate. Try to pronounce the final sound more clearly.”"
          }
        },
        {
          sanskrit: "भोजनम्",
          meaning: "Food / Meal",
          pronunciation: "bho-ja-nam",
          syllables: ["bho [भो]", "ja [ज]", "nam [नम्]"],
          targetFeedback: {
            score: 85,
            evaluation: "Good",
            checks: [
              { pass: true, text: "Accurate aspirated 'bh'" },
              { pass: true, text: "Correct syllable timing" },
              { pass: true, text: "Proper nasal ending" }
            ],
            aiMessage: "“Steady pace and accurate vowel duration.”"
          }
        },
        {
          sanskrit: "पुस्तकम्",
          meaning: "Book",
          pronunciation: "pus-ta-kam",
          syllables: ["pus [पुस्]", "ta [त]", "kam [कम्]"],
          targetFeedback: {
            score: 91,
            evaluation: "Excellent",
            checks: [
              { pass: true, text: "Exact conjunct consonant cluster" },
              { pass: true, text: "Short 'u' sound preserved" },
              { pass: true, text: "Final anusvara well formed" }
            ],
            aiMessage: "“Excellent cluster pronunciation on 'sta'.”"
          }
        }
      ]
    }
  ],
  sentences: [
    {
      id: 1,
      sanskrit: "अहं छात्रः अस्मि।",
      meaning: "“I am a student.”",
      phonetics: "a-haṃ chā-traḥ as-mi",
      accuracy: 76,
      feedback: "Good attempt. Practice the pronunciation of the middle word again.",
      defect: "Notice the Visarga (ः) sound in छात्रः (chā-traḥ). Release gentle breath at the end."
    },
    {
      id: 2,
      sanskrit: "भवतः नाम किम्?",
      meaning: "“What is your name?”",
      phonetics: "bha-va-taḥ nā-ma kim",
      accuracy: 85,
      feedback: "Well articulated. Notice the interrogative inflection.",
      defect: "Keep the vowel 'ā' in नाम open and distinct from short 'a'."
    },
    {
      id: 3,
      sanskrit: "मम नाम आनन्दः।",
      meaning: "“My name is Anand.”",
      phonetics: "ma-ma nā-ma ā-nan-daḥ",
      accuracy: 89,
      feedback: "Strong pronunciation throughout the sentence.",
      defect: "Maintain the gentle visarga release at the end of आनन्दः."
    }
  ]
};

// --- 2. GLOBAL APP STATE ---
const state = {
  currentScreen: "screenHome",
  currentLessonIdx: 0,
  currentWordIdx: 0,
  currentSentenceIdx: 0,
  isRecording: false,
  audioContext: null,
  analyser: null,
  mediaStream: null,
  animFrameId: null,
  recognition: null,
  lastRecordedPhrase: "",
  speechSynthesisVoice: null
};

// --- 3. SPEECH SYNTHESIS ENGINE ---
function initSpeechSynthesis() {
  if (!("speechSynthesis" in window)) return;

  function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    // Prioritize Hindi or Sanskrit-capable voices (hi-IN, mr-IN, sa-IN, en-IN)
    const hiVoice = voices.find(v => v.lang.startsWith("hi") || v.lang.startsWith("sa"));
    const inVoice = voices.find(v => v.lang.includes("IN"));
    state.speechSynthesisVoice = hiVoice || inVoice || voices[0] || null;
  }

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function speakSanskrit(text, onComplete) {
  if (!("speechSynthesis" in window)) {
    fallbackAudioChime(440, 0.4);
    if (onComplete) setTimeout(onComplete, 800);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (state.speechSynthesisVoice) {
    utterance.voice = state.speechSynthesisVoice;
  }
  utterance.lang = "hi-IN"; // standard phonetics mapping for Sanskrit devanagari
  utterance.rate = 0.82;   // deliberate academic pacing
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onComplete) onComplete();
  };
  utterance.onerror = () => {
    if (onComplete) onComplete();
  };

  window.speechSynthesis.speak(utterance);
}

// Fallback Tone Generator via Web Audio API
function fallbackAudioChime(freq = 440, duration = 0.3) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("AudioContext not supported or permission denied", e);
  }
}

// --- 4. NAVIGATION & SCREEN SWITCHING ---
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen-view");
  screens.forEach(s => s.classList.remove("active"));

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add("active");
    state.currentScreen = screenId;
    window.scrollTo(0, 0);
  }

  // Update bottom nav active state
  const navBtns = document.querySelectorAll(".bottom-nav .nav-btn");
  navBtns.forEach(btn => {
    if (btn.dataset.target === screenId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Specific screen setup logic
  if (screenId === "screenLesson") {
    renderCurrentWordLesson();
  } else if (screenId === "screenPractice") {
    resetPracticeState();
    renderCurrentPracticeSentence();
  }
}

// --- 5. SCREEN 2 & 3: LESSON & PRONUNCIATION ANALYSIS LOGIC ---
function renderCurrentWordLesson() {
  const lesson = CURRICULUM.lessons[state.currentLessonIdx];
  const word = lesson.words[state.currentWordIdx];

  document.getElementById("lessonHeading").textContent = `Lesson ${lesson.number} — ${lesson.title}`;
  document.getElementById("lessonSanskritWord").textContent = word.sanskrit;
  document.getElementById("lessonMeaning").textContent = word.meaning;
  document.getElementById("lessonPronunciation").textContent = word.pronunciation;

  // Syllables chip rendering
  const syllablesContainer = document.querySelector(".syllables-row");
  if (syllablesContainer) {
    syllablesContainer.innerHTML = "";
    word.syllables.forEach((syl, i) => {
      const chip = document.createElement("span");
      chip.className = "syllable-chip" + (i === word.syllables.length - 1 ? " highlight" : "");
      chip.textContent = syl;
      syllablesContainer.appendChild(chip);
    });
  }

  // Set audio data
  document.getElementById("btnLessonListen").dataset.text = word.sanskrit;

  // Hide live recording indicator
  document.getElementById("lessonRecordingLive").classList.add("hidden");
}

function startWordRecording() {
  const liveBox = document.getElementById("lessonRecordingLive");
  liveBox.classList.remove("hidden");
  state.isRecording = true;

  // Simulate or capture audio levels
  startLiveAudioMeter("lessonAudioBar");

  // After 2.5 seconds of simulated/real speech, move to Analysis Screen
  setTimeout(() => {
    stopLiveAudioMeter();
    liveBox.classList.add("hidden");
    state.isRecording = false;
    evaluateWordPronunciation();
  }, 2600);
}

function evaluateWordPronunciation() {
  const lesson = CURRICULUM.lessons[state.currentLessonIdx];
  const word = lesson.words[state.currentWordIdx];
  const fb = word.targetFeedback;

  document.getElementById("analysisTargetWord").textContent = word.sanskrit;
  document.getElementById("analysisPhonetics").textContent = word.pronunciation;
  document.getElementById("analysisScoreVal").textContent = fb.score + "%";
  document.getElementById("analysisScoreBar").style.width = fb.score + "%";

  const evalBadge = document.getElementById("analysisEvalBadge");
  evalBadge.textContent = fb.evaluation;
  evalBadge.className = "eval-badge " + (fb.score >= 80 ? "good" : "average");

  document.getElementById("analysisAiMessage").textContent = fb.aiMessage;

  // Populate checks list
  const checksList = document.getElementById("analysisChecksList");
  checksList.innerHTML = "";
  fb.checks.forEach(chk => {
    const li = document.createElement("li");
    li.className = "check-item " + (chk.pass ? "check-pass" : "check-warn");
    li.innerHTML = `
      <span class="check-icon">${chk.pass ? "✓" : "⚠"}</span>
      <span class="check-text">${chk.text}</span>
    `;
    checksList.appendChild(li);
  });

  // Switch to Screen 3: Pronunciation Analysis
  showScreen("screenAnalysis");
}

// --- 6. SCREEN 4: PRACTICE MODE ENGINE ---
function renderCurrentPracticeSentence() {
  const item = CURRICULUM.sentences[state.currentSentenceIdx];
  document.getElementById("practiceSentenceText").textContent = item.sanskrit;
  document.getElementById("practiceMeaningText").textContent = item.meaning;
  document.getElementById("practicePhoneticGuide").textContent = item.phonetics;
  document.getElementById("btnPracticeListen").dataset.text = item.sanskrit;

  // Update pills
  const pills = document.querySelectorAll(".sentence-pill");
  pills.forEach((p, idx) => {
    if (idx === state.currentSentenceIdx) p.classList.add("active");
    else p.classList.remove("active");
  });
}

function resetPracticeState() {
  document.getElementById("practiceStateReady").classList.remove("hidden");
  document.getElementById("practiceStateListening").classList.add("hidden");
  document.getElementById("practiceStateAnalyzing").classList.add("hidden");
  document.getElementById("practiceStateResult").classList.add("hidden");
}

function triggerPracticeRecording() {
  document.getElementById("practiceStateReady").classList.add("hidden");
  document.getElementById("practiceStateListening").classList.remove("hidden");

  // Animate audio meter
  let tick = 0;
  const bars = document.querySelectorAll(".rigid-audio-meter .meter-bar");
  const interval = setInterval(() => {
    bars.forEach((b, i) => {
      const heights = [8, 14, 22, 30, 36, 18, 12];
      const h = heights[(i + tick) % heights.length];
      b.style.height = h + "px";
    });
    tick++;
  }, 120);

  // Stop recording after 3.2 seconds
  setTimeout(() => {
    clearInterval(interval);
    document.getElementById("practiceStateListening").classList.add("hidden");
    document.getElementById("practiceStateAnalyzing").classList.remove("hidden");

    // NLP Pipeline processing simulation
    setTimeout(() => {
      document.getElementById("practiceStateAnalyzing").classList.add("hidden");
      document.getElementById("practiceStateResult").classList.remove("hidden");

      const item = CURRICULUM.sentences[state.currentSentenceIdx];
      document.getElementById("practiceScoreNum").textContent = item.accuracy + "%";
      document.getElementById("practiceScoreBar").style.width = item.accuracy + "%";
      document.getElementById("practiceFeedbackText").textContent = item.feedback;
      document.querySelector(".specific-defect-box .defect-text").textContent = item.defect;
    }, 1200);
  }, 3200);
}

// --- 7. AUDIO VISUALIZER / METER HELPER ---
function startLiveAudioMeter(barId) {
  const bar = document.getElementById(barId);
  if (!bar) return;

  let step = 0;
  state.animFrameId = setInterval(() => {
    step = (step + 1) % 10;
    const width = 30 + Math.sin(step) * 45;
    bar.style.width = Math.max(15, Math.min(100, width)) + "%";
  }, 100);
}

function stopLiveAudioMeter() {
  if (state.animFrameId) {
    clearInterval(state.animFrameId);
    state.animFrameId = null;
  }
}

// --- 8. REUSABLE VOICE ASSISTANT COMPONENT ---
function openAssistantModal() {
  const modal = document.getElementById("assistantModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("assistantInputText").focus();
}

function closeAssistantModal() {
  const modal = document.getElementById("assistantModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function appendChatMessage(sender, text, actionButtons = null) {
  const container = document.getElementById("assistantDialogueBody");
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message msg-${sender.toLowerCase()}`;

  const senderTag = document.createElement("div");
  senderTag.className = "msg-sender";
  senderTag.textContent = sender;
  msgDiv.appendChild(senderTag);

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerHTML = text;
  msgDiv.appendChild(bubble);

  if (actionButtons && actionButtons.length > 0) {
    const actRow = document.createElement("div");
    actRow.className = "msg-actions-row";
    actionButtons.forEach(btnConfig => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn-chat-action";
      b.innerHTML = btnConfig.label;
      b.onclick = btnConfig.onClick;
      actRow.appendChild(b);
    });
    msgDiv.appendChild(actRow);
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function handleAssistantUserQuery(query) {
  if (!query || !query.trim()) return;
  const cleanQ = query.trim();
  appendChatMessage("User", cleanQ);

  const lower = cleanQ.toLowerCase();

  // Pattern 1: Greeting query
  if (lower.includes("greeting") || lower.includes("hello")) {
    setTimeout(() => {
      appendChatMessage(
        "AI",
        "Let's learn <strong>नमस्ते</strong>. Listen first, then repeat it.",
        [
          {
            label: "🔊 Play",
            onClick: () => speakSanskrit("नमस्ते")
          },
          {
            label: "🎤 Practice",
            onClick: () => {
              closeAssistantModal();
              state.currentLessonIdx = 0;
              state.currentWordIdx = 0;
              showScreen("screenLesson");
            }
          }
        ]
      );
    }, 400);
  }
  // Pattern 2: New word (जलम्)
  else if (lower.includes("new word") || lower.includes("teach me")) {
    setTimeout(() => {
      appendChatMessage(
        "AI",
        "Today's word is <strong>जलम्</strong>. It means water. Listen first.",
        [
          {
            label: "🔊 Listen",
            onClick: () => speakSanskrit("जलम्")
          },
          {
            label: "🎤 Repeat",
            onClick: () => {
              appendChatMessage("User", "<em>[Repeats: जलम्]</em>");
              setTimeout(() => {
                appendChatMessage(
                  "AI",
                  "Nice attempt! Your pronunciation is <strong>88% accurate</strong>.<br><br><strong>Tip:</strong> Try to pronounce the final sound more clearly."
                );
              }, 700);
            }
          }
        ]
      );
    }, 400);
  }
  // Pattern 3: Visarga explanation
  else if (lower.includes("visarga") || lower.includes("छात्रः") || lower.includes("pronounce")) {
    setTimeout(() => {
      appendChatMessage(
        "AI",
        "The mark <strong>ः</strong> is called <em>Visarga</em>. It is a gentle unvoiced puff of breath echoing the preceding vowel. In <strong>छात्रः</strong>, say <em>chā-tra-ha</em> softly.",
        [
          {
            label: "🔊 Hear छात्रः",
            onClick: () => speakSanskrit("छात्रः")
          }
        ]
      );
    }, 400);
  }
  // Generic Fallback
  else {
    setTimeout(() => {
      appendChatMessage(
        "AI",
        `You asked: “${cleanQ}”. I can help you practice words like <strong>नमस्ते</strong> or sentences like <strong>अहं छात्रः अस्मि।</strong>`,
        [
          {
            label: "Start Practice",
            onClick: () => {
              closeAssistantModal();
              showScreen("screenPractice");
            }
          }
        ]
      );
    }, 400);
  }
}

// --- 9. EVENT LISTENERS INITIALIZATION ---
function initEventListeners() {
  // Bottom Navigation
  document.querySelectorAll(".bottom-nav .nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showScreen(btn.dataset.target);
    });
  });

  // Home Screen Listeners
  document.getElementById("btnHomeListen").addEventListener("click", (e) => {
    speakSanskrit(e.currentTarget.dataset.text || "नमस्ते");
  });

  document.getElementById("btnHomePractice").addEventListener("click", () => {
    state.currentLessonIdx = 0;
    state.currentWordIdx = 0;
    showScreen("screenLesson");
  });

  document.getElementById("btnHomeViewAllProgress").addEventListener("click", () => {
    showScreen("screenProgress");
  });

  // Lesson Screen Listeners
  document.getElementById("btnLessonBack").addEventListener("click", () => {
    showScreen("screenLessonList");
  });

  document.getElementById("btnLessonListen").addEventListener("click", (e) => {
    speakSanskrit(e.currentTarget.dataset.text || "नमस्ते");
  });

  document.getElementById("btnLessonRecord").addEventListener("click", () => {
    startWordRecording();
  });

  document.getElementById("btnLessonStopRecord").addEventListener("click", () => {
    stopLiveAudioMeter();
    document.getElementById("lessonRecordingLive").classList.add("hidden");
    state.isRecording = false;
    evaluateWordPronunciation();
  });

  // Screen 3: Analysis Screen Listeners
  document.getElementById("btnAnalysisTryAgain").addEventListener("click", () => {
    showScreen("screenLesson");
  });

  document.getElementById("btnAnalysisNext").addEventListener("click", () => {
    const lesson = CURRICULUM.lessons[state.currentLessonIdx];
    if (state.currentWordIdx + 1 < lesson.words.length) {
      state.currentWordIdx++;
      showScreen("screenLesson");
    } else {
      showScreen("screenLessonList");
    }
  });

  document.getElementById("btnReplayReference").addEventListener("click", () => {
    const word = CURRICULUM.lessons[state.currentLessonIdx].words[state.currentWordIdx];
    speakSanskrit(word.sanskrit);
  });

  document.getElementById("btnReplayUser").addEventListener("click", () => {
    fallbackAudioChime(320, 0.4);
    const toast = document.getElementById("audioStatusIndicator");
    toast.textContent = "Replaying recorded sample...";
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 1600);
  });

  // Screen 4: Practice Mode Listeners
  document.getElementById("btnPracticeListen").addEventListener("click", (e) => {
    speakSanskrit(e.currentTarget.dataset.text || "अहं छात्रः अस्मि।");
  });

  document.getElementById("btnPracticeRecord").addEventListener("click", () => {
    triggerPracticeRecording();
  });

  document.getElementById("btnPracticeStop").addEventListener("click", () => {
    document.getElementById("practiceStateListening").classList.add("hidden");
    document.getElementById("practiceStateAnalyzing").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("practiceStateAnalyzing").classList.add("hidden");
      document.getElementById("practiceStateResult").classList.remove("hidden");
    }, 800);
  });

  document.getElementById("btnPracticeTryAgain").addEventListener("click", () => {
    resetPracticeState();
  });

  document.getElementById("btnPracticeContinue").addEventListener("click", () => {
    state.currentSentenceIdx = (state.currentSentenceIdx + 1) % CURRICULUM.sentences.length;
    resetPracticeState();
    renderCurrentPracticeSentence();
  });

  document.querySelectorAll(".sentence-pill").forEach((pill, idx) => {
    pill.addEventListener("click", () => {
      state.currentSentenceIdx = idx;
      resetPracticeState();
      renderCurrentPracticeSentence();
    });
  });

  // Screen 5: Lesson List Click Handlers
  document.querySelectorAll(".lesson-entry").forEach(entry => {
    entry.addEventListener("click", (e) => {
      const lessonId = parseInt(entry.dataset.lessonId, 10);
      const idx = CURRICULUM.lessons.findIndex(l => l.id === lessonId);
      if (idx !== -1) {
        state.currentLessonIdx = idx;
        state.currentWordIdx = 0;
        showScreen("screenLesson");
      }
    });
  });

  // Voice Assistant Modal Triggers
  document.getElementById("btnOpenAssistantModal").addEventListener("click", openAssistantModal);
  document.getElementById("btnCloseAssistant").addEventListener("click", closeAssistantModal);
  document.getElementById("assistantModalBackdrop").addEventListener("click", closeAssistantModal);

  document.getElementById("btnAssistantSend").addEventListener("click", () => {
    const input = document.getElementById("assistantInputText");
    const val = input.value;
    input.value = "";
    handleAssistantUserQuery(val);
  });

  document.getElementById("assistantInputText").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const val = e.target.value;
      e.target.value = "";
      handleAssistantUserQuery(val);
    }
  });

  document.querySelectorAll(".quick-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      handleAssistantUserQuery(chip.dataset.prompt);
    });
  });

  document.getElementById("btnAssistantMic").addEventListener("click", () => {
    const toast = document.getElementById("audioStatusIndicator");
    toast.textContent = "Assistant listening... (Simulated speech prompt)";
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
      handleAssistantUserQuery("Teach me a Sanskrit greeting.");
    }, 1500);
  });

  // Desktop Toggle: Mobile Frame vs Wide Frame
  const btnToggle = document.getElementById("btnToggleFullscreen");
  const container = document.getElementById("viewportContainer");
  if (btnToggle && container) {
    btnToggle.addEventListener("click", () => {
      container.classList.toggle("fullscreen-mode");
      if (container.classList.contains("fullscreen-mode")) {
        btnToggle.textContent = "Reset to 390×844 Frame";
      } else {
        btnToggle.textContent = "Full Width View";
      }
    });
  }
}

// --- 10. DOM READY BOOTSTRAP ---
document.addEventListener("DOMContentLoaded", () => {
  initSpeechSynthesis();
  initEventListeners();
  showScreen("screenHome");
  console.log("ORCA — Sanskrit Guru AI initialized successfully.");
});
