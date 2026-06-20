import React, { useState, useEffect, useMemo } from 'react';
import Window from './components/Window';
import CatGallery from './components/CatGallery';
import { projectDetails } from './data/projects';

// Desktop Components
import Taskbar from './components/desktop/Taskbar';
import SocialsMenu from './components/desktop/SocialsMenu';

// App Components
import AboutMe from './components/apps/AboutMe';
import MailClient from './components/apps/MailClient';
import GibbyAI from './components/apps/GibbyAI';
import TechStack from './components/apps/TechStack';
import ProjectGrid from './components/apps/ProjectGrid';
import ProjectViewer from './components/apps/ProjectViewer';

const kawaiiColors = { purple: '#F4D1F9', pink: '#F8C3CD', cream: '#FFF8F0', mint: '#B4F8C8' };

function App() {
  const [time, setTime] = useState(new Date());
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [windowZIndices, setWindowZIndices] = useState({
    about: 30, projects: 31, contact: 32, cats: 33, tech: 34, ai: 110, preview: 120
  });
  const [maxZ, setMaxZ] = useState(120);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // --- Logic ---
  const bringToFront = (windowId) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindowZIndices(prev => ({ ...prev, [windowId]: nextZ }));
    setActiveWindow(windowId);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectDetails[projectId]);
    bringToFront('preview');
  };

  useEffect(() => {
    const handleResize = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setInterval(() => setTime(new Date()), 60000);
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); clearInterval(timer); };
  }, []);

  const positions = useMemo(() => {
    const { width: w, height: h } = screenSize;
    if (w <= 768) return { about: { x: 0, y: 0 }, projects: { x: 0, y: 0 }, contact: { x: 0, y: 0 }, cats: { x: 0, y: 0 }, tech: { x: 0, y: 0 }, preview: { x: 0, y: 0 } };
    
    const sidePadding = (w - Math.min(w, 1400)) / 2;
    const slot = Math.min(w, 1400) / 3;
    return {
      about: { x: sidePadding + (slot / 2) - 190, y: 60 },
      projects: { x: (w / 2) - 170, y: 60 },
      contact: { x: (w / 2) - 170, y: w < 1150 ? 300 : 320 },
      cats: { x: sidePadding + (slot * 2.5) - 190, y: 60 },
      tech: { x: sidePadding + 20, y: 150 },
      preview: { x: (w / 2) - 300, y: 100 }
    };
  }, [screenSize]);

  // --- Render Helpers ---
  const renderWindow = (id, title, icon, width, content, color = kawaiiColors.cream, extraProps = {}) => (
    <div onMouseDown={() => bringToFront(id)} style={{ zIndex: windowZIndices[id] }} 
         className={`absolute pointer-events-auto ${activeWindow === id ? 'active-window' : ''}`}>
      <Window title={title} icon={icon} width={width} defaultPos={positions[id]} bgColor={color} {...extraProps}>
        {content}
      </Window>
    </div>
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden font-mono text-[#222222]" style={{ backgroundColor: kawaiiColors.purple }}>
      <style>{`.active-window { outline: 3px solid black !important; box-shadow: 12px 12px 0px 0px rgba(0,0,0,0.05) !important; }`}</style>

      {/* 1. Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* 2. Windows Layer */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {renderWindow('about', 'ABOUT ME', '🎀', 'w-[380px]', <AboutMe />)}
        {renderWindow('projects', 'PROJECTS.EXE', '💿', 'w-[340px]', <ProjectGrid onProjectClick={handleProjectClick} />)}
        {renderWindow('contact', 'MAIL_CLIENT', '✉️', 'w-[340px]', <MailClient onSuccess={() => setShowSuccess(true)} />)}
        {renderWindow('cats', 'CATS', '🐱', 'w-[380px]', <div className="m-1"><CatGallery /></div>)}

        {selectedProject && renderWindow('preview', `Viewer: ${selectedProject.title}`, selectedProject.icon, 'w-[500px] md:w-[600px]', 
          <ProjectViewer project={selectedProject} />, kawaiiColors.cream, { onClose: () => setSelectedProject(null) })}

        {isTechOpen && renderWindow('tech', 'SYS_PROPERTIES.EXE', '⚙️', 'w-[320px]', <TechStack />, kawaiiColors.cream, { onClose: () => setIsTechOpen(false) })}
        
        {isAiOpen && (
          <div onMouseDown={() => bringToFront('ai')} style={{ zIndex: windowZIndices.ai }} className="absolute pointer-events-auto">
            <Window title="GIBBY_AI.EXE" icon="🤖" width="w-[380px]" defaultPos={{ x: positions.about.x + 180, y: 300 }} bgColor={kawaiiColors.cream} onClose={() => setIsAiOpen(false)}>
              <GibbyAI />
            </Window>
          </div>
        )}
      </div>

      {/* THE INTERACTIVE MASCOT (GIBBY) */}
      <div 
        className="fixed bottom-12 right-0 z-[200] group flex flex-col items-center select-none"
        onMouseEnter={() => {
          const audio = new Audio('/sounds/meow.mp3');
          audio.volume = 0.5;
          audio.play().catch(() => {});
        }}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <div 
          className="relative bg-[#FFF8F0] border-4 border-[#222222] shadow-[4px_4px_0px_0px_black] px-3 py-1.5 font-black text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-300 z-50"
          style={{ marginBottom: '-60px' }}
        >
          HI!
          {/* Bubble Tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#222222]"></div>
        </div>
        
        {/* The Image Swap Logic */}
        <div className="relative w-64 h-auto">
          <img 
            src="/pixel-cat.png" 
            alt="Mascot Idle" 
            className="w-full h-auto object-contain transition-opacity duration-0 group-hover:opacity-0" 
            style={{ imageRendering: 'pixelated', marginBottom: '-100px' }}
          />
          
          <img 
            src="/pixel-cat-active.png" 
            alt="Mascot Active" 
            className="absolute top-0 left-0 w-full h-auto object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-0" 
            style={{ imageRendering: 'pixelated', marginBottom: '-100px' }}
          />
        </div>
      </div>

      <SocialsMenu isOpen={isSocialsOpen} onClose={() => setIsSocialsOpen(false)} />
      <Taskbar time={time} onSocialsClick={() => setIsSocialsOpen(!isSocialsOpen)} onTechClick={() => setIsTechOpen(true)} onAiClick={() => setIsAiOpen(true)} bgColor={kawaiiColors.pink} />
    </div>
  );
}

export default App;