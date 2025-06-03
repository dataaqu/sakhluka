import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './CustomCursor';

// Import all images that need to be preloaded
import cov3 from '../assets/cov3.jpg';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  // List of all images to preload
  const imagesToLoad = [cov3, img1, img2, img3, img4, img5];

  useEffect(() => {
    // Show skip button after 5 seconds for slow connections
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 5000);

    const loadImages = async () => {
      let loaded = 0;
      
      const imagePromises = imagesToLoad.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            loaded++;
            setLoadedImages(loaded);
            setProgress((loaded / imagesToLoad.length) * 100);
            resolve();
          };
          img.onerror = () => {
            loaded++;
            setLoadedImages(loaded);
            setProgress((loaded / imagesToLoad.length) * 100);
            resolve();
          };
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      
      // Add a small delay for better UX
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onLoadComplete, 800);
      }, 500);
    };

    loadImages();

    return () => {
      clearTimeout(skipTimer);
    };
  }, [onLoadComplete]);

  const handleSkip = () => {
    setIsComplete(true);
    setTimeout(onLoadComplete, 300);
  };

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

  const particleVariants = {
    animate: {
      y: [0, -100],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center cursor-none"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <CustomCursor />
          
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '100%',
                }}
                variants={particleVariants}
                animate="animate"
                transition={{
                  delay: Math.random() * 2,
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Additional moving elements */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{
                  width: `${50 + Math.random() * 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: ['-100px', '100vw'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            {/* Logo/Brand */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="mb-12"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold text-white mb-4"
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
                  Loading images...
                </motion.span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">
                    {loadedImages}/{imagesToLoad.length}
                  </span>
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

            {/* Loading Animation with image preview */}
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

            {/* Image thumbnails preview */}
            <motion.div 
              className="grid grid-cols-3 gap-2 w-48 mx-auto mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: progress > 50 ? 1 : 0, scale: progress > 50 ? 1 : 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {imagesToLoad.slice(0, 6).map((src, index) => (
                <motion.div
                  key={index}
                  className="aspect-square bg-gradient-to-b from-zinc-950/0 to-zinc-950 rounded-lg overflow-hidden"
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index < loadedImages ? 1 : 0.3,
                    scale: index < loadedImages ? 1 : 0.9
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <img 
                    src={src} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: index < loadedImages ? 'none' : 'grayscale(100%)' }}
                  />
                </motion.div>
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
                    
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip button for slow connections */}
            <AnimatePresence>
              {showSkipButton && !isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <motion.button
                    onClick={handleSkip}
                    className="px-6 py-2 border border-white/30 text-white/80 hover:text-white hover:border-white/60 rounded-full text-sm transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Skip Loading
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8">
            <motion.div
              className="w-16 h-16 border-l-2 border-t-2 border-white/20"
              animate={{
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="absolute bottom-8 right-8">
            <motion.div
              className="w-16 h-16 border-r-2 border-b-2 border-white/20"
              animate={{
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
