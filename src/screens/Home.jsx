import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const { startGame } = useGame();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            startGame(name);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4 text-glow font-sans">
                    Brain Quest
                </h1>
                <p className="text-xl text-gray-300">لعبة الألغاز المتدرجة</p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
            >
                <div className="mb-6 text-right">
                    <label className="block text-gray-300 text-sm font-bold mb-2 mr-1" dir="rtl">
                        أدخل اسمك للبدء:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none transition-colors text-right"
                        placeholder="اسم اللاعب"
                        required
                        dir="rtl"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                    <span>ابدأ اللعب</span>
                    <Play size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="fixed bottom-4 text-gray-500 text-sm"
            >
                إعداد الطالب: قيس طلال الجازي
            </motion.div>
        </div>
    );
};

export default Home;
