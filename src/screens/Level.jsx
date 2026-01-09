import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import HUD from '../components/HUD';
import { playSuccessSound, playErrorSound } from '../utils/sound';

const Level = () => {
    const { currentLevel, handleWin, handleLoss } = useGame();
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'success' or 'error'

    useEffect(() => {
        setAnswer('');
        setError(false);
        setFeedback(null);
    }, [currentLevel]);

    const handleSubmit = (e) => {
        e?.preventDefault();

        // Normalize logic
        const normalize = (str) => str.toString().trim().toLowerCase();
        const isCorrect = normalize(answer) === normalize(currentLevel.answer);

        if (isCorrect) {
            setFeedback('success');
            playSuccessSound();
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => {
                handleWin(currentLevel.points);
            }, 1500);
        } else {
            setError(true);
            setFeedback('error');
            playErrorSound();
            handleLoss(); // Deduct life
            setTimeout(() => setError(false), 500);
        }
    };

    const handleOptionClick = (option) => {
        if (feedback === 'success') return;
        setAnswer(option);

        const normalize = (str) => str.toString().trim().toLowerCase();
        const isCorrect = normalize(option) === normalize(currentLevel.answer);

        if (isCorrect) {
            setFeedback('success');
            playSuccessSound();
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => {
                handleWin(currentLevel.points);
            }, 1500);
        } else {
            setError(true);
            setFeedback('error');
            playErrorSound();
            handleLoss();
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-full relative">
            <div className="absolute top-0 w-full z-20">
                <HUD />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-20 max-w-2xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentLevel.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`w-full bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 ${feedback === 'success' ? 'border-green-500 shadow-green-500/20' :
                                feedback === 'error' ? 'border-red-500 shadow-red-500/20' : 'border-white/10 shadow-cyan-500/10'
                            }`}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 leading-relaxed font-mono" dir="rtl">
                            {currentLevel.question}
                        </h2>

                        {currentLevel.type === 'choice' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentLevel.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(option)}
                                        disabled={feedback === 'success'}
                                        className={`py-4 px-6 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${answer === option && feedback === 'success'
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300'
                                                : answer === option && feedback === 'error'
                                                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white ring-2 ring-red-300'
                                                    : 'bg-slate-700/50 hover:bg-slate-700 text-gray-200 hover:text-white border border-white/5'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    disabled={feedback === 'success'}
                                    className="w-full px-6 py-4 rounded-xl bg-slate-900/50 text-white text-center text-xl border-2 border-slate-700 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-600"
                                    placeholder="اكتب إجابتك هنا..."
                                    dir="rtl"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={!answer || feedback === 'success'}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${feedback === 'success'
                                            ? 'bg-green-500'
                                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {feedback === 'success' ? <Check /> : <ArrowRight className="rtl:rotate-180" />}
                                    <span>{feedback === 'success' ? 'صحيح!' : 'تحقق'}</span>
                                </button>
                            </form>
                        )}

                        {feedback === 'error' && (
                            <motion.div animate={{ x: [-5, 5, -5, 5, 0] }} className="mt-4 text-center text-red-400 font-bold flex justify-center items-center gap-2">
                                <X size={20} />
                                <span>إجابة خاطئة (-1 ❤️)</span>
                            </motion.div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Level;
