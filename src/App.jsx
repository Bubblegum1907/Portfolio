import React, { useState, useEffect, useMemo } from 'react';
import Window from './components/Window';
import CatGallery from './components/CatGallery';
import { intents } from './data/gibbyIntents';
import { projectDetails } from './data/projects';
import { techStack } from './data/techStack';
import emailjs from '@emailjs/browser';

const kawaiiColors = {
  purple: '#F4D1F9', 
  pink: '#F8C3CD',   
  cream: '#FFF8F0',  
  mint: '#B4F8C8',   
};

function App() {
  const [time, setTime] = useState(new Date());
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: "SYSTEM_READY: I'm Gibby. Ask me about Iba's skills, CGPA, or projects! ✨" }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', text: chatInput };
    const botMsg = { role: 'bot', text: getGibbyResponse(chatInput) };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput("");
  };

  const [windowZIndices, setWindowZIndices] = useState({
    about: 30, projects: 31, contact: 32, cats: 33, tech: 34, ai: 110, preview: 120
  });

  const [maxZ, setMaxZ] = useState(120);

  const bringToFront = (windowId) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindowZIndices(prevZ => ({ ...prevZ, [windowId]: nextZ }));
    setActiveWindow(windowId);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectDetails[projectId]);
    bringToFront('preview');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        setIsSending(false);
        setShowSuccess(true);
        e.target.reset();
      })
      .catch((err) => {
        setIsSending(false);
        console.error(err);
      });
  };

  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
      const handleResize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const positions = useMemo(() => {
    const w = screenSize.width;
    const h = screenSize.height;
    
    const maxDesktopWidth = 1400; 
    const currentContentWidth = Math.min(w, maxDesktopWidth);
    
    const sidePadding = (w - currentContentWidth) / 2;

    const colW = 380; 
    const isTablet = w > 768 && w < 1150;
    if (w <= 768) return { 
      about: { x: 0, y: 0 }, 
      projects: { x: 0, y: 0 }, 
      contact: { x: 0, y: 0 }, 
      cats: { x: 0, y: 0 }, 
      tech: { x: 0, y: 0 }, 
      preview: { x: 0, y: 0 } 
    };

    const slotWidth = currentContentWidth / 3;

    return {
      about: { 
        x: sidePadding + (slotWidth / 2) - (colW / 2), 
        y: 60 
      },

      projects: { 
        x: (w / 2) - (340 / 2), 
        y: 60 
      },
      contact: { 
        x: (w / 2) - (340 / 2), 
        y: isTablet ? 300 : 320 
      },

      cats: { 
        x: sidePadding + (slotWidth * 2.5) - (colW / 2), 
        y: isTablet ? 450 : 60 
      },

      tech: { 
        x: sidePadding + 20, 
        y: 150 
      },

      preview: { 
        x: (w / 2) - (Math.min(w, 600) / 2), 
        y: 100 
      }
    };
  }, [screenSize]);

  const getGibbyResponse = (input) => {
    const query = input.toLowerCase();
    const match = intents.find(intent => intent.keywords.some(key => query.includes(key)));
    return match ? match.response : "System Error: Data not found. Try asking about 'skills', 'Shikisai', or 'CGPA'! 🤖❓";
  };
  
  return (
    <div className="h-screen w-screen relative overflow-x-hidden overflow-y-auto font-mono text-[#222222]" style={{ backgroundColor: kawaiiColors.purple }}>
      
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .active-window { outline: 3px solid black !important; box-shadow: 12px 12px 0px 0px rgba(0,0,0,0.05) !important; }
        
        /* Custom Scrollbar for Project Viewer */
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${kawaiiColors.cream}; border-left: 2px solid black; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${kawaiiColors.mint}; border: 2px solid black; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${kawaiiColors.pink}; }
      `}</style>

      {/* SIDE WIDGET */}
      <div 
        style={{ 
          position: 'absolute',
          left: positions.cats.x + 20,
          top: 500,
          bottom: '60px',
          width: '340px',
          zIndex: 5 
        }}
        className="block opacity-80 hover:opacity-100 transition-opacity pointer-events-none"
      >
        <div className="border-[3px] border-[#222222] p-3 bg-white/20 backdrop-blur-sm font-mono text-[9px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between border-b-2 border-[#222222] pb-1 mb-2 font-black uppercase tracking-widest">
            <span>System_Monitor</span>
            <span className="animate-pulse">● LIVE</span>
          </div>
          
          <div className="space-y-3">
            {/* CGPA Progress Bar */}
            <div>
              <div className="flex justify-between mb-1 uppercase font-bold">
                <span>CGPA</span>
                <span>6.85 / 10.0</span>
              </div>
              <div className="w-full h-3 border-2 border-[#222222] bg-white overflow-hidden">
                <div className="h-full bg-[#B4F8C8] w-[68.5%] border-r-2 border-[#222222]"></div>
              </div>
            </div>

            {/* Other Stats */}
            <div className="grid grid-cols-2 gap-2 text-[8px] font-bold uppercase">
              <div className="p-1 border border-[#222222]/30 bg-white/40">
                CPU_TEMP: <span className="text-pink-500">OPTIMAL</span>
              </div>
              <div className="p-1 border border-[#222222]/30 bg-white/40">
                MEMORY: 1907MB
              </div>
              <div className="p-1 border border-[#222222]/30 bg-white/40">
                UPLINK: ACTIVE
              </div>
              <div className="p-1 border border-[#222222]/30 bg-white/40">
                VIBE: 100%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* 2. WINDOWS LAYER */}
      <div className="fixed inset-0 pointer-events-none z-10">
        
        {/* ABOUT */}
        <div onMouseDown={() => bringToFront('about')} style={{ zIndex: windowZIndices.about }} 
             className={`absolute pointer-events-auto ${activeWindow === 'about' ? 'active-window' : ''}`}>
          <Window title="ABOUT ME" icon="🎀" width="w-[380px]" defaultPos={positions.about} bgColor={kawaiiColors.cream}>
            <div className="flex flex-col items-center gap-4 p-6 text-[11px] font-bold">
              <div className="w-48 h-48 rounded-full border-4 border-[#222222] overflow-hidden shadow-[8px_8px_0px_0px_black] bg-white">
                <img src="/iba.jpeg" alt="Iba" className="w-full h-full object-cover" />
              </div>
              <p className="leading-relaxed text-center px-2">
                Hi! I'm Iba Shibli, a second year CS student at NSUT Dwarka. I'm building AI systems that feel more human.
              </p>
            </div>
          </Window>
        </div>

        {/* PROJECTS */}
        <div onMouseDown={() => bringToFront('projects')} 
            style={{ zIndex: windowZIndices.projects }} 
            className={`absolute pointer-events-auto ${activeWindow === 'projects' ? 'active-window' : ''}`}>
          <Window title="PROJECTS.EXE" icon="💿" width="w-[340px]" defaultPos={positions.projects} bgColor={kawaiiColors.cream}>
            <div className="p-4 grid grid-cols-3 gap-2 place-items-center">
              
              {Object.keys(projectDetails).map((key) => {
                const project = projectDetails[key];
                return (
                  <button 
                    key={key}
                    onClick={() => handleProjectClick(key)} 
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
          </Window>
        </div>

        {/* CONTACT */}
        <div onMouseDown={() => bringToFront('contact')} style={{ zIndex: windowZIndices.contact }} 
            className={`absolute pointer-events-auto ${activeWindow === 'contact' ? 'active-window' : ''}`}>
          <Window title="MAIL_CLIENT" icon="✉️" width="w-[340px]" defaultPos={positions.contact} bgColor={kawaiiColors.cream}>
            <form onSubmit={handleFormSubmit} className="p-4 flex flex-col gap-3 font-mono text-[10px]">
              
              <input 
                name="name" 
                type="text"
                required
                className="w-full bg-transparent border-b-2 border-[#222222]/10 outline-none pb-1 focus:border-[#222222] transition-colors" 
                placeholder="NAME" 
              />
              
              <input 
                name="email" 
                type="email"
                required
                className="w-full bg-transparent border-b-2 border-[#222222]/10 outline-none pb-1 focus:border-[#222222] transition-colors" 
                placeholder="EMAIL" 
              />
              
              <textarea 
                name="message" 
                required
                className="w-full bg-white/30 border border-[#222222] h-16 p-2 outline-none resize-none focus:bg-white/60 transition-all" 
                placeholder="LEAVE A MESSAGE..." 
              />
              
              <button 
                type="submit"
                disabled={isSending}
                className={`bg-[#B0E0E6] border-2 border-[#222222] py-2 font-bold shadow-[4px_4px_0px_0px_black] transition-all uppercase text-[10px] 
                  ${isSending ? 'opacity-50 cursor-not-allowed' : 'active:shadow-none active:translate-x-1 active:translate-y-1'}`}
              >
                {isSending ? "UPLINKING..." : "Submit"}
              </button>

            </form>
          </Window>
        </div>

        {/* CATS */}
        <div onMouseDown={() => bringToFront('cats')} style={{ zIndex: windowZIndices.cats }} 
             className={`absolute pointer-events-auto ${activeWindow === 'cats' ? 'active-window' : ''}`}>
          <Window title="CATS" icon="🐱" width="w-[380px]" defaultPos={positions.cats} bgColor={kawaiiColors.cream}>
            <div className="m-1"><CatGallery /></div>
          </Window>
        </div>

        {selectedProject && (
          <div onMouseDown={() => bringToFront('preview')} style={{ zIndex: windowZIndices.preview }} className="absolute pointer-events-auto">
            <Window 
              title={`Viewer: ${selectedProject.title}`} 
              icon={selectedProject.icon} 
              width="w-[500px] md:w-[600px]" 
              defaultPos={positions.preview} 
              bgColor={kawaiiColors.cream}
              onClose={() => setSelectedProject(null)}
            >
              <div className="h-[450px] overflow-y-auto p-4 font-mono custom-scrollbar">
                <h2 className="text-xl font-bold border-b-4 border-[#222222] mb-4 uppercase inline-block">{selectedProject.title}</h2>
                <div className="flex gap-2 mb-6">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="bg-[#222222] text-white text-[9px] px-2 py-0.5">{t}</span>
                  ))}
                </div>
                
                <p className="text-xs leading-relaxed mb-8 bg-white/60 p-4 border-2 border-dashed border-[#222222]">
                  {selectedProject.description}
                </p>

                <div className="space-y-6">
                  <div className="aspect-video bg-[#222222] border-4 border-[#222222] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                    <video 
                      src={selectedProject.video}
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {selectedProject.media.map((img, i) => (
                    <img key={i} src={img} className="w-full border-4 border-[#222222] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]" alt="Preview" />
                  ))}
                </div>

                <div className="flex gap-4 sticky bottom-0 bg-[#FFF8F0]/90 backdrop-blur-sm pt-4 pb-2 mt-8">
                  <a href={selectedProject.github} target="_blank" className="flex-1 bg-[#222222] text-white text-center py-2 font-bold text-[10px] border-2 border-[#222222] shadow-[4px_4px_0px_0px_#B4F8C8] hover:translate-x-1 transition-all">GITHUB_REPO</a>
                  <a href={selectedProject.demo} target="_blank" className="flex-1 bg-white border-2 border-[#222222] text-center py-2 font-bold text-[10px] shadow-[4px_4px_0px_0px_#F8C3CD] hover:translate-x-1 transition-all">LIVE_DEPLOY</a>
                </div>
              </div>
            </Window>
          </div>
        )}
      </div>

      {/* TECH STACK WINDOW */}
      {isTechOpen && (
        <div 
          onMouseDown={() => bringToFront('tech')} 
          style={{ zIndex: windowZIndices.tech || 60 }} 
          className="absolute pointer-events-auto"
        >
          <Window 
            key={`tech-win-${screenSize.width}`} 
            title="SYS_PROPERTIES.EXE" 
            icon="⚙️" 
            width="w-[320px]" 
            defaultPos={positions.tech} 
            bgColor={kawaiiColors.cream}
            onClose={() => setIsTechOpen(false)}
          >
            <div className="p-4 font-mono text-[11px] space-y-4">
              {Object.entries(techStack).map(([category, skills]) => (
                <div key={category} className="border-2 border-[#222222] p-2 bg-white/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <h3 className="bg-[#222222] text-white px-2 inline-block mb-2 uppercase font-bold">{category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map(skill => (
                      <span key={skill} className="border border-[#222222]/20 px-1 bg-[#B4F8C8]/30">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <div className="text-[9px] mb-1 font-bold">SYSTEM_OPTIMIZATION: 94%</div>
                <div className="w-full h-4 border-2 border-[#222222] bg-white overflow-hidden">
                  <div className="h-full bg-[#F8C3CD] w-[94%] border-r-2 border-[#222222] animate-pulse"></div>
                </div>
              </div>
            </div>
          </Window>
        </div>
      )}

      {/* GIBBY_AI */}
      {isAiOpen && (
        <div onMouseDown={() => bringToFront('ai')} style={{ zIndex: windowZIndices.ai || 80 }} className="absolute pointer-events-auto">
          <Window 
            title="GIBBY_AI.EXE" 
            icon="🤖" 
            width="w-[380px]"
            defaultPos={{ x: positions.about.x + 180, y: 300 }} 
            bgColor={kawaiiColors.cream}
            onClose={() => setIsAiOpen(false)}
          >
            <div className="flex flex-col h-[280px] font-mono">
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar bg-white/40 border-2 border-[#222222] mb-2">
                {messages.map((msg, i) => (
                  <div key={i} className={`text-[10px] p-2 border-[2px] border-[#222222] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] 
                    ${msg.role === 'user' ? 'bg-[#B4F8C8] ml-6' : 'bg-[#B0E0E6] mr-6'}`}>
                    <span className="font-black uppercase block mb-1 text-[8px] opacity-70">
                      {msg.role === 'user' ? 'SYSTEM_USER' : 'GIBBY_CORE'}
                    </span>
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-1">
                <input 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white border-2 border-[#222222] px-2 py-1 text-[10px] outline-none"
                  placeholder="INPUT COMMAND..."
                />
                <button type="submit" className="bg-[#F8C3CD] border-2 border-[#222222] px-4 font-black text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none uppercase">
                  EXE
                </button>
              </form>
            </div>
          </Window>
        </div>
      )}
      {showSuccess && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#222222]/40 backdrop-blur-sm pointer-events-auto">
          <div className="w-[300px] bg-[#FFF8F0] border-4 border-[#222222] shadow-[10px_10px_0px_0px_black] overflow-hidden animate-in zoom-in duration-200">
            
            {/* Header */}
            <div className="bg-[#B4F8C8] border-b-4 border-[#222222] p-2 flex justify-between items-center">
              <span className="font-bold text-[10px] uppercase tracking-widest">System_Message</span>
              <button onClick={() => setShowSuccess(false)} className="hover:scale-110">✨</button>
            </div>

            {/* Body */}
            <div className="p-6 text-center flex flex-col items-center gap-4">
              <div className="text-4xl animate-bounce">📧</div>
              <p className="font-bold text-xs leading-tight uppercase">
                Packet Uplink Stable!<br />
                <span className="text-[10px] opacity-60">Your message is traveling through the stars...</span>
              </p>
              
              <button 
                onClick={() => setShowSuccess(false)}
                className="bg-[#F8C3CD] border-2 border-[#222222] px-8 py-2 font-bold text-[10px] shadow-[4px_4px_0px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase"
              >
                OK_DONE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOCIALS POPUP MENU */}
      {isSocialsOpen && (
        <div className="fixed bottom-14 left-4 w-56 bg-white border-4 border-[#222222] shadow-[8px_8px_0px_0px_black] z-[1000] animate-in slide-in-from-bottom-2">
          
          {/* Header */}
          <div className="bg-[#F8C3CD] border-b-4 border-[#222222] p-2 flex justify-between items-center font-bold text-[10px] uppercase">
            <span>Connected_Nodes</span>
            {/* New Close Button */}
            <button 
              onClick={() => setIsSocialsOpen(false)} 
              className="w-5 h-5 bg-red-400 border-2 border-[#222222] font-bold text-[10px] flex items-center justify-center active:scale-95"
            >
              X
            </button>
          </div>

          <div className="flex flex-col">
            {/* GitHub */}
            <a href="https://github.com/Bubblegum1907" target="_blank" className="p-3 hover:bg-[#B4F8C8] border-b-2 border-[#222222] font-bold text-xs flex items-center gap-3">
              <img src="/icons/github.png" alt="GitHub" className="w-4 h-4 object-contain" />
              GitHub
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/iba-shibli-277a37323/" target="_blank" className="p-3 hover:bg-[#B4F8C8] border-b-2 border-[#222222] font-bold text-xs flex items-center gap-3">
              <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4 object-contain" />
              LinkedIn
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/phoenix_69185/" target="_blank" className="p-3 hover:bg-[#B4F8C8] font-bold text-xs flex items-center gap-3">
              <img src="/icons/insta.png" alt="Instagram" className="w-4 h-4 object-contain" />
              Instagram
            </a>
          </div>
        </div>
      )}

      {/* 3. TASKBAR */}
      <div className="fixed bottom-0 left-0 w-full h-12 border-t-4 border-[#222222] flex items-center px-4 justify-between z-[100]" style={{ backgroundColor: kawaiiColors.pink }}>
        
        <div className="flex gap-2">
          
          {/* SOCIALS BUTTON */}
          <button 
            onClick={() => setIsSocialsOpen(!isSocialsOpen)} 
            className="bg-[#B0E0E6] 
                      /* Responsive Sizing: Thinner but still wide enough */
                      px-2 h-7 sm:px-4 sm:h-9 
                      border-[2px] sm:border-[3px] border-[#222222] 
                      shadow-[2px_2px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] 
                      flex items-center justify-center group"
          >
            <img 
              src="/icons/socials.png" 
              alt="Socials" 
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
            
            <span className="ml-1 sm:ml-2 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-tighter leading-none">
              Socials
            </span>
          </button>

          {/* SYSTEM BUTTON */}
          <button 
            onClick={() => setIsTechOpen(true)} 
            className="bg-[#B0E0E6] 
                      /* Responsive Sizing: Thinner height for mobile */
                      px-2 h-7 sm:px-4 sm:h-9 
                      /* Scaled border and shadow to match */
                      border-[2px] sm:border-[3px] border-[#222222] 
                      shadow-[2px_2px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] 
                      hover:translate-y-[-1px] active:shadow-none 
                      active:translate-x-[2px] active:translate-y-[2px] 
                      transition-all flex items-center justify-center group"
          >
            <img 
              src="/icons/techstack.png" 
              alt="System" 
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain group-hover:rotate-12 transition-transform"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="ml-1 sm:ml-2 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-tighter leading-none">
              System
            </span>
          </button>

          {/* GIBBY_AI BUTTON */}
          <button 
            onClick={() => setIsAiOpen(true)} 
            className="bg-[#B0E0E6] 
                      /* Responsive Sizing */
                      px-2 h-7 sm:px-4 sm:h-9 
                      border-[2px] sm:border-[3px] border-[#222222] 
                      shadow-[2px_2px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] 
                      hover:bg-[#A1D1D7] active:shadow-none 
                      active:translate-x-[2px] active:translate-y-[2px] 
                      transition-all flex items-center justify-center group"
          >
            <img 
              src="/icons/Gibby.png" 
              alt="Gibby AI" 
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain group-hover:scale-110 transition-transform"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="ml-1 sm:ml-2 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-tighter leading-none">
              Gibby_AI
            </span>
          </button>
        </div>

        <div className="hidden md:block text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">IBA_OS SYSTEM V2.0</div>
        
        <div className="bg-white border-2 border-[#222222] px-4 h-8 flex items-center font-bold text-xs shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.1)]">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default App;