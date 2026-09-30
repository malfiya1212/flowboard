import React, { useState } from 'react';
import { X, CheckSquare, Layers, AlertCircle, User, Calendar, Tag } from 'lucide-react';

const CreateIssueModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [issueType, setIssueType] = useState('Task');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('John Doe');
  const [storyPoints, setStoryPoints] = useState(3);
  const [labels, setLabels] = useState('frontend, ui');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      issueType,
      description,
      priority,
      assignee,
      storyPoints: Number(storyPoints),
      labels: labels.split(',').map((l) => l.trim()).filter(Boolean),
    });

    // Reset and close
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-gray-900">Create Issue</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Issue Type Selector */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Project</label>
              <select className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-600">
                <option value="FB">FlowBoard Web (FB)</option>
                <option value="MB">Mobile App (MB)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="Epic">⚡ Epic</option>
                <option value="Story">📖 User Story</option>
                <option value="Task">☑️ Task</option>
                <option value="Bug">🐞 Bug</option>
                <option value="Subtask">📌 Subtask</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Summary / Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement OAuth 2.0 User Authentication"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Description</label>
            <textarea
              rows={4}
              placeholder="Add details, acceptance criteria, or specification markdown..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Issue Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Highest">Highest</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="John Doe">John Doe</option>
                <option value="Sarah Smith">Sarah Smith</option>
                <option value="Alex Johnson">Alex Johnson</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Story Points</label>
              <input
                type="number"
                min={0}
                max={40}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                value={storyPoints}
                onChange={(e) => setStoryPoints(e.target.value)}
              />
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Labels (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. frontend, auth, high-priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssueModal;
