import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Home from './screens/Home';
import KingdomMap from './screens/KingdomMap';
import WorldMap from './screens/WorldMap';
import Level from './screens/Level';
import Result from './screens/Result';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = () => {
    const { gameState, retryLevel, resetGame, returnToMap } = useGame();

    const GameOver = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 text-center"
        >
            <h1 className="text-6xl font-black text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">GAME OVER</h1>
            <p className="text-gray-400 text-xl mb-8">نفذت محاولاتك!</p>
            <div className="flex gap-4">
                <button onClick={retryLevel} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                    إعادة المحاولة
                </button>
                <button onClick={returnToMap} className="px-8 py-3 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                    الخروج للخريطة
                </button>
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence mode="wait">
            {gameState === 'home' && <Home key="home" />}
            {gameState === 'kingdom' && <KingdomMap key="kingdom" />}
            {gameState === 'world' && <WorldMap key="world" />}
            {gameState === 'playing' && <Level key="level" />}
            {gameState === 'win' && <Result key="win" />}
            {gameState === 'gameover' && <GameOver key="gameover" />}
        </AnimatePresence>
    );
};

function App() {
    return (
        <GameProvider>
            <div className="min-h-screen bg-[#0a0a0c] overflow-hidden relative font-sans text-white selection:bg-cyan-500/30">
                {/* Animated Background Mesh */}
                <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0c] to-black"></div>
                    <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
                    <div className="absolute w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] bottom-[-50px] right-[-50px] animate-pulse delay-75"></div>
                </div>

                <div className="relative z-10 w-full h-full">
                    <GameContainer />
                </div>
            </div>
        </GameProvider>
    );
}

export default App;
