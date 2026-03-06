import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { DIAGNOSTIC_QUESTIONS } from '../../lib/constants';
import { trackStartDiagnostico, trackFinishDiagnostico } from '../../lib/analytics';

const Diagnostico = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    trackStartDiagnostico();
  }, []);

  const totalSteps = DIAGNOSTIC_QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStep];

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      localStorage.setItem('diagnosticAnswers', JSON.stringify(answers));
      const score = Object.values(answers).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
      trackFinishDiagnostico(score);
      setIsCompleted(true);
      setTimeout(() => {
        navigate('/app/resultados');
      }, 2000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = answers[currentQuestion?.id];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#080B14] flex items-center justify-center" data-testid="diagnostico-complete">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-[#F0F4FF] mb-4">¡Análisis Completado!</h2>
          <p className="text-[#8892A4]">Calculando tu Índice de Madurez Digital...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B14]" data-testid="diagnostico-page">
      {/* Header */}
      <header className="bg-[#0D1117] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B93A4] via-[#3B82F6] to-[#D946EF] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#F0F4FF]">Leapifyes</span>
          </Link>
          <span className="text-sm text-[#8892A4]">
            Paso {currentStep + 1} de {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-[#0D1117] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B93A4]/10 border border-[#1B93A4]/20 text-[#1B93A4] text-xs font-semibold mb-4">
            ÍNDICE DE MADUREZ DIGITAL · LEAPIFYES
          </div>
          <h1 className="text-3xl font-bold text-[#F0F4FF] mb-2">Analiza tu nivel digital</h1>
          <p className="text-[#8892A4]">
            5 preguntas para descubrir en qué punto está tu negocio y qué necesita para dar el siguiente salto.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-white/10 bg-[#161B22]">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-[#F0F4FF] mb-8">
                  {currentQuestion.question}
                </h2>
                
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQuestion.id] === option.value
                          ? 'border-[#1B93A4] bg-[#1B93A4]/10'
                          : 'border-white/10 hover:border-white/20 bg-[#0D1117]'
                      }`}
                      data-testid={`option-${option.value}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[currentQuestion.id] === option.value
                            ? 'border-[#1B93A4] bg-[#1B93A4]'
                            : 'border-white/20'
                        }`}>
                          {answers[currentQuestion.id] === option.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </div>
                        <span className={`font-medium ${
                          answers[currentQuestion.id] === option.value
                            ? 'text-[#F0F4FF]'
                            : 'text-[#C9D1D9]'
                        }`}>
                          {option.label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="border-white/10 text-[#8892A4] hover:bg-white/5 hover:text-[#F0F4FF]"
            data-testid="diagnostico-prev"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="btn-gradient"
            data-testid="diagnostico-next"
          >
            {currentStep === totalSteps - 1 ? 'Ver Resultados' : 'Siguiente'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
