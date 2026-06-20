import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const MailClient = ({ onSuccess }) => {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        setIsSending(false);
        onSuccess();
        e.target.reset();
      })
      .catch((err) => {
        setIsSending(false);
        console.error("Uplink Failed:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 font-mono text-[10px]">
      <input 
        name="name" type="text" required
        className="w-full bg-transparent border-b-2 border-[#222222]/10 outline-none pb-1 focus:border-[#222222] transition-colors" 
        placeholder="NAME" 
      />
      
      <input 
        name="email" type="email" required
        className="w-full bg-transparent border-b-2 border-[#222222]/10 outline-none pb-1 focus:border-[#222222] transition-colors" 
        placeholder="EMAIL" 
      />
      
      <textarea 
        name="message" required
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
  );
};

export default MailClient;