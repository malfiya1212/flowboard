import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';

const issuesData = [
  { key: 'FB-101', summary: 'Implement OAuth 2.0 User Authentication Flow', type: 'Story', status: 'IN PROGRESS', priority: 'High', assignee: 'John Doe' },
  { key: 'FB-102', summary: 'Design Jira-Style Responsive Application Shell', type: 'Task', status: 'DONE', priority: 'High', assignee: 'John Doe' },
  { key: 'FB-103', summary: 'Add Drag-and-Drop Column Reordering', type: 'Feature', status: 'IN REVIEW', priority: 'Medium', assignee: 'Sarah Smith' },
  { key: 'FB-104', summary: 'Configure REST API Service Handlers with Axios', type: 'Task', status: 'TO DO', priority: 'Low', assignee: 'Alex Johnson' },
  { key: 'FB-105', summary: 'Fix mobile navigation alignment overflow bug', type: 'Bug', status: 'TO DO', priority: 'Highest', assignee: 'Unassigned' }
];

const Issues = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issues & Tasks</h1>
          <p className="text-sm text-gray-500 mt-0.5">View, search, and filter all workspace issues.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-xs">
          <Plus size={16} />
          <span>Create Issue</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Key</th>
                <th className="px-5 py-3">Summary</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issuesData.map((issue) => (
                <tr key={issue.key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600 text-xs">{issue.key}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{issue.summary}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{issue.type}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold">{issue.priority}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">{issue.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Issues;
