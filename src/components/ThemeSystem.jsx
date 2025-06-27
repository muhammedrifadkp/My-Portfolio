import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme Context
const ThemeContext = createContext();

// Theme configurations
const themes = {
  morning: {
    name: 'Morning Sunrise',
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    time: [6, 12],
    icon: '🌅'
  },
  afternoon: {
    name: 'Afternoon Sky',
    primary: '#3498DB',
    secondary: '#E74C3C',
    accent: '#F39C12',
    background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    time: [12, 18],
    icon: '☀️'
  },
  evening: {
    name: 'Evening Sunset',
    primary: '#E67E22',
    secondary: '#8E44AD',
    accent: '#E74C3C',
    background: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    time: [18, 21],
    icon: '🌅'
  },
  night: {
    name: 'Night Mode',
    primary: '#9B59B6',
    secondary: '#34495E',
    accent: '#1ABC9C',
    background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
    text: '#ECF0F1',
    cardBg: 'rgba(52, 73, 94, 0.9)',
    time: [21, 6],
    icon: '🌙'
  },
  rainy: {
    name: 'Rainy Day',
    primary: '#34495E',
    secondary: '#95A5A6',
    accent: '#3498DB',
    background: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(189, 195, 199, 0.8)',
    weather: 'rain',
    icon: '🌧️'
  },
  sunny: {
    name: 'Sunny Day',
    primary: '#F1C40F',
    secondary: '#E67E22',
    accent: '#E74C3C',
    background: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    weather: 'clear',
    icon: '☀️'
  },
  cloudy: {
    name: 'Cloudy Sky',
    primary: '#7F8C8D',
    secondary: '#95A5A6',
    accent: '#3498DB',
    background: 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    weather: 'clouds',
    icon: '☁️'
  },
  spring: {
    name: 'Spring Bloom',
    primary: '#2ECC71',
    secondary: '#E74C3C',
    accent: '#F39C12',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    season: 'spring',
    icon: '🌸'
  },
  summer: {
    name: 'Summer Heat',
    primary: '#E74C3C',
    secondary: '#F39C12',
    accent: '#E67E22',
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    season: 'summer',
    icon: '🏖️'
  },
  autumn: {
    name: 'Autumn Leaves',
    primary: '#D35400',
    secondary: '#E67E22',
    accent: '#F39C12',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    season: 'autumn',
    icon: '🍂'
  },
  winter: {
    name: 'Winter Frost',
    primary: '#3498DB',
    secondary: '#9B59B6',
    accent: '#1ABC9C',
    background: 'linear-gradient(135deg, #e6ddd4 0%, #d5def5 100%)',
    text: '#2C3E50',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    season: 'winter',
    icon: '❄️'
  }
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('morning');
  const [autoMode, setAutoMode] = useState(true);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  // Get current time-based theme
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
  };

  // Get current season
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => console.log('Location access denied')
      );
    }
  }, []);

  // Fetch weather data (mock implementation)
  useEffect(() => {
    if (location && autoMode) {
      // Mock weather API call
      const mockWeather = () => {
        const conditions = ['clear', 'clouds', 'rain'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        setWeather({ main: randomCondition });
      };
      
      mockWeather();
      const interval = setInterval(mockWeather, 300000); // Update every 5 minutes
      return () => clearInterval(interval);
    }
  }, [location, autoMode]);

  // Auto theme selection
  useEffect(() => {
    if (autoMode) {
      let selectedTheme = getTimeBasedTheme();
      
      // Override with weather-based theme if available
      if (weather) {
        if (weather.main === 'rain') selectedTheme = 'rainy';
        else if (weather.main === 'clear') selectedTheme = 'sunny';
        else if (weather.main === 'clouds') selectedTheme = 'cloudy';
      }
      
      setCurrentTheme(selectedTheme);
    }
  }, [autoMode, weather]);

  // Update theme every minute when in auto mode
  useEffect(() => {
    if (autoMode) {
      const interval = setInterval(() => {
        const newTheme = getTimeBasedTheme();
        if (newTheme !== currentTheme) {
          setCurrentTheme(newTheme);
        }
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [autoMode, currentTheme]);

  const value = {
    currentTheme: themes[currentTheme],
    themeName: currentTheme,
    setTheme: setCurrentTheme,
    autoMode,
    setAutoMode,
    themes,
    weather,
    location
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          background: themes[currentTheme].background,
          color: themes[currentTheme].text,
          minHeight: '100vh',
          transition: 'all 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Theme Control Panel Component
export const ThemeControlPanel = () => {
  const { 
    currentTheme, 
    themeName, 
    setTheme, 
    autoMode, 
    setAutoMode, 
    themes, 
    weather, 
    location 
  } = useContext(ThemeContext);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Theme Control Button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl backdrop-blur-md border border-white/20"
          style={{ 
            backgroundColor: currentTheme.cardBg,
            color: currentTheme.text 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🎨
        </motion.button>
      </motion.div>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-20 right-6 w-80 rounded-2xl shadow-2xl z-40 backdrop-blur-md border border-white/20"
            style={{ backgroundColor: currentTheme.cardBg }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold" style={{ color: currentTheme.text }}>
                  Theme Control
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{currentTheme.icon}</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Current Theme Info */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: currentTheme.primary + '20' }}>
                <h4 className="font-semibold mb-2" style={{ color: currentTheme.primary }}>
                  Current: {currentTheme.name}
                </h4>
                {weather && (
                  <p className="text-sm opacity-75">
                    Weather: {weather.main} {location && '📍'}
                  </p>
                )}
              </div>

              {/* Auto Mode Toggle */}
              <div className="flex items-center justify-between mb-6">
                <span style={{ color: currentTheme.text }}>Auto Mode</span>
                <motion.button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`w-12 h-6 rounded-full p-1 ${autoMode ? 'bg-green-500' : 'bg-gray-400'}`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ x: autoMode ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(themes).map(([key, theme]) => (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setAutoMode(false);
                      setTheme(key);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      themeName === key ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ 
                      background: theme.background,
                      opacity: themeName === key ? 1 : 0.7
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-lg mb-1">{theme.icon}</div>
                    <div className="text-xs text-white font-medium">
                      {theme.name.split(' ')[0]}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Theme Info */}
              <div className="mt-4 text-xs opacity-75" style={{ color: currentTheme.text }}>
                {autoMode ? (
                  <p>🤖 Themes change automatically based on time and weather</p>
                ) : (
                  <p>🎨 Manual theme selection active</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
