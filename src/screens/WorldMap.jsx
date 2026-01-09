import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Lock, Star, Trophy, ArrowRight } from 'lucide-react';

const WorldMap = () => {
    const { currentGov, unlocks, selectLevel, stars, score, returnToKingdom } = useGame();

    if (!currentGov) return null;

    const currentMaxUnlocked = unlocks[currentGov.id] || 0;

    return (
        <div className="min-h-screen p-4 pt-20 flex flex-col items-center max-w-md mx-auto relative pb-20">
            {/* Header HUD - Minimal */}
            <div className="fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur-md p-4 z-50 border-b border-white/10 flex justify-between items-center shadow-lg">
                <button onClick={returnToKingdom} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <ArrowRight className="text-white rtl:rotate-180" />
                </button>
                <h2 className="text-xl font-bold text-white">{currentGov.name}</h2>
                <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="font-mono text-sm font-bold text-yellow-50">{score}</span>
                </div>
            </div>

            <div className="w-full text-center mb-8 mt-4">
                <p className="text-gray-400 text-sm">أكمل المراحل لتفتح المزيد</p>
            </div>

            <div className="flex flex-col gap-6 w-full relative">
                <div className="absolute top-4 bottom-4 left-1/2 w-1 bg-gradient-to-b from-slate-700/50 to-slate-700/20 -translate-x-1/2 rounded-full z-0"></div>

                {currentGov.levels.map((level, index) => {
                    const isUnlocked = index <= currentMaxUnlocked;
                    const levelStars = stars[level.id] || 0;

                    return (
                        <motion.div
                            key={level.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: (index % 10) * 0.05 }} // Limit stagger delay
                            className={`relative z-10 w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                        >
                            <button
                                onClick={() => selectLevel(index)}
                                disabled={!isUnlocked}
                                className={`
                    w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-2xl border-4 transition-all duration-300 transform active:scale-95
                    ${isUnlocked
                                        ? 'bg-slate-800 border-cyan-500 hover:shadow-cyan-500/50 cursor-pointer'
                                        : 'bg-slate-900 border-slate-700 cursor-not-allowed opacity-50 grayscale'}
                    ${index === currentMaxUnlocked ? 'ring-4 ring-cyan-400/30 animate-pulse' : ''}
                `}
                            >
                                {!isUnlocked ? (
                                    <Lock size={20} className="text-slate-500" />
                                ) : (
                                    <>
                                        <span className="text-2xl font-bold text-white font-mono">{index + 1}</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3].map(star => (
                                                <Star
                                                    key={star}
                                                    size={10}
                                                    className={`${star <= levelStars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorldMap;
