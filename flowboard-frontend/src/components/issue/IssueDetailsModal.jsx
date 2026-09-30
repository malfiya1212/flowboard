import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Clock,
  User,
  Tag,
  AlertCircle,
  Paperclip,
  Send,
  CheckCircle2
} from 'lucide-react';

const IssueDetailsModal = ({ issue, isOpen, onClose, onUpdateStatus, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !issue) return null;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (onAddComment) {
      onAddComment(issue.key, commentText.trim());
    }
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/50">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              {issue.key}
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {issue.type || 'Task'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Title & Status */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {issue.summary || issue.title}
            </h2>

            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-gray-500">Status:</label>
              <select
                value={issue.status}
                onChange={(e) => onUpdateStatus && onUpdateStatus(issue.key, e.target.value)}
                className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md font-bold text-xs text-blue-700 focus:outline-none"
              >
                <option value="TO DO">TO DO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="IN REVIEW">IN REVIEW</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Description
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm text-gray-800 leading-relaxed">
              {issue.description || 'No detailed description provided for this issue.'}
            </div>
          </div>

          {/* Issue Meta Details */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Assignee</span>
              <span className="font-semibold text-gray-900 mt-1 block">
                {issue.assignee || 'Unassigned'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Priority</span>
              <span className="font-semibold text-red-600 mt-1 block">
                {issue.priority || 'Medium'}
              </span>
            </div>
          </div>

          {/* Comments & Activity Log */}
          <div className="space-y-4 border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <MessageSquare size={14} />
              Comments & Activity
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Send size={12} />
                Comment
              </button>
            </form>

            {/* Existing Comments List */}
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-700">
                <span className="font-bold text-gray-900">Sarah Smith</span>: Updated acceptance criteria for auth flow.
                <span className="text-[10px] text-gray-400 block mt-1">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsModal;
