import React from 'react';
import { techStack } from '../../data/techStack'; // Move the data import here!

const TechStack = () => {
  return (
    <div className="p-4 font-mono text-[11px] space-y-4 h-[300px] overflow-y-auto custom-scrollbar">
      {Object.entries(techStack).map(([category, skills]) => (
        <div 
          key={category} 
          className="border-2 border-[#222222] p-2 bg-white/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-left-1"
        >
          {/* Category Header */}
          <h3 className="bg-[#222222] text-white px-2 inline-block mb-2 uppercase font-bold tracking-tighter">
            {category.replace('_', ' ')}
          </h3>

          {/* Skills Grid/Tags */}
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="border border-[#222222]/20 px-1 bg-[#B4F8C8]/30 hover:bg-[#B4F8C8] transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Optional: Retro Progress Bar (just for aesthetic) */}
          <div className="mt-2 w-full h-1 bg-[#222222]/10 rounded-full overflow-hidden">
             <div className="bg-[#F8C3CD] h-full w-[85%] animate-pulse"></div>
          </div>
        </div>
      ))}
      
      <div className="text-[9px] opacity-50 text-center pt-2 uppercase italic">
        -- end of system report --
      </div>
    </div>
  );
};

export default TechStack;