import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  style,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
      {/* Placeholder/Loading state */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center"
        animate={{
          opacity: isLoaded ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {!hasError && (
          <motion.div
            className="w-8 h-8 border-2 border-zinc-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        {hasError && (
          <div className="text-zinc-500 text-sm">Failed to load</div>
        )}
      </motion.div>

      {/* Actual image */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.1
          }}
          transition={{
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
