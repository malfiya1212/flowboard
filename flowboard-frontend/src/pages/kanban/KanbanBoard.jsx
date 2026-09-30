import React, { useState } from 'react';
import { Kanban as KanbanIcon, Plus, Filter } from 'lucide-react';
import CreateIssueModal from '../../components/modal/CreateIssueModal';
import IssueDetailsModal from '../../components/issue/IssueDetailsModal';

const initialColumns = [
  {
    id: 'todo',
    title: 'TO DO',
    count: 3,
    cards: [
      { key: 'FB-104', title: 'Configure REST API Service Handlers', priority: 'Low', points: 3, status: 'TO DO', description: 'Setup Axios interceptors and base service handlers.' },
      { key: 'FB-106', title: 'Add dark mode theme support', priority: 'Medium', points: 5, status: 'TO DO', description: 'Configure Tailwind CSS dark theme tokens.' },
      { key: 'FB-107', title: 'Write integration test suites', priority: 'High', points: 8, status: 'TO DO', description: 'Write API endpoint tests using Vitest.' }
    ]
  },
  {
    id: 'in-progress',
    title: 'IN PROGRESS',
    count: 2,
    cards: [
      { key: 'FB-101', title: 'Implement OAuth 2.0 User Auth Flow', priority: 'High', points: 8, status: 'IN PROGRESS', description: 'OAuth token validation and backend auth routes.' },
      { key: 'FB-108', title: 'Setup WebSockets real-time sync', priority: 'Medium', points: 5, status: 'IN PROGRESS', description: 'Real-time issue updates using Socket.IO.' }
    ]
  },
  {
    id: 'review',
    title: 'IN REVIEW',
    count: 1,
    cards: [
      { key: 'FB-103', title: 'Add Drag-and-Drop Column Reordering', priority: 'Medium', points: 5, status: 'IN REVIEW', description: 'Implement interactive drag and drop column sorting.' }
    ]
  },
  {
    id: 'done',
    title: 'DONE',
    count: 2,
    cards: [
      { key: 'FB-102', title: 'Design Jira-Style Responsive Application Shell', priority: 'High', points: 5, status: 'DONE', description: 'Tailwind CSS application shell layout.' },
      { key: 'FB-100', title: 'Setup Vite + React Frontend Boilerplate', priority: 'Low', points: 2, status: 'DONE', description: 'Initial repository setup.' }
    ]
  }
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleCreateIssue = (newIssueData) => {
    const newCard = {
      key: `FB-${Math.floor(Math.random() * 900) + 110}`,
      title: newIssueData.title,
      priority: newIssueData.priority,
      points: newIssueData.storyPoints || 3,
      status: 'TO DO',
      description: newIssueData.description,
      type: newIssueData.issueType
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === 'todo'
          ? { ...col, count: col.count + 1, cards: [newCard, ...col.cards] }
          : col
      )
    );
  };

  const handleStatusChange = (issueKey, newStatus) => {
    // Re-assign issue to target status column
    let movedCard = null;
    const cleanCols = columns.map((col) => {
      const remainingCards = col.cards.filter((c) => {
        if (c.key === issueKey) {
          movedCard = { ...c, status: newStatus };
          return false;
        }
        return true;
      });
      return { ...col, count: remainingCards.length, cards: remainingCards };
    });

    if (movedCard) {
      const targetColId =
        newStatus === 'TO DO'
          ? 'todo'
          : newStatus === 'IN PROGRESS'
          ? 'in-progress'
          : newStatus === 'IN REVIEW'
          ? 'review'
          : 'done';

      const finalCols = cleanCols.map((col) =>
        col.id === targetColId
          ? { ...col, count: col.count + 1, cards: [movedCard, ...col.cards] }
          : col
      );
      setColumns(finalCols);
      if (selectedIssue && selectedIssue.key === issueKey) {
        setSelectedIssue({ ...selectedIssue, status: newStatus });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <p className="text-sm text-gray-500 mt-0.5">Sprint 4 • FlowBoard Web Project</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-xs">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-xs"
          >
            <Plus size={16} />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      {/* Board Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start pb-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="bg-gray-100/80 rounded-xl p-3.5 flex flex-col gap-3 min-h-[520px] border border-gray-200"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {col.title}
              </span>
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {col.count}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3">
              {col.cards.map((card) => (
                <div
                  key={card.key}
                  onClick={() => setSelectedIssue(card)}
                  className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-xs space-y-2.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      {card.key}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        card.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : card.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {card.priority}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-gray-800 leading-snug">
                    {card.title}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200">
                    <span className="text-xs font-semibold text-gray-400">
                      {card.points} pts
                    </span>
                    <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-[10px]">
                      JD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateIssue}
      />

      <IssueDetailsModal
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onUpdateStatus={handleStatusChange}
      />
    </div>
  );
};

export default KanbanBoard;
