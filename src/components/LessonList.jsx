import React from 'react';

export default function LessonList({ lessons, onSelectLesson }) {
  return (
    <div className="screen-scrollable">
      <div className="screen-header-block">
        <span className="screen-subtitle-tag">Structured Curriculum</span>
        <h2 className="screen-title">Sanskrit Lessons</h2>
      </div>

      <div className="curriculum-tier-label">Beginner Tier</div>

      <div className="lessons-structured-list">
        {lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            className={`lesson-entry ${lesson.completed ? 'completed' : 'ready'}`}
            onClick={() => onSelectLesson(idx, 0)}
          >
            <div className="lesson-entry-num">{lesson.number}.</div>
            <div className="lesson-entry-body">
              <div className="lesson-entry-title">{lesson.title}</div>
              <div className="lesson-entry-sanskrit">{lesson.sanskritSummary}</div>
            </div>
            <div className="lesson-entry-action">
              {lesson.completed ? (
                <span className="status-pill-completed">Completed</span>
              ) : (
                <button
                  type="button"
                  className="btn-start-lesson"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLesson(idx, 0);
                  }}
                >
                  Start Lesson →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
