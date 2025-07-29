import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Achievement System
const achievements = [
  {
    id: 'first_visit',
    name: 'Welcome Explorer!',
    description: 'Visited the portfolio for the first time',
    icon: '🎉',
    points: 10,
    unlocked: true
  },
  {
    id: 'konami_code',
    name: 'Secret Agent',
    description: 'Discovered the Konami code',
    icon: '🕵️',
    points: 50,
    unlocked: false
  },
  {
    id: 'all_pages',
    name: 'Portfolio Explorer',
    description: 'Visited all pages',
    icon: '🗺️',
    points: 25,
    unlocked: false
  },
  {
    id: 'easter_egg_hunter',
    name: 'Easter Egg Hunter',
    description: 'Found 3 hidden easter eggs',
    icon: '🥚',
    points: 75,
    unlocked: false
  },
  {
    id: 'speed_reader',
    name: 'Speed Reader',
    description: 'Spent less than 30 seconds on each page',
    icon: '⚡',
    points: 30,
    unlocked: false
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Visited between 12 AM - 6 AM',
    icon: '🦉',
    points: 20,
    unlocked: false
  }
];

// Konami Code Handler
const useKonamiCode = (callback) => {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setSequence(prev => {
        const newSequence = [...prev, e.code].slice(-konamiCode.length);
        
        if (newSequence.length === konamiCode.length && 
            newSequence.every((key, index) => key === konamiCode[index])) {
          callback();
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Snake Game Component
const SnakeGame = ({ onClose, onScore }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 0, y: 0 },
    score: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    const drawGame = () => {
      // Clear canvas
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      ctx.fillStyle = '#4ade80';
      gameStateRef.current.snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      });

      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(
        gameStateRef.current.food.x * gridSize,
        gameStateRef.current.food.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    };

    const updateGame = () => {
      const head = { ...gameStateRef.current.snake[0] };
      head.x += gameStateRef.current.direction.x;
      head.y += gameStateRef.current.direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        return;
      }

      // Check self collision
      if (gameStateRef.current.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      gameStateRef.current.snake.unshift(head);

      // Check food collision
      if (head.x === gameStateRef.current.food.x && head.y === gameStateRef.current.food.y) {
        gameStateRef.current.score += 10;
        setScore(gameStateRef.current.score);
        onScore(gameStateRef.current.score);
        
        // Generate new food
        gameStateRef.current.food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
      } else {
        gameStateRef.current.snake.pop();
      }
    };

    const gameLoop = () => {
      if (!gameOver) {
        updateGame();
        drawGame();
      }
    };

    const handleKeyPress = (e) => {
      const { direction } = gameStateRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (direction.x === 0) gameStateRef.current.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x === 0) gameStateRef.current.direction = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    const interval = setInterval(gameLoop, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [gameOver, onScore]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Snake Game</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-lg font-semibold">Score: {score}</div>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-gray-300 rounded-lg mx-auto block"
        />

        {gameOver && (
          <div className="text-center mt-4">
            <div className="text-red-600 font-bold mb-2">Game Over!</div>
            <div className="text-sm text-gray-600">Final Score: {score}</div>
          </div>
        )}

        <div className="text-center mt-4 text-sm text-gray-600">
          Use arrow keys to control the snake
        </div>
      </div>
    </motion.div>
  );
};

// Memory Game Component
const MemoryGame = ({ onClose, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const symbols = ['🚀', '💻', '🎨', '⚡', '🌟', '🔥', '💡', '🎯'];

  useEffect(() => {
    const shuffledCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => onComplete(moves + 1), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Memory Game</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-lg font-semibold">Moves: {moves}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg text-2xl font-bold transition-all ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {flipped.includes(card.id) || matched.includes(card.id) ? card.symbol : '?'}
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Match all pairs to win!
        </div>
      </div>
    </motion.div>
  );
};

// Achievement Notification
const AchievementNotification = ({ achievement, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 300 }}
    className="fixed top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm"
  >
    <div className="flex items-center space-x-3">
      <div className="text-3xl">{achievement.icon}</div>
      <div className="flex-1">
        <div className="font-bold">Achievement Unlocked!</div>
        <div className="text-sm">{achievement.name}</div>
        <div className="text-xs opacity-90">{achievement.description}</div>
        <div className="text-xs font-bold">+{achievement.points} points</div>
      </div>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white"
      >
        ✕
      </button>
    </div>
  </motion.div>
);

// Main Gamification System
const GameificationSystem = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState(['first_visit']);
  const [showNotification, setShowNotification] = useState(null);
  const [showSnake, setShowSnake] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [totalPoints, setTotalPoints] = useState(10);
  const [easterEggsFound, setEasterEggsFound] = useState(0);

  const unlockAchievement = (achievementId) => {
    if (!unlockedAchievements.includes(achievementId)) {
      const achievement = achievements.find(a => a.id === achievementId);
      setUnlockedAchievements([...unlockedAchievements, achievementId]);
      setTotalPoints(totalPoints + achievement.points);
      setShowNotification(achievement);
      setTimeout(() => setShowNotification(null), 5000);
    }
  };

  // Konami Code Handler
  useKonamiCode(() => {
    unlockAchievement('konami_code');
    setShowSnake(true);
  });

  // Easter Egg Detection
  useEffect(() => {
    const handleTripleClick = () => {
      setEasterEggsFound(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          unlockAchievement('easter_egg_hunter');
        }
        return newCount;
      });
    };

    // Check for night owl achievement
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      unlockAchievement('night_owl');
    }

    // Add triple-click listener to logo or specific elements
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('dblclick', handleTripleClick);
      return () => logo.removeEventListener('dblclick', handleTripleClick);
    }
  }, []);

  return (
    <>
      {/* Achievements Button */}
      <motion.button
        onClick={() => setShowAchievements(!showAchievements)}
        className="fixed bottom-6 right-20 w-14 h-14 bg-yellow-500 text-white rounded-full shadow-lg flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🏆
      </motion.button>

      {/* Achievements Panel */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-96 max-h-96 overflow-y-auto z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Achievements
              </h3>
              <div className="text-yellow-500 font-bold">
                {totalPoints} points
              </div>
            </div>

            <div className="space-y-3">
              {achievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                return (
                  <motion.div
                    key={achievement.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isUnlocked
                        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 opacity-60'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </div>
                        <div className="text-xs font-bold text-yellow-600">
                          {achievement.points} points
                        </div>
                      </div>
                      {isUnlocked && (
                        <div className="text-green-500 text-xl">✓</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{unlockedAchievements.length}/{achievements.length}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-full bg-yellow-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Games */}
      <AnimatePresence>
        {showSnake && (
          <SnakeGame
            onClose={() => setShowSnake(false)}
            onScore={(score) => {
              if (score >= 100) unlockAchievement('speed_reader');
            }}
          />
        )}
        
        {showMemory && (
          <MemoryGame
            onClose={() => setShowMemory(false)}
            onComplete={(moves) => {
              if (moves <= 20) unlockAchievement('speed_reader');
            }}
          />
        )}
      </AnimatePresence>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && (
          <AchievementNotification
            achievement={showNotification}
            onClose={() => setShowNotification(null)}
          />
        )}
      </AnimatePresence>

      {/* Hidden Game Triggers */}
      <div className="fixed bottom-2 left-2 text-xs text-gray-400 opacity-50">
        🎮 Try: ↑↑↓↓←→←→BA
      </div>
    </>
  );
};

export default GameificationSystem;
