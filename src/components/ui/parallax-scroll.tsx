import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false // Prevents layout thrashing
  });

  // Simplified transforms without spring for better performance
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Use CSS media query approach instead of JavaScript for better performance
  const displayImages = useMemo(() => images, [images]);
  const third = Math.ceil(displayImages.length / 3);

  const firstPart = displayImages.slice(0, third);
  const secondPart = displayImages.slice(third, 2 * third);
  const thirdPart = displayImages.slice(2 * third);

  // Carousel functionality for mobile
  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const isMobileScreen = window.innerWidth < 640; // sm breakpoint
      const scrollDistance = isMobileScreen ? window.innerWidth - 48 : 300; // Full width minus padding on mobile
      carouselRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
      // Update button states after scroll
      setTimeout(checkScrollability, 100);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const isMobileScreen = window.innerWidth < 640; // sm breakpoint
      const scrollDistance = isMobileScreen ? window.innerWidth - 48 : 300; // Full width minus padding on mobile
      carouselRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
      // Update button states after scroll
      setTimeout(checkScrollability, 100);
    }
  };

  useEffect(() => {
    checkScrollability();
    
    // Add scroll listener to update button states
    const handleResize = () => {
      checkScrollability();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`w-full min-h-screen overflow-hidden ${className}`}
      ref={containerRef}
      style={{
        contain: 'layout style paint',
        willChange: 'scroll-position'
      }}
    >
      {/* Desktop view - 3 columns for screens >= 1027px */}
      <div className="hidden xl:grid grid-cols-3 items-start max-w-7xl mx-auto gap-8 py-20 px-6">
        <div className="flex flex-col gap-8">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              className="will-change-transform group transform-gpu"
            >
              <img
                src={el}
                className="h-80 md:h-96 w-full object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:brightness-110"
                height="400"
                width="400"
                alt={`Gallery image ${idx + 1}`}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {secondPart.map((el, idx) => (
            <motion.div 
              style={{ y: translateSecond }} 
              key={"grid-2" + idx}
              className="will-change-transform group transform-gpu"
            >
              <img
                src={el}
                className="h-80 md:h-96 w-full object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:brightness-110"
                height="400"
                width="400"
                alt={`Gallery image ${idx + firstPart.length + 1}`}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {thirdPart.map((el, idx) => (
            <motion.div 
              style={{ y: translateThird }} 
              key={"grid-3" + idx}
              className="will-change-transform group transform-gpu"
            >
              <img
                src={el}
                className="h-80 md:h-96 w-full object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:brightness-110"
                height="400"
                width="400"
                alt={`Gallery image ${idx + firstPart.length + secondPart.length + 1}`}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet view - Horizontal Carousel for screens < 1027px */}
      <div className="xl:hidden py-20 px-6 overflow-visible">
        <div className="relative max-w-7xl mx-auto overflow-visible">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            data-carousel
            className="flex overflow-x-auto scroll-smooth gap-4 sm:gap-6 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain"
            onScroll={checkScrollability}
            style={{
              scrollSnapType: 'x mandatory',
              touchAction: 'pan-x pinch-zoom', // Allow horizontal scrolling and pinch zoom
              WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
            }}
          >
            {displayImages.map((el, idx) => (
              <div
                key={"mobile-carousel" + idx}
                className="flex-none w-[calc(100vw-3rem)] sm:w-80 will-change-transform group transform-gpu"
                style={{
                  scrollSnapAlign: 'start',
                }}
              >
                <img
                  src={el}
                  className="h-64 sm:h-80 w-full object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:brightness-110"
                  height="400"
                  width="400"
                  alt={`Gallery image ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 disabled:opacity-50 hover:bg-white transition-colors shadow-lg"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 disabled:opacity-50 hover:bg-white transition-colors shadow-lg"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
