import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import darkLogo from '../assets/dark.png';

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress to 100%
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 2; // Increment by 2% each time
      });
    }, 50); // Update every 50ms

    return () => {
      clearInterval(progressTimer);
    };
  }, [onLoadComplete]);

 

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { 
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0.8,
      opacity: 0,
      y: 20
    },
    animate: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          
          <div className="relative z-10 text-center">
            {/* Logo/Brand */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="mb-12"
            >
              {/* Logo */}
              <motion.div 
                className="mb-2 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <img 
                  src={darkLogo} 
                  alt="Sakhluka Logo" 
                  className="h-40 w-40 md:h-48 md:w-48 object-contain"
                />
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-4"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 0px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Sakhluka
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-zinc-300 font-light tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                In Racha
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-80 md:w-96 mx-auto mb-8">
              <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white via-zinc-300 to-white rounded-full"
                  variants={progressBarVariants}
                  initial="initial"
                  animate="animate"
                />
                
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Progress text */}
              <div className="flex justify-between items-center mt-4 text-zinc-400">
                <motion.span 
                  className="text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading experience...
                </motion.span>
                <div className="flex items-center space-x-3">
                  <motion.span 
                    className="text-lg font-bold text-white"
                    key={Math.floor(progress)}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Math.floor(progress)}%
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Loading Animation */}
            <motion.div 
              className="flex justify-center space-x-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Completion message */}
            <AnimatePresence>
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <motion.p 
                    className="text-zinc-300 text-lg"
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Welcome to Racha!
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

         
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
