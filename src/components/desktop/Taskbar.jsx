import React from 'react';

const Taskbar = ({ time, onSocialsClick, onTechClick, onAiClick, bgColor }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-12 border-t-4 border-[#222222] flex items-center px-4 justify-between z-[100]" style={{ backgroundColor: bgColor }}>
      
      <div className="flex gap-2">
        {/* SOCIALS */}
        <button onClick={onSocialsClick} className="bg-[#B0E0E6] px-2 h-7 sm:px-4 sm:h-9 border-[2px] sm:border-[3px] border-[#222222] shadow-[2px_2px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] flex items-center justify-center">
          <img src="/icons/socials.png" alt="Socials" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" style={{ imageRendering: 'pixelated' }} />
          <span className="ml-1 sm:ml-2 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">Socials</span>
        </button>

        {/* SYSTEM */}
        <button onClick={onTechClick} className="bg-[#B0E0E6] px-2 h-7 sm:px-4 sm:h-9 border-[2px] sm:border-[3px] border-[#222222] shadow-[2px_2px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] hover:translate-y-[-1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center group">
          <img src="/icons/techstack.png" alt="System" className="w-4 h-4 sm:w-5 sm:h-5 object-contain group-hover:rotate-12 transition-transform" style={{ imageRendering: 'pixelated' }} />
          <span className="ml-1 sm:ml-2 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">System</span>
        </button>

        {/* GIBBY_AI */}
        <button onClick={onAiClick} className="bg-[#B0E0E6] px-2 h-7 sm:px-4 sm:h-9 border-[2px] sm:border-[3px] border-[#222222] shadow-[2px_2px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] hover:bg-[#A1D1D7] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center group">
          <img src="/icons/Gibby.png" alt="Gibby AI" className="w-4 h-4 sm:w-5 sm:h-5 object-contain group-hover:scale-110 transition-transform" style={{ imageRendering: 'pixelated' }} />
          <span className="ml-1 sm:ml-2 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">Gibby_AI</span>
        </button>
      </div>

      <div className="hidden md:block text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">IBA_OS SYSTEM V2.0</div>
      
      <div className="bg-white border-2 border-[#222222] px-4 h-8 flex items-center font-bold text-xs shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.1)]">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Taskbar;