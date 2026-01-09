import React from 'react';
import { useGame } from '../context/GameContext';
import { Heart, Trophy, PauseCircle } from 'lucide-react';

const HUD = () => {
    const { score, lives, currentLevelIndex } = useGame();

    return (
        <div className="w-full flex justify-between items-center p-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 rounded-b-2xl shadow-lg relative z-20">
            <div className="flex items-center gap-1">
                {[1, 2, 3].map((life) => (
                    <Heart
                        key={life}
                        size={24}
                        className={`${life <= lives ? 'text-red-500 fill-red-500' : 'text-slate-700'} transition-colors duration-300`}
                    />
                ))}
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full border border-white/20 shadow-lg">
                    <span className="text-white font-bold text-sm">مستوى {currentLevelIndex + 1}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                    <Trophy size={16} className="text-yellow-400" />
                    <span className="font-mono font-bold text-white">{score}</span>
                </div>
                {/* Placeholder for Pause in future */}
                <button className="text-gray-400 hover:text-white transition-colors">
                    <PauseCircle size={28} />
                </button>
            </div>
        </div>
    );
};

export default HUD;
