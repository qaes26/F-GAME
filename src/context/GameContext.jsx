import React, { createContext, useState, useContext, useEffect } from 'react';
import { governorates } from '../data/governorates';
import { playSuccessSound, playErrorSound } from '../utils/sound';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    // Persistence Loading
    const loadState = (key, defaultVal) => {
        const saved = localStorage.getItem(key);
        if (!saved) return defaultVal;
        try { return JSON.parse(saved); } catch { return defaultVal; }
    };

    // State Structure:
    // unlocks: { 'amman': 5, 'irbid': 0, ... } -> maxUnlocked index per gov
    // stars: { 'amman-1': 3, 'amman-2': 2 ... }

    const [selectedGovId, setSelectedGovId] = useState(null);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    const [score, setScore] = useState(() => loadState('bq_score', 0));
    const [unlocks, setUnlocks] = useState(() => loadState('bq_unlocks', { amman: 0 })); // Default Amman unlocked
    const [stars, setStars] = useState(() => loadState('bq_stars', {}));

    const [gameState, setGameState] = useState('home'); // home, kingdom, world, playing, gameover, win
    const [userName, setUserName] = useState(() => localStorage.getItem('bq_name') || '');
    const [lives, setLives] = useState(3);

    useEffect(() => {
        localStorage.setItem('bq_score', JSON.stringify(score));
        localStorage.setItem('bq_unlocks', JSON.stringify(unlocks));
        localStorage.setItem('bq_stars', JSON.stringify(stars));
        if (userName) localStorage.setItem('bq_name', userName);
    }, [score, unlocks, stars, userName]);

    const startGame = (name) => {
        setUserName(name);
        setGameState('kingdom');
    };

    const selectGovernorate = (govId) => {
        // Check if unlocked? For now allow all or sequential
        // If we wanted sequential: if (govIndex > 0 && !isPreviousCompleted) return;
        setSelectedGovId(govId);
        setGameState('world');
    };

    const selectLevel = (index) => {
        const currentMax = unlocks[selectedGovId] || 0;
        if (index > currentMax) return;

        setCurrentLevelIndex(index);
        setLives(3);
        setGameState('playing');
    };

    const handleWin = (levelPoints) => {
        const levelStars = Math.max(1, lives);
        const currentGov = governorates.find(g => g.id === selectedGovId);
        const currentLevelId = currentGov.levels[currentLevelIndex].id;

        // Save Stars
        const newStars = { ...stars, [currentLevelId]: Math.max(stars[currentLevelId] || 0, levelStars) };
        setStars(newStars);
        setScore(prev => prev + levelPoints);

        // Unlock next level in this governorate
        const currentMax = unlocks[selectedGovId] || 0;
        const nextIndex = currentLevelIndex + 1;

        if (nextIndex > currentMax && nextIndex < currentGov.levels.length) {
            setUnlocks(prev => ({ ...prev, [selectedGovId]: nextIndex }));
        }

        playSuccessSound();

        // Check if finished governorate
        if (currentLevelIndex === currentGov.levels.length - 1) {
            setGameState('win'); // Win the "World"
        } else {
            setGameState('world');
        }
    };

    const handleLoss = () => {
        playErrorSound();
        if (lives > 1) {
            setLives(prev => prev - 1);
        } else {
            setLives(0);
            setGameState('gameover');
        }
    };

    const resetGame = () => {
        setScore(0);
        setUnlocks({ amman: 0 });
        setStars({});
        setLives(3);
        setGameState('home');
        setSelectedGovId(null);
        localStorage.clear();
    };

    const retryLevel = () => {
        setLives(3);
        setGameState('playing');
    };

    const returnToMap = () => {
        setGameState('world');
    };

    const returnToKingdom = () => {
        setGameState('kingdom');
        setSelectedGovId(null);
    };

    // Get current data
    const currentGov = selectedGovId ? governorates.find(g => g.id === selectedGovId) : null;
    const currentLevel = currentGov ? currentGov.levels[currentLevelIndex] : null;

    return (
        <GameContext.Provider value={{
            governorates,
            selectedGovId,
            currentGov,
            currentLevelIndex,
            currentLevel,
            score,
            unlocks,
            stars,
            gameState,
            setGameState,
            userName,
            startGame,
            selectGovernorate,
            selectLevel,
            handleWin,
            handleLoss,
            resetGame,
            retryLevel,
            returnToMap,
            returnToKingdom,
            lives
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
