import React from 'react';

export default function CurriculumScreen({
  activeLang,
  curriculum,
  onStartUnit
}) {
  const langData = curriculum[activeLang];

  return (
    <div className="full-page-module-container">
      <div className="module-title-bar academic-refined-header">
        <div>
          <div className="module-subtag-row">
            <span className="lang-code-tag">{langData.code}</span>
            <span className="module-subtag">{langData.name} Curriculum Syllabus</span>
          </div>
          <h2 className="module-heading">Curriculum Index & Learning Units</h2>
          <p className="module-caption">{langData.description}</p>
        </div>
      </div>

      <div className="curriculum-units-grid">
        {langData.lessons.map((lesson, idx) => (
          <div key={lesson.id} className="academic-card curriculum-unit-card">
            <div className="unit-card-header">
              <span className="unit-num-badge">Unit {lesson.number}</span>
              <span className="unit-level-tag">{lesson.level}</span>
            </div>

            <h3 className="unit-card-title">{lesson.title}</h3>
            <p className="unit-card-summary">{lesson.summary}</p>

            <div className="unit-words-preview">
              <span className="preview-label">Vocabulary Items:</span>
              <div className="preview-tags">
                {lesson.words.map((w) => (
                  <span key={w.id} className="preview-chip">
                    {w.text} ({w.meaning})
                  </span>
                ))}
              </div>
            </div>

            <div className="unit-card-footer">
              <span className="word-count-badge">{lesson.words.length} Vocabulary Words</span>
              <button
                type="button"
                className="btn-start-unit"
                onClick={() => onStartUnit(idx)}
              >
                Start Unit →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
