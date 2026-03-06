import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Bot, 
  Send, 
  User,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const DemoAgentesIA = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{
      type: 'bot',
      text: '¡Hola! Soy el asistente virtual de Leapifyes. Estoy aquí para ayudarte con información sobre nuestros servicios de transformación digital y agentes de IA. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }]);
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { type: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: text,
        session_id: sessionId
      });

      if (response.data.session_id) {
        setSessionId(response.data.session_id);
      }

      const botMessage = {
        type: 'bot',
        text: response.data.response,
        timestamp: new Date(response.data.timestamp)
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error('Chat error:', err);
      setError('Error al conectar con el asistente. Por favor, inténtalo de nuevo.');
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Lo siento, estoy teniendo problemas técnicos. Por favor, contacta directamente a info@leapifyes.com o llama al +34 694 214 849.',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    setMessages([{
      type: 'bot',
      text: '¡Hola de nuevo! ¿En qué puedo ayudarte?',
      timestamp: new Date()
    }]);
    setSessionId(null);
    setError(null);
  };

  const quickQuestions = [
    '¿Qué servicios ofrecéis?',
    '¿Cuánto cuesta un agente IA?',
    'Quiero agendar una demo'
  ];

  return (
    <div className="min-h-screen bg-[#080B14]" data-testid="demo-agentes-page">
      {/* Header */}
      <header className="bg-[#0D1117] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B93A4] via-[#3B82F6] to-[#D946EF] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#F0F4FF]">Leapifyes</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-[#8892A4]">
              <Sparkles className="w-4 h-4 text-[#D946EF]" />
              <span>Powered by GPT-5.2</span>
            </div>
            <Button variant="outline" onClick={resetConversation} className="border-white/10 text-[#8892A4] hover:bg-white/5 hover:text-[#F0F4FF]" data-testid="reset-demo">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-white/10 bg-[#161B22]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D946EF] to-[#3B82F6] flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#F0F4FF]">Asistente Leapifyes</h2>
                    <p className="text-sm text-[#8892A4]">IA real, no simulación</p>
                  </div>
                </div>
                <p className="text-[#8892A4] text-sm mb-4">
                  Este es un asistente real con inteligencia artificial. Puedes preguntarle sobre:
                </p>
                <ul className="space-y-2">
                  {[
                    'Servicios de transformación digital',
                    'Planes y precios de agentes IA',
                    'Casos de éxito y metodología',
                    'Agendar una demo personalizada',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#8892A4]">
                      <CheckCircle2 className="w-4 h-4 text-[#1B93A4]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-[#1B93A4]/10 to-[#D946EF]/10">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#F0F4FF] mb-2">¿Te gustaría uno así?</h3>
                <p className="text-sm text-[#8892A4] mb-4">
                  Personalizamos agentes para tu negocio específico. Tu voz, tu conocimiento, tu marca.
                </p>
                <Link to="/contacto">
                  <Button className="btn-gradient w-full" data-testid="demo-contact-btn">
                    Solicitar Demo Personalizada
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-2">
            <Card className="border-white/10 bg-[#161B22] overflow-hidden">
              {/* Chat Header */}
              <div className="bg-[#0D1117] text-white p-4 flex items-center gap-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B93A4] to-[#D946EF] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#F0F4FF]">Asistente Leapifyes</p>
                  <p className="text-xs text-[#8892A4] flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                    {isLoading ? 'Escribiendo...' : 'En línea'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto bg-[#080B14] p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.type === 'bot' && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isError ? 'bg-red-500/20' : 'bg-gradient-to-br from-[#1B93A4] to-[#3B82F6]'}`}>
                            <Bot className={`w-4 h-4 ${msg.isError ? 'text-red-400' : 'text-white'}`} />
                          </div>
                        )}
                        {msg.type === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-[#8892A4]" />
                          </div>
                        )}
                        <div className={`rounded-2xl p-3 ${
                          msg.type === 'user'
                            ? 'bg-[#1B93A4] text-white rounded-tr-none'
                            : msg.isError 
                              ? 'bg-red-500/10 border border-red-500/20 rounded-tl-none'
                              : 'bg-[#161B22] border border-white/10 rounded-tl-none'
                        }`}>
                          <p className={`text-sm whitespace-pre-wrap ${msg.isError ? 'text-red-400' : msg.type === 'user' ? 'text-white' : 'text-[#C9D1D9]'}`}>{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white/70' : 'text-[#8892A4]'}`}>
                            {msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B93A4] to-[#3B82F6] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-[#161B22] border border-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#1B93A4]" />
                      <span className="text-sm text-[#8892A4]">Pensando...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="bg-[#0D1117] border-t border-white/5 p-4">
                  <p className="text-xs text-[#8892A4] mb-2">Preguntas rápidas:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(q)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#8892A4] text-sm rounded-full transition-colors disabled:opacity-50"
                        data-testid={`quick-question-${index}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="bg-[#0D1117] border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50"
                    disabled={isLoading}
                    data-testid="chat-input"
                  />
                  <Button 
                    onClick={handleSend} 
                    className="btn-gradient" 
                    disabled={isLoading || !inputValue.trim()}
                    data-testid="chat-send"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoAgentesIA;
