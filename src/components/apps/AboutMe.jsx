import React from 'react';

const AboutMe = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 text-[11px] font-bold">
      {/* Profile Picture Container */}
      <div className="w-48 h-48 rounded-full border-4 border-[#222222] overflow-hidden shadow-[8px_8px_0px_0px_black] bg-white">
        <img 
          src="/iba.jpeg" 
          alt="Iba Shibli" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Bio Text */}
      <p className="leading-relaxed text-center px-2">
        Hi! I'm Iba Shibli, a second year CS student at NSUT Dwarka. 
        I'm building AI systems that feel more human.
      </p>
      
      {/* Fun "System Status" tag since it's an OS aesthetic */}
      <div className="mt-2 px-3 py-1 bg-[#B4F8C8] border-2 border-[#222222] text-[9px] uppercase tracking-tighter">
        Status: Online & Optimizing
      </div>
    </div>
  );
};

export default AboutMe;