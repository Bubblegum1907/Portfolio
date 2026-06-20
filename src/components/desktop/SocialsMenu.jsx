import React from 'react';

const SocialsMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-14 left-4 w-56 bg-white border-4 border-[#222222] shadow-[8px_8px_0px_0px_black] z-[1000] animate-in slide-in-from-bottom-2">
      <div className="bg-[#F8C3CD] border-b-4 border-[#222222] p-2 flex justify-between items-center font-bold text-[10px] uppercase">
        <span>Connected_Nodes</span>
        <button onClick={onClose} className="w-5 h-5 bg-red-400 border-2 border-[#222222] font-bold text-[10px] flex items-center justify-center active:scale-95">
          X
        </button>
      </div>

      <div className="flex flex-col">
        <a href="https://github.com/Bubblegum1907" target="_blank" rel="noreferrer" className="p-3 hover:bg-[#B4F8C8] border-b-2 border-[#222222] font-bold text-xs flex items-center gap-3">
          <img src="/icons/github.png" alt="GitHub" className="w-4 h-4 object-contain" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/iba-shibli-277a37323/" target="_blank" rel="noreferrer" className="p-3 hover:bg-[#B4F8C8] border-b-2 border-[#222222] font-bold text-xs flex items-center gap-3">
          <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4 object-contain" />
          LinkedIn
        </a>
        <a href="https://www.instagram.com/phoenix_69185/" target="_blank" rel="noreferrer" className="p-3 hover:bg-[#B4F8C8] font-bold text-xs flex items-center gap-3">
          <img src="/icons/insta.png" alt="Instagram" className="w-4 h-4 object-contain" />
          Instagram
        </a>
      </div>
    </div>
  );
};

export default SocialsMenu;