import React, { useState } from 'react';

function ProjectPage({ teamName }) {
  const [projects, setProjects] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '',
    assigned: '',
    status: 'Open',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    team: teamName,
    file: '',
    time: '0h'
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.projectName.trim()) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({
        projectName: '',
        assigned: '',
        status: 'Open',
        startDate: '',
        endDate: '',
        priority: 'Medium',
        team: teamName,
        file: '',
        time: '0h'
      });
      setShowNewRow(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">{teamName} Projects</h1>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <span className="mr-1">🔍</span> Search
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <span className="mr-1">⚡</span> Filter
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <span className="mr-1">↕</span> Sort
          </button>
          <button className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
            Nieuw
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projectnaam</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toegewezen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startdatum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Einddatum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioriteit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bestand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.projectName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.assigned}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.team}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-blue-500 hover:text-blue-600">📎</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* New Project Row */}
        {showNewRow ? (
          <form onSubmit={handleAddProject} className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-9 gap-4">
              <input
                type="text"
                value={newProject.projectName}
                onChange={(e) => setNewProject({...newProject, projectName: e.target.value})}
                placeholder="Project naam"
                className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newProject.assigned}
                onChange={(e) => setNewProject({...newProject, assigned: e.target.value})}
                placeholder="Toegewezen aan"
                className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <input
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                className="col-span-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <div className="col-span-1 px-3 py-2 text-gray-500">{teamName}</div>
              <div className="col-span-1 px-3 py-2">
                <button type="button" className="text-blue-500 hover:text-blue-600">📎</button>
              </div>
              <div className="col-span-1 px-3 py-2 text-gray-500">0h</div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowNewRow(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Project
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setShowNewRow(true)}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <span className="mr-2">+</span> Nieuw project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage; 