import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Kanban,
  CheckSquare,
  Clock,
  CheckCircle2,
  Plus,
  FolderKanban,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';

const sampleIssues = [
  {
    key: 'FB-101',
    summary: 'Implement OAuth 2.0 User Authentication Flow',
    status: 'in-progress',
    statusLabel: 'IN PROGRESS',
    priority: 'High',
    assignee: 'John Doe'
  },
  {
    key: 'FB-102',
    summary: 'Design Jira-Style Responsive Application Shell',
    status: 'done',
    statusLabel: 'DONE',
    priority: 'High',
    assignee: 'John Doe'
  },
  {
    key: 'FB-103',
    summary: 'Add Drag-and-Drop Column Reordering to Kanban Board',
    status: 'review',
    statusLabel: 'IN REVIEW',
    priority: 'Medium',
    assignee: 'Sarah Smith'
  },
  {
    key: 'FB-104',
    summary: 'Configure REST API Service Handlers with Axios',
    status: 'todo',
    statusLabel: 'TO DO',
    priority: 'Low',
    assignee: 'Alex Johnson'
  }
];

const sampleActivities = [
  {
    user: 'Sarah Smith',
    avatar: 'SS',
    action: 'moved FB-103 to IN REVIEW',
    time: '12 minutes ago'
  },
  {
    user: 'John Doe',
    avatar: 'JD',
    action: 'completed task FB-102',
    time: '1 hour ago'
  },
  {
    user: 'Alex Johnson',
    avatar: 'AJ',
    action: 'created issue FB-105: Fix mobile navigation alignment',
    time: '3 hours ago'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is what's happening with your FlowBoard workspace today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
            onClick={() => navigate('/projects')}
          >
            <FolderKanban size={16} />
            <span>View Projects</span>
          </button>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-xs"
            onClick={() => navigate('/issues?create=true')}
          >
            <Plus size={16} />
            <span>New Issue</span>
          </button>
        </div>
      </header>

      {/* Top Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <FolderKanban size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-xs font-medium text-gray-500">Active Projects</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs font-medium text-gray-500">Open Issues</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">84%</div>
            <div className="text-xs font-medium text-gray-500">Sprint Completion</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">28</div>
            <div className="text-xs font-medium text-gray-500">Tasks Done This Month</div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Tasks & Sprint */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned to Me */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CheckSquare size={18} className="text-blue-600" />
                Assigned to Me
              </h2>
              <Link to="/issues" className="text-xs font-semibold text-blue-600 hover:underline">
                View all issues
              </Link>
            </div>

            <div className="space-y-2">
              {sampleIssues.map((issue) => (
                <div
                  key={issue.key}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                      {issue.key}
                    </span>
                    <span className="text-sm font-medium text-gray-800 truncate" title={issue.summary}>
                      {issue.summary}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 whitespace-nowrap text-xs">
                    <span
                      className={`flex items-center gap-1 font-semibold ${
                        issue.priority === 'High'
                          ? 'text-red-600'
                          : issue.priority === 'Medium'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      <AlertCircle size={14} />
                      {issue.priority}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider ${
                        issue.status === 'done'
                          ? 'bg-emerald-100 text-emerald-800'
                          : issue.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : issue.status === 'review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {issue.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Sprint Progress */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Kanban size={18} className="text-blue-600" />
                Active Sprint: Sprint 4
              </h2>
              <Link to="/kanban" className="text-xs font-semibold text-blue-600 hover:underline">
                Open Kanban Board
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
              <div className="flex justify-between text-sm font-semibold text-gray-800">
                <span>Story Points Completed</span>
                <span>42 / 50 PTS (84%)</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full w-[84%] transition-all" />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Started: Sep 18</span>
                <span>Ends: Oct 02 (3 days left)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Quick Access */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                Recent Activity
              </h2>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              {sampleActivities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 pt-3 first:pt-0">
                  <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {act.avatar}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-900">{act.user}</span>{' '}
                    <span>{act.action}</span>
                    <div className="text-[11px] text-gray-400 mt-0.5">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Projects */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <UserCheck size={18} className="text-blue-600" />
                Quick Projects
              </h2>
              <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  FB
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">FlowBoard Web</div>
                  <div className="text-xs text-gray-400">12 Open Issues • Software</div>
                </div>
                <ArrowUpRight size={16} className="text-gray-400" />
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  MB
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">Mobile App React Native</div>
                  <div className="text-xs text-gray-400">5 Open Issues • Mobile</div>
                </div>
                <ArrowUpRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
