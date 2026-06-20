import React, { useState } from 'react';
import { intents } from '../../data/gibbyIntents'; // Adjust path as needed

const GibbyAI = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: "SYSTEM_READY: I'm Gibby. Ask me about Iba's projects or skills! ✨" }
  ]);

  const getGibbyResponse = (input) => {
    const query = input.toLowerCase();
    const match = intents.find(intent => intent.keywords.some(key => query.includes(key)));
    return match ? match.response : "System Error: Data not found. Try asking about 'skills' or 'projects'! 🤖❓";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', text: chatInput };
    const botMsg = { role: 'bot', text: getGibbyResponse(chatInput) };
    
    setMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput("");
  };

  return (
    <div className="flex flex-col h-[280px] font-mono">
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
  );
};

export default GibbyAI;