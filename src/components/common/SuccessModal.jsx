import React from 'react';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#222222]/40 backdrop-blur-sm pointer-events-auto">
      <div className="w-[300px] bg-[#FFF8F0] border-4 border-[#222222] shadow-[10px_10px_0px_0px_black] overflow-hidden animate-in zoom-in duration-200">
        <div className="bg-[#B4F8C8] border-b-4 border-[#222222] p-2 flex justify-between items-center">
          <span className="font-bold text-[10px] uppercase tracking-widest">System_Message</span>
          <button onClick={onClose} className="hover:scale-110">✨</button>
        </div>

        <div className="p-6 text-center flex flex-col items-center gap-4">
          <div className="text-4xl animate-bounce">📧</div>
          <p className="font-bold text-xs leading-tight uppercase">
            Packet Uplink Stable!<br />
            <span className="text-[10px] opacity-60">Your message is traveling through the stars...</span>
          </p>
          <button 
            onClick={onClose}
            className="bg-[#F8C3CD] border-2 border-[#222222] px-8 py-2 font-bold text-[10px] shadow-[4px_4px_0px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase"
          >
            OK_DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;