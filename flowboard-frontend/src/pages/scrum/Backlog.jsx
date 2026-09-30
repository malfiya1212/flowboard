import React from 'react';
import { Layers, Plus } from 'lucide-react';

const Backlog = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Product Backlog</h1>
          <p className="page-subtitle">Prioritized list of features and bug fixes.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          <span>Add Backlog Item</span>
        </button>
      </div>
    </div>
  );
};

export default Backlog;
