import React from 'react';
import { projectDetails } from '../../data/projects';

const ProjectGrid = ({ onProjectClick }) => {
  return (
    <div className="p-4 grid grid-cols-3 gap-2 place-items-center">
      {Object.keys(projectDetails).map((key) => {
        const project = projectDetails[key];
        return (
          <button 
            key={key}
            onClick={() => onProjectClick(key)} 
            className="text-center group flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-white border-2 border-[#222222] shadow-[4px_4px_0px_0px_black] flex items-center justify-center group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all overflow-hidden p-2">
              <img 
                src={project.icon} 
                alt={project.title}
                className="w-full h-full object-contain"
                style={{ imageRendering: 'pixelated' }} 
              />
            </div>
            <span className="text-[10px] font-bold underline uppercase tracking-tighter">
              {project.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectGrid;