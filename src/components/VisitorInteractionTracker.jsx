import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cursor Trail Component
const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };

      trailRef.current = [...trailRef.current, newTrail].slice(-20);
      setTrails([...trailRef.current]);
    };

    // Clean up old trails
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      trailRef.current = trailRef.current.filter(trail => now - trail.timestamp < 1000);
      setTrails([...trailRef.current]);
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 1000);
        const scale = Math.max(0.1, 1 - age / 1000);
        
        return (
          <motion.div
            key={trail.id}
            className="absolute w-3 h-3 bg-blue-500 rounded-full"
            style={{
              left: trail.x - 6,
              top: trail.y - 6,
              opacity: opacity * 0.6,
              transform: `scale(${scale})`
            }}
            animate={{
              opacity: 0,
              scale: 0
            }}
            transition={{ duration: 1 }}
          />
        );
      })}
    </div>
  );
};

// Visitor Counter Component
const VisitorCounter = () => {
  const [visitorData, setVisitorData] = useState({
    current: 1,
    today: 47,
    total: 2847,
    peak: 23,
    avgTime: '3:24'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time visitor updates
    const interval = setInterval(() => {
      setVisitorData(prev => ({
        ...prev,
        current: Math.max(1, prev.current + Math.floor(Math.random() * 3) - 1),
        today: prev.today + Math.floor(Math.random() * 2),
        total: prev.total + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 left-6 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        👥
      </motion.button>

      {/* Visitor Stats Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed bottom-20 left-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-80 z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Live Visitor Stats
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-500 text-sm">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{visitorData.current}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Online Now</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{visitorData.today}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Today</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{visitorData.total.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
              
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{visitorData.avgTime}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Time</div>
              </div>
            </div>

            {/* Recent Visitors */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Recent Visitors
              </h4>
              <div className="space-y-2">
                {[
                  { country: 'United States', flag: '🇺🇸', time: '2 min ago' },
                  { country: 'India', flag: '🇮🇳', time: '5 min ago' },
                  { country: 'Germany', flag: '🇩🇪', time: '8 min ago' },
                  { country: 'Canada', flag: '🇨🇦', time: '12 min ago' }
                ].map((visitor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{visitor.flag}</span>
                      <span className="text-gray-700 dark:text-gray-300">{visitor.country}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{visitor.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Click Heatmap Component
const ClickHeatmap = () => {
  const [clicks, setClicks] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };

      setClicks(prev => [...prev, newClick].slice(-50)); // Keep last 50 clicks
    };

    if (showHeatmap) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [showHeatmap]);

  return (
    <>
      {/* Heatmap Toggle */}
      <motion.button
        onClick={() => setShowHeatmap(!showHeatmap)}
        className={`fixed top-20 right-6 px-4 py-2 rounded-lg shadow-lg z-40 ${
          showHeatmap 
            ? 'bg-red-500 text-white' 
            : 'bg-white text-gray-700 border border-gray-300'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showHeatmap ? '🔥 Hide Heatmap' : '📊 Show Heatmap'}
      </motion.button>

      {/* Heatmap Visualization */}
      {showHeatmap && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {clicks.map((click) => {
            const age = Date.now() - click.timestamp;
            const maxAge = 30000; // 30 seconds
            const opacity = Math.max(0, 1 - age / maxAge);
            
            return (
              <motion.div
                key={click.id}
                className="absolute w-8 h-8 bg-red-500 rounded-full"
                style={{
                  left: click.x - 16,
                  top: click.y - 16,
                  opacity: opacity * 0.7
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              />
            );
          })}
          
          {/* Heatmap Legend */}
          <div className="absolute top-32 right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h4 className="font-semibold mb-2">Click Heatmap</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-70"></div>
                <span>Recent clicks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-300 rounded-full opacity-50"></div>
                <span>Older clicks</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Showing last {clicks.length} clicks
            </p>
          </div>
        </div>
      )}
    </>
  );
};

// Geographic Visitor Map Component
const GeographicMap = () => {
  const [showMap, setShowMap] = useState(false);
  const [visitorLocations] = useState([
    { country: 'United States', visitors: 1247, percentage: 35, flag: '🇺🇸', coords: [39.8283, -98.5795] },
    { country: 'India', visitors: 892, percentage: 25, flag: '🇮🇳', coords: [20.5937, 78.9629] },
    { country: 'Germany', visitors: 456, percentage: 13, flag: '🇩🇪', coords: [51.1657, 10.4515] },
    { country: 'Canada', visitors: 334, percentage: 9, flag: '🇨🇦', coords: [56.1304, -106.3468] },
    { country: 'United Kingdom', visitors: 278, percentage: 8, flag: '🇬🇧', coords: [55.3781, -3.4360] },
    { country: 'Australia', visitors: 189, percentage: 5, flag: '🇦🇺', coords: [-25.2744, 133.7751] },
    { country: 'Others', visitors: 156, percentage: 5, flag: '🌍', coords: [0, 0] }
  ]);

  return (
    <>
      {/* Map Toggle Button */}
      <motion.button
        onClick={() => setShowMap(!showMap)}
        className="fixed bottom-20 right-6 w-12 h-12 bg-purple-500 text-white rounded-full shadow-lg flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🌍
      </motion.button>

      {/* Geographic Map Panel */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            className="fixed bottom-32 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-96 max-h-96 overflow-y-auto z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Visitor Locations
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {visitorLocations.map((location, index) => (
                <motion.div
                  key={location.country}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {location.country}
                      </div>
                      <div className="text-sm text-gray-500">
                        {location.visitors.toLocaleString()} visitors
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      {location.percentage}%
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${location.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {visitorLocations.reduce((sum, loc) => sum + loc.visitors, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Total Visitors</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Page Activity Tracker
const PageActivityTracker = () => {
  const [pageViews, setPageViews] = useState({
    '/': { views: 1247, time: '2:34' },
    '/about': { views: 892, time: '3:12' },
    '/projects': { views: 1156, time: '4:23' },
    '/contact': { views: 445, time: '1:45' }
  });

  const [showActivity, setShowActivity] = useState(false);

  return (
    <>
      {/* Activity Toggle */}
      <motion.button
        onClick={() => setShowActivity(!showActivity)}
        className="fixed top-32 right-6 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-lg z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📈 Activity
      </motion.button>

      {/* Activity Panel */}
      <AnimatePresence>
        {showActivity && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-44 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-80 z-30"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Page Activity
            </h3>

            <div className="space-y-3">
              {Object.entries(pageViews).map(([page, data], index) => (
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {page === '/' ? 'Home' : page.slice(1).charAt(0).toUpperCase() + page.slice(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Avg time: {data.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">
                      {data.views.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">views</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Main Visitor Interaction Tracker Component
const VisitorInteractionTracker = () => {
  return (
    <>
      <CursorTrail />
      <VisitorCounter />
      <ClickHeatmap />
      <GeographicMap />
      <PageActivityTracker />
    </>
  );
};

export default VisitorInteractionTracker;
