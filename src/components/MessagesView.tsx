import React, { useState } from 'react';
import { Send, Phone, MapPin, CheckCheck, ShieldCheck } from 'lucide-react';

interface MessagesViewProps {
  onCallPro: (name: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'pro' | 'user';
  text: string;
  time: string;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ onCallPro }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputVal('');

    // Simulated reply after 1s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'pro',
        text: 'Received! Turning onto Boring Road now. Will call when at the gate.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#080D1A] pb-16 animate-in fade-in duration-200">
      {/* Technician Chat Top Header */}
      <div className="p-3.5 bg-[#0D1527] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
              alt="Rahul Kumar"
              className="w-10 h-10 rounded-full object-cover border border-blue-400/50"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0D1527]" />
          </div>
          <div>
            <div className="flex items-center gap-1 font-bold text-white text-xs">
              <span>Rahul Kumar</span>
              <span className="text-blue-400 text-xs">✓</span>
            </div>
            <span className="text-[10px] text-slate-400 block">HomeFix Electrician Pro</span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Arriving in 22 mins</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onCallPro('Rahul Kumar')}
            className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 transition"
            title="Call Rahul Kumar"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="px-4 py-2 bg-blue-950/40 border-b border-blue-900/30 flex items-center gap-2 text-[10px] text-blue-300">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>Share doorstep safety OTP (4819) only when Rahul arrives in uniform.</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">No Active Messages</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
              Book a professional from the home screen to chat and coordinate your service.
            </p>
          </div>
        ) : (
          messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-br-xs shadow-md shadow-blue-600/20'
                    : 'bg-[#111C38] text-slate-200 border border-slate-800 rounded-bl-xs'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
              </div>
              <div className="flex items-center gap-1 mt-0.5 px-1 text-[9px] text-slate-400">
                <span>{m.time}</span>
                {isUser && <CheckCheck className="w-3 h-3 text-blue-400" />}
              </div>
            </div>
          );
        })
        )}
      </div>

      {/* Quick Reply Chips */}
      <div className="px-4 py-1.5 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          'Power switch is OFF 👍',
          'Flat 402, 4th floor lift works',
          'Call me when at gate',
          'Need extra switch replacement',
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => handleSend(chip)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] text-slate-300 hover:text-white hover:border-blue-500/50 transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 bg-[#0D1527] border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message technician..."
          className="flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim()}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition active:scale-95 shadow-md shadow-blue-600/30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
