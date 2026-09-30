import React from 'react';
import { UserPlus } from 'lucide-react';

const usersList = [
  { id: 1, name: 'John Doe', email: 'john.doe@flowboard.dev', role: 'Project Lead / Admin', avatar: 'JD' },
  { id: 2, name: 'Sarah Smith', email: 'sarah.smith@flowboard.dev', role: 'Senior Software Engineer', avatar: 'SS' },
  { id: 3, name: 'Alex Johnson', email: 'alex.j@flowboard.dev', role: 'Fullstack Developer', avatar: 'AJ' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@flowboard.dev', role: 'UI/UX Designer', avatar: 'ED' }
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage workspace users and permissions.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-xs">
          <UserPlus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {usersList.map((user) => (
          <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {user.avatar}
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-sm text-gray-900 truncate">{user.name}</div>
              <div className="text-xs text-gray-400 truncate">{user.email}</div>
              <div className="text-xs font-semibold text-blue-600 mt-1">{user.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
