import React from 'react';
import { TrendingUp, PieChart } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Insights</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track team velocity, burndown charts, and sprint reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <TrendingUp size={22} className="text-blue-600" />
            <h3 className="font-bold text-gray-900 text-base">Velocity Chart</h3>
          </div>
          <p className="text-xs text-gray-500">
            Track total story points delivered sprint over sprint across projects.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <PieChart size={22} className="text-blue-600" />
            <h3 className="font-bold text-gray-900 text-base">Issue Distribution</h3>
          </div>
          <p className="text-xs text-gray-500">
            Breakdown of workspace tasks by priority, status, and component type.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
