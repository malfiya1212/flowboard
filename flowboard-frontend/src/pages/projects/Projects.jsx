import React from 'react';
import { FolderKanban, Plus, MoreHorizontal } from 'lucide-react';

const projectsList = [
  { id: 1, key: 'FB', name: 'FlowBoard Web App', lead: 'John Doe', type: 'Software (Scrum)', issues: 18 },
  { id: 2, key: 'MB', name: 'Mobile App React Native', lead: 'Sarah Smith', type: 'Software (Kanban)', issues: 9 },
  { id: 3, key: 'API', name: 'Backend Microservices', lead: 'Alex Johnson', type: 'Backend (REST)', issues: 14 },
  { id: 4, key: 'UI', name: 'Design System & UI Kit', lead: 'Emily Davis', type: 'Design', issues: 6 },
];

const Projects = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track your software workspace projects.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-xs">
          <Plus size={16} />
          <span>Create Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {projectsList.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {project.key}
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors cursor-pointer">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base">{project.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{project.type}</div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <div>Lead: {project.lead}</div>
              <div className="font-semibold text-blue-600">{project.issues} issues</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
