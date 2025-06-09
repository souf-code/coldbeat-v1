import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectPage from './ProjectPage';

function Welcome() {
  const navigate = useNavigate();
  const [teamSpaces, setTeamSpaces] = useState(['Projecten']);
  const [showNewSpaceInput, setShowNewSpaceInput] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Projecten');

  const handleAddNewSpace = (e) => {
    e.preventDefault();
    if (newSpaceName.trim()) {
      setTeamSpaces([...teamSpaces, newSpaceName.trim()]);
      setNewSpaceName('');
      setShowNewSpaceInput(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Dark Sidebar */}
      <div className="w-64 bg-[#1E1E1E] text-gray-300 flex flex-col">
        {/* Top Section */}
        <div className="p-4">
          <div className="flex items-center space-x-2 px-2 py-1.5 bg-[#2D2D2D] rounded hover:bg-[#3D3D3D] cursor-pointer">
            <span className="font-medium">Footight</span>
          </div>
          <button 
            className="w-full flex items-center space-x-2 px-2 py-1.5 mt-1 hover:bg-[#2D2D2D] rounded cursor-pointer text-left"
            onClick={() => {/* Add search functionality */}}
          >
            <span>Zoeken</span>
          </button>
          <button 
            className="w-full flex items-center space-x-2 px-2 py-1.5 mt-1 hover:bg-[#2D2D2D] rounded cursor-pointer text-left"
            onClick={() => navigate('/home')}
          >
            <span>Startpagina</span>
          </button>
        </div>

        {/* Team Spaces Section */}
        <div className="flex-1 p-4">
          <div className="px-2 py-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">TEAMRUIMTEN</div>
          </div>
          
          {teamSpaces.map((space, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-[#3D3D3D] cursor-pointer ${
                selectedTeam === space ? 'bg-[#2D2D2D]' : ''
              }`}
              onClick={() => setSelectedTeam(space)}
            >
              <span className="font-medium">{space}</span>
            </div>
          ))}

          {showNewSpaceInput ? (
            <form onSubmit={handleAddNewSpace} className="mt-2">
              <input
                type="text"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                className="w-full px-2 py-1 bg-[#2D2D2D] rounded text-gray-300 placeholder-gray-500 focus:outline-none"
                placeholder="Nieuwe naam..."
                autoFocus
              />
            </form>
          ) : (
            <button 
              className="w-full flex items-center space-x-2 px-2 py-1.5 mt-1 hover:bg-[#2D2D2D] rounded cursor-pointer text-left"
              onClick={() => setShowNewSpaceInput(true)}
            >
              <span>Nieuwe toevoegen</span>
            </button>
          )}
        </div>

        {/* Bottom Fixed Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 px-2 py-1.5 hover:bg-[#2D2D2D] rounded cursor-pointer">
            <span>Instellingen</span>
          </div>
          <div className="flex items-center space-x-2 px-2 py-1.5 mt-1 hover:bg-[#2D2D2D] rounded cursor-pointer">
            <span>Prullenbak</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ProjectPage teamName={selectedTeam} />
    </div>
  );
}

export default Welcome; 