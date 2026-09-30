import React from 'react';
import { Layers, Play, Calendar, CheckSquare } from 'lucide-react';

const ScrumBoard = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Scrum Board</h1>
          <p className="page-subtitle">Sprint 4 (Active: Sep 18 - Oct 02)</p>
        </div>
        <button className="btn-primary">
          <Play size={16} />
          <span>Complete Sprint</span>
        </button>
      </div>

      <div style={{ padding: '24px', backgroundColor: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        <h3>Scrum Board Overview</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Track sprint goals, backlog items, story points, and burndown metrics.
        </p>
      </div>
    </div>
  );
};

export default ScrumBoard;
