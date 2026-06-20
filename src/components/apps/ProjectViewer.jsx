import React from 'react';

const ProjectViewer = ({ project }) => {
  if (!project) return null;

  return (
    <div className="h-[450px] overflow-y-auto p-4 font-mono custom-scrollbar">
      <h2 className="text-xl font-bold border-b-4 border-[#222222] mb-4 uppercase inline-block">
        {project.title}
      </h2>
      
      <div className="flex gap-2 mb-6">
        {project.tech.map(t => (
          <span key={t} className="bg-[#222222] text-white text-[9px] px-2 py-0.5">{t}</span>
        ))}
      </div>
      
      <p className="text-xs leading-relaxed mb-8 bg-white/60 p-4 border-2 border-dashed border-[#222222]">
        {project.description}
      </p>

      <div className="space-y-6">
        <div className="aspect-video bg-[#222222] border-4 border-[#222222] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          <video 
            src={project.video}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        {project.media.map((img, i) => (
          <img key={i} src={img} className="w-full border-4 border-[#222222] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]" alt="Preview" />
        ))}
      </div>

      <div className="flex gap-4 sticky bottom-0 bg-[#FFF8F0]/90 backdrop-blur-sm pt-4 pb-2 mt-8">
        <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 bg-[#222222] text-white text-center py-2 font-bold text-[10px] border-2 border-[#222222] shadow-[4px_4px_0px_0px_#B4F8C8] hover:translate-x-1 transition-all">GITHUB_REPO</a>
        <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 bg-white border-2 border-[#222222] text-center py-2 font-bold text-[10px] shadow-[4px_4px_0px_0px_#F8C3CD] hover:translate-x-1 transition-all">LIVE_DEPLOY</a>
      </div>
    </div>
  );
};

export default ProjectViewer;