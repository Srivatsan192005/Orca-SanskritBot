import React, { useState } from 'react';
import Header from './components/Header';
import VoiceBotStudio from './components/VoiceBotStudio';
import WordsScreen from './components/WordsScreen';
import SentencesScreen from './components/SentencesScreen';
import PracticeScreen from './components/PracticeScreen';
import CurriculumScreen from './components/CurriculumScreen';
import ProgressScreen from './components/ProgressScreen';
import { SANSKRIT_CURRICULUM } from './data/sanskritCurriculum';

export default function App() {
  const [activeTab, setActiveTab] = useState('voice-bot'); // Default directly to the Voice Bot

  // Fresh user progress state (starts at 0 from scratch)
  const [stats, setStats] = useState({
    wordsPracticed: 0,
    sessionsCount: 0,
    averageAccuracy: 0
  });
  const [attemptLogs, setAttemptLogs] = useState([]);
  const [practicedWordsSet, setPracticedWordsSet] = useState(new Set());

  // Called when user speaks and NLP grades their pronunciation
  const handleRecordAttempt = ({ wordText, lang = 'sanskrit', score, isDifferentWord = false, audioUrl = null }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newLog = {
      time: timeStr,
      wordText,
      lang: 'sanskrit',
      score,
      isDifferentWord,
      audioUrl
    };

    setAttemptLogs((prev) => [newLog, ...prev]);

    setStats((prev) => {
      const nextSessions = prev.sessionsCount + 1;
      const prevTotal = prev.averageAccuracy * prev.sessionsCount;
      const nextAvg = Math.round((prevTotal + score) / nextSessions);

      const newSet = new Set(practicedWordsSet);
      newSet.add(`sanskrit_${wordText}`);
      setPracticedWordsSet(newSet);

      return {
        wordsPracticed: newSet.size,
        sessionsCount: nextSessions,
        averageAccuracy: nextAvg
      };
    });
  };

  const handleResetStats = () => {
    setStats({
      wordsPracticed: 0,
      sessionsCount: 0,
      averageAccuracy: 0
    });
    setAttemptLogs([]);
    setPracticedWordsSet(new Set());
  };

  const handleStartUnitFromCurriculum = (unitIdx) => {
    setActiveTab('words');
  };

  const handleNavigateToPractice = (wordText) => {
    setActiveTab('words');
  };

  // Provide unified Sanskrit structure to screens
  const curriculumObj = {
    sanskrit: SANSKRIT_CURRICULUM
  };

  return (
    <div className="full-page-application">
      {/* Full Width Top Academic Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        stats={stats}
      />

      {/* Main Full Page Workspace Container */}
      <main className="full-page-main-content">
        {activeTab === 'voice-bot' && (
          <VoiceBotStudio
            onNavigateToPractice={handleNavigateToPractice}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {activeTab === 'words' && (
          <WordsScreen
            activeLang="sanskrit"
            curriculum={curriculumObj}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {activeTab === 'sentences' && (
          <SentencesScreen
            activeLang="sanskrit"
            curriculum={curriculumObj}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeScreen
            activeLang="sanskrit"
            curriculum={curriculumObj}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumScreen
            activeLang="sanskrit"
            curriculum={curriculumObj}
            onStartUnit={handleStartUnitFromCurriculum}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressScreen
            stats={stats}
            attemptLogs={attemptLogs}
            onResetStats={handleResetStats}
          />
        )}
      </main>
    </div>
  );
}
