import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Kanban,
  Layers,
  CheckSquare,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const navGroups = [
  {
    title: 'Main',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/projects', label: 'Projects', icon: FolderKanban, badge: '5' }
    ]
  },
  {
    title: 'Planning & Tracking',
    items: [
      { path: '/kanban', label: 'Kanban Board', icon: Kanban },
      { path: '/scrum', label: 'Scrum & Sprints', icon: Layers },
      { path: '/issues', label: 'Issues & Backlog', icon: CheckSquare, badge: '12' }
    ]
  },
  {
    title: 'Team & Analytics',
    items: [
      { path: '/users', label: 'Team Members', icon: Users },
      { path: '/reports', label: 'Reports & Insights', icon: BarChart3 }
    ]
  }
];

const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 top-14 bg-gray-900/50 z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`sticky top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 flex flex-col transition-all duration-200 z-40 select-none ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileOpen
            ? 'fixed left-0 top-14 w-64 shadow-xl'
            : 'hidden md:flex'
        }`}
      >
        {/* Workspace / Project Selector Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 min-w-8 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-md flex items-center justify-center font-bold text-sm shadow-xs">
              FB
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden whitespace-nowrap">
                <span className="font-semibold text-sm text-gray-900 truncate">
                  FlowBoard Main
                </span>
                <span className="text-xs text-gray-400">Software Project</span>
              </div>
            )}
          </div>

          <button
            className="hidden md:flex w-6 h-6 rounded-full border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-5">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1 whitespace-nowrap">
                  {group.title}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-all whitespace-nowrap ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 font-semibold'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                          }`
                        }
                        onClick={onCloseMobile}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <span className="min-w-5 flex items-center justify-center">
                          <Icon size={18} />
                        </span>
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge && (
                              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2.5 p-2 rounded-md bg-gray-50 border border-gray-100">
              <ShieldCheck size={16} className="text-emerald-500" />
              <div>
                <div className="text-xs font-medium text-gray-700">Workspace Active</div>
                <div className="text-[10px] text-gray-400">FlowBoard v1.0.0</div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
