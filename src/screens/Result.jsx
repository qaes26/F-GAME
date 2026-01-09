import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { RotateCcw, Trophy, Map, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Result = () => {
    const { score, resetGame, userName, setGameState } = useGame();

    useEffect(() => {
        confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10 max-w-lg w-full relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>

                <div className="flex justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
                    <Trophy size={80} className="text-yellow-400 drop-shadow-2xl relative z-10" />
                </div>

                <h2 className="text-4xl font-black text-white mb-2 font-mono">VICTORY!</h2>
                <p className="text-gray-300 text-lg mb-8">أحسنت يا {userName}! لقد أنهيت اللعبة بالكامل.</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">النقاط</p>
                        <p className="text-3xl font-bold text-cyan-400">{score}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">التقييم</p>
                        <div className="flex justify-center gap-1 mt-1">
                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setGameState('world')}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Map size={20} />
                        <span>العودة للمحافظة</span>
                    </button>

                    <button
                        onClick={() => setGameState('kingdom')}
                        className="w-full border border-white/20 text-gray-300 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Map size={20} />
                        <span>خريطة المملكة</span>
                    </button>

                    <button
                        onClick={resetGame}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                    >
                        <RotateCcw size={20} />
                        <span>لعب جديد</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Result;
