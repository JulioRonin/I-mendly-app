import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Sparkles, MapPin, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { MOCK_PROVIDERS } from '../constants';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onActionTrigger: (action: string, data?: any) => void;
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, setMessages, onActionTrigger, onBack }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    setRippleStyle({
      left: e.clientX - rect.left - 10,
      top: e.clientY - rect.top - 10,
    });
    setTimeout(() => setRippleStyle(null), 600);
  }, []);

  const handleSend = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!input.trim() && !isLoading) return;
    if (e) handleRipple(e);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(input);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderProviderCard = (providerId: string) => {
    const provider = MOCK_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return null;

    return (
      <div
        className="mt-3 bg-white rounded-3xl p-5 border border-black/5 shadow-xs max-w-xs animate-spring-in cursor-pointer hover:shadow-card transition-shadow"
        onClick={() => onActionTrigger('OPEN_PROVIDER', provider)}
      >
        <div className="flex gap-4 mb-3">
          <img src={provider.avatarUrl} className="w-12 h-12 rounded-2xl object-cover" alt={provider.name} />
          <div>
            <h4 className="font-bold text-ink text-sm">{provider.name}</h4>
            <p className="text-[10px] text-green-600 font-semibold uppercase tracking-wider">{provider.specialty}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={10} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] text-ink font-bold">{provider.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-black/5 pt-3">
          <div className="flex items-center gap-1 text-xs text-ink-muted">
            <MapPin size={11} />
            <span>{provider.distance || 'Cerca de ti'}</span>
          </div>
          <span className="text-green-600 text-xs font-bold flex items-center gap-1">
            Ver Perfil <ArrowRight size={12} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-canvas relative animate-fade-in z-50">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between sticky top-0 bg-canvas/90 backdrop-blur-md z-10 border-b border-black/5">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center text-ink hover:bg-black/5 transition-colors">
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h2 className="text-lg font-black text-ink flex items-center gap-2">
              Mendly AI
              <Sparkles size={14} className="text-green-500" />
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-dot" />
              <p className="text-[10px] text-ink-muted font-mono">En Línea</p>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 bg-ink rounded-2xl flex items-center justify-center animate-glow-pulse">
          <Sparkles size={16} className="text-green-400" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 space-y-4 pb-32 pt-4 no-scrollbar relative z-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center mt-10">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xs border border-black/5 mb-5 animate-float">
              <Sparkles size={26} className="text-green-500" />
            </div>
            <h3 className="text-xl font-black text-ink mb-2 animate-slide-up">¿Cómo puedo ayudarte?</h3>
            <p className="text-sm text-ink-secondary max-w-xs mb-6 leading-relaxed animate-slide-up delay-1">
              Soy tu asistente personal. Cuéntame qué necesitas reparar o mejorar en tu hogar hoy.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-xs animate-card-in delay-2">
              {["Tengo una fuga 💧", "Necesito un electricista ⚡", "Carpintería 🔨"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion.replace(/ .*/, '...'))}
                  className="px-4 py-2.5 bg-white rounded-full text-xs font-semibold text-ink-secondary shadow-xs border border-black/5 hover:border-green-200 hover:text-green-600 hover:scale-105 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-spring-in`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`
                  px-5 py-4 rounded-3xl text-sm leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-ink text-white rounded-tr-lg'
                    : 'bg-white text-ink border border-black/5 rounded-tl-lg shadow-xs'}
                `}
              >
                {msg.text}
              </div>

              {msg.role === 'system' && msg.payload?.metadata?.latency_goal === 'PROVIDER_card' &&
                renderProviderCard(msg.payload.replicate_model as string)
              }

              <span className="text-[9px] text-ink-muted mt-1.5 px-2 font-mono">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-spring-in">
            <div className="bg-white px-5 py-4 rounded-3xl rounded-tl-lg border border-black/5 shadow-xs flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-canvas via-canvas to-transparent z-40">
        <div className="bg-white p-1.5 pl-5 rounded-full shadow-float border border-black/5 flex items-center justify-between">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-transparent outline-none text-ink text-sm placeholder:text-ink-muted h-11"
          />
          <button
            onClick={(e) => handleSend(e)}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-green disabled:opacity-40 disabled:cursor-not-allowed btn-ripple relative overflow-hidden"
          >
            {rippleStyle && <span className="ripple-circle" style={rippleStyle} />}
            <Send size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
