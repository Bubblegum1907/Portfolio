import React, { useState } from 'react';

const catData = [
  { name: 'Simba', file: '/simba.jpeg' },
  { name: 'Fury', file: '/fury.jpeg' },
  { name: 'Dodo', file: '/dodo.jpeg' },
  { name: 'Juno', file: '/juno.jpeg' },
  { name: 'Paris', file: '/paris.jpeg' }
];

const CatGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextCat = () => {
    setCurrentIndex((prev) => (prev + 1) % catData.length);
  };

  const showPrevCat = () => {
    setCurrentIndex((prev) => (prev - 1 + catData.length) % catData.length);
  };

  const currentCat = catData[currentIndex];

  return (
    <div className="p-1 flex flex-col gap-2 font-mono">
      
      {/* Photo Display Area */}
      <div className="relative border-2 border-[#222222] bg-white flex items-center justify-center h-52 md:h-64 overflow-hidden 
                      shadow-[inner_4px_4px_0px_0px_rgba(0,0,0,0.2)]">
        
        <img 
          src={currentCat.file} 
          alt={currentCat.name}
          className="w-full h-full object-cover select-none"
          onError={(e) => {
            e.target.src=`https://placehold.co/400x300?text=${currentCat.name}.jpeg+not+found`;
          }}
        />

        {/* Navigation Overlays */}
        <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
          <button 
            onClick={showPrevCat} 
            className="pointer-events-auto bg-white border-2 border-[#222222] w-8 h-8 flex items-center justify-center font-bold 
                       shadow-[2px_2px_0px_0px_black] hover:bg-[#FFD1DC] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            ‹
          </button>
          <button 
            onClick={showNextCat} 
            className="pointer-events-auto bg-white border-2 border-[#222222] w-8 h-8 flex items-center justify-center font-bold 
                       shadow-[2px_2px_0px_0px_black] hover:bg-[#B4F8C8] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            ›
          </button>
        </div>
      </div>

      {/* Retro Status Bar */}
      <div className="bg-[#222222] text-white text-[10px] font-bold p-1 flex justify-between uppercase border border-[#222222] px-2">
        <div className="flex gap-2 items-center">
          <span className="text-[#F8C3CD] animate-pulse">●</span>
          <span>{currentCat.name}.JPEG</span>
        </div>
        <span className="opacity-70">IMAGE_FILE [{currentIndex + 1}/5]</span>
      </div>

    </div>
  );
};

export default CatGallery;