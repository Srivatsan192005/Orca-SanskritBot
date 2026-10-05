# ORCA — Multilingual AI Voice Learning Application
## Sanskrit (संस्कृतम्) & Japanese (日本語) with Natural Language Processing

A clean, rigid, professional, full-page multilingual web application built with **React 18 + Vite** and a custom **Multilingual Sanskrit & Japanese NLP Speech Engine**.

---

### Key Capabilities

1. **Full-Page Academic Web Application**:
   - Spans the complete browser viewport with a responsive desktop layout (up to 1320px container), removing the narrow centered phone frame.
   - Clean, rigid, flat academic interface adhering strictly to educational UI rules.

2. **Multilingual Architecture**:
   - **Sanskrit (संस्कृतम्)**: Devanagari script, IAST transliteration, Akshara (syllable) segmentation, Visarga (ः) breath release, Anusvāra nasalization, and Vedic speech synthesis (`hi-IN`/`sa-IN`).
   - **Japanese (日本語 - Nihongo)**: Hiragana, Katakana, Kanji, Hepburn Romaji transliteration, Mora (拍 / Haku) segmentation, long vowels (Chōonpu), pitch accent, and native Japanese speech synthesis (`ja-JP`).
   - Instant language switcher in the header: **Sanskrit (संस्कृतम्) ⇄ Japanese (日本語)**.

3. **Fresh Start & Authentic Progress Tracking**:
   - Removed all mocked "Done", "Completed ✓", and fake pre-populated statistics.
   - Starts clean from **0 words practiced**, **0 sessions**.
   - Dynamically calculates accuracy, logs spoken attempts, and updates mastery from real microphone recordings.
   - Includes a one-click **"Reset Progress to 0"** feature.

4. **Speech Recognition & Acoustic NLP Engine**:
   - Computes genuine normalized Levenshtein phonetic distance with **zero artificial minimum clamps**.
   - If a learner says a completely different word (e.g., saying *"apple"* instead of *"नमस्ते"* or *"こんにちは"*), the score realistically drops to **10% – 25%** with clear corrective diagnostic feedback.
   - Displays **"What AI Heard:"** in real-time.
   - Text simulation input field to test speech recognition and scoring instantly.

5. **Integrated Learning Modules**:
   - **Learn Words**: Vocabulary flashcard with mora/akshara chips, native TTS, oral microphone recording, and diagnostic breakdown.
   - **Learn Sentences**: Real-world conversational syntax with pronunciation guides, audio recitation, and cadence analysis.
   - **Oral Practice**: Interactive 4-stage oral exam state machine (`Ready` $\rightarrow$ `Listening...` $\rightarrow$ `Analyzing...` $\rightarrow$ `Graded Result`).
   - **Curriculum Library**: Categorized beginner to elementary units with quick-start actions.
   - **My Progress**: Authentic real-time logs table, session counters, and phonetic accuracy averages.
   - **AI Voice Tutor**: Bilingual voice assistant (**Sanskrit Guru** & **Nihongo Sensei**) with natural conversation.

---

### How to Run Locally

```powershell
# Start Vite development server
npm run dev
```

Open `http://localhost:3000` in your browser.
