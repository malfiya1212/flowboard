import React from 'react';
import { Layers, Plus } from 'lucide-react';

const Sprints = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Sprint Management</h1>
          <p className="page-subtitle">Plan and manage active and upcoming sprints.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          <span>Create Sprint</span>
        </button>
      </div>
    </div>
  );
};

export default Sprints;
