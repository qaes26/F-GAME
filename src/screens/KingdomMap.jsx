import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Trophy, MousePointerClick } from 'lucide-react';

const KingdomMap = () => {
    const { governorates, selectGovernorate, userName, score } = useGame();
    const [hoveredGov, setHoveredGov] = useState(null);

    // Refined Coordinates based on standard Jordan Map projection
    const pinLocations = {
        irbid: { top: '12%', left: '22%' },   // Far North West
        ajloun: { top: '18%', left: '20%' },  // South of Irbid
        jerash: { top: '19%', left: '28%' },  // East of Ajloun
        mafraq: { top: '18%', left: '55%' },  // North East (Large)
        balqa: { top: '26%', left: '18%' },   // West, below Ajloun
        amman: { top: '28%', left: '32%' },   // Center
        zarqa: { top: '25%', left: '42%' },   // North East of Amman
        madaba: { top: '35%', left: '22%' },  // South West of Amman
        karak: { top: '48%', left: '22%' },   // Central West
        tafila: { top: '60%', left: '20%' },  // South of Karak
        maan: { top: '70%', left: '50%' },    // South East (Large)
        aqaba: { top: '90%', left: '10%' },   // South Tip
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] overflow-hidden flex flex-col items-center pt-20 relative">
            {/* Header */}
            <div className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md p-4 z-50 border-b border-white/10 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white uppercase border-2 border-white/20">
                        {userName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">القائد</span>
                        <span className="font-bold text-sm text-white">{userName}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                    <Trophy size={18} className="text-yellow-400" />
                    <span className="font-mono font-bold text-yellow-50">{score}</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 z-10 px-4"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                    خريطة الأردن
                </h1>
                <p className="text-gray-400 text-sm md:text-base">اضغط على المحافظة لتبدأ المغامرة</p>
            </motion.div>

            {/* Map Container */}
            <div className="relative w-full max-w-lg aspect-[3/4] mx-auto p-4 flex-1 flex items-center justify-center">
                {/* The Map Image */}
                <div className="relative w-full h-full">
                    <img
                        src="/jordan-map.png"
                        alt="Jordan Map"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] opacity-90"
                    />

                    {/* Pins Layer */}
                    {governorates.map((gov) => {
                        const pos = pinLocations[gov.id] || { top: '50%', left: '50%' };

                        return (
                            <motion.button
                                key={gov.id}
                                onClick={() => selectGovernorate(gov.id)}
                                onMouseEnter={() => setHoveredGov(gov)}
                                onMouseLeave={() => setHoveredGov(null)}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.2, zIndex: 50 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center group z-20 cursor-pointer"
                                style={{ top: pos.top, left: pos.left }}
                            >
                                {/* Pulse Effect */}
                                <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"></div>

                                {/* Pin Icon */}
                                <div className="relative bg-slate-900 border-2 border-cyan-400 text-cyan-400 rounded-full p-1.5 shadow-lg shadow-black/50 transition-colors group-hover:bg-cyan-500 group-hover:text-white group-hover:border-white">
                                    <MapPin size={16} fill="currentColor" />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Info Card Overlay (Visible when hovering pin or default hint) */}
                <AnimatePresence>
                    {hoveredGov && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-4 left-4 right-4 bg-slate-800/90 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl z-50"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{hoveredGov.name}</h3>
                                    <p className="text-cyan-400 text-sm font-bold">{hoveredGov.desc}</p>
                                </div>
                                <div className="bg-cyan-950/50 px-3 py-1 rounded-lg border border-cyan-500/20">
                                    <span className="text-cyan-300 font-mono font-bold">50</span>
                                    <span className="text-xs text-gray-400 mr-1">مرحلة</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-gray-400 text-xs">
                                <MousePointerClick size={14} />
                                <span>اضغط للدخول إلى المنطقة</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default KingdomMap;
