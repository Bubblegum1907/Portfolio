import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const headerPink = '#F8C3CD';

const Window = ({ title, children, icon, onClose, defaultPos, bgColor, width = "w-80" }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={defaultPos}>
      <div 
        ref={nodeRef} 
        className={`absolute ${width} bg-white border-4 border-[#222222] shadow-[8px_8px_0px_0px_black] overflow-hidden pointer-events-auto`}
      >
        <div className="window-header border-b-4 border-[#222222] p-2 flex justify-between items-center cursor-grab active:cursor-grabbing select-none" style={{ backgroundColor: '#F8C3CD' }}>
          <div className="flex items-center gap-2 font-bold text-[10px] md:text-sm uppercase">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-5 h-5 bg-red-400 border-2 border-[#222222] font-bold text-[10px] flex items-center justify-center">X</button>
          )}
        </div>

        <div className="p-4" style={{ backgroundColor: bgColor || '#FFF8F0' }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;