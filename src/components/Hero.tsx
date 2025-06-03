import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-scroll";

import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
       
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};


const SECTION_HEIGHT = 1500;
const MOBILE_SECTION_HEIGHT = 800;

const Hero = () => {
  return (
    <div id="hero" className="relative w-full">
      {/* Desktop version */}
      <div 
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full hidden md:block"
      >
        <CenterImage />
        <ParallaxImages />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
      
      {/* Mobile version - simplified */}
      <div
        style={{ height: `calc(${MOBILE_SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full block md:hidden"
      >
        <CenterImageMobile />
        <ParallaxImagesMobile />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
      
      {/* Floating scroll button for mobile */}
      <FloatingScrollButton />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(src/assets/cov3.jpg)",
        backgroundPosition: "cover center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const CenterImageMobile = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 800], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 800], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, MOBILE_SECTION_HEIGHT + 300],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [MOBILE_SECTION_HEIGHT, MOBILE_SECTION_HEIGHT + 300],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(src/assets/cov3.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[100px] md:pt-[200px]">
      {/* First image - always visible */}
      <ParallaxImg
        src="src/assets/1.jpg"
        alt="Mountain cabin view"
        start={-200}
        end={200}
        className="w-full md:w-1/3 mb-8 md:mb-0"
      />
      
      {/* Second image - always visible */}
      <ParallaxImg
        src="src/assets/2.jpg"
        alt="Racha landscape"
        start={200}
        end={-250}
        className="mx-auto w-full md:w-2/3 mb-8 md:mb-0"
      />
      
      {/* Third and fourth images - hidden on mobile to reduce scroll */}
      <div className="hidden md:block">
        <ParallaxImg
          src="src/assets/3.jpg"
          alt="Nature surrounding"
          start={-200}
          end={200}
          className="ml-auto w-1/3"
        />
        <ParallaxImg
          src="src/assets/5.jpg"
          alt="Cabin exterior"
          start={0}
          end={-500}
          className="ml-24 w-5/12"
        />
      </div>
    </div>
  );
};

const ParallaxImagesMobile = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[100px]">
      {/* Only show 2 images on mobile to reduce scroll */}
      <ParallaxImg
        src="src/assets/1.jpg"
        alt="Mountain cabin view"
        start={-100}
        end={100}
        className="w-full mb-6"
      />
      
      <ParallaxImg
        src="src/assets/2.jpg"
        alt="Racha landscape"
        start={100}
        end={-100}
        className="w-full"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const FloatingScrollButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Link
        to="about"
        spy={true}
        smooth={true}
        offset={-100}
        duration={1800}
        delay={200}
        className="bg-zinc-800/90 backdrop-blur-sm text-white p-4 rounded-full shadow-lg hover:bg-zinc-700 transition-all duration-300 cursor-pointer flex items-center justify-center"
      >
        <FiChevronDown className="w-6 h-6 animate-bounce" />
      </Link>
    </div>
  );
};

const Schedule = () => {
  return (
    <section
      id="about-cabin"
      className="mx-auto max-w-5xl px-4 py-16 md:py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-8 md:mb-20 text-2xl md:text-4xl font-black uppercase text-zinc-50 text-center"
      >
        Welcome to Sakhluka in Racha
      </motion.h1>
      
      <div className="space-y-4 md:space-y-8">
        <motion.p
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
          className="text-base md:text-lg leading-relaxed text-zinc-200"
        >
          Nestled in the heart of Racha's majestic mountains, our cabin offers a peaceful retreat surrounded by pristine nature, fresh air, and breathtaking views. Whether you're seeking a quiet getaway or an adventure-filled stay, our cozy cabin is the perfect base.
        </motion.p>
        
        <motion.p
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
          className="text-base md:text-lg leading-relaxed text-zinc-200"
        >
          Wake up to the sound of rustling trees, enjoy coffee with a view, and unwind by the fireplace after a day of exploring Racha's hidden gems. Designed for comfort and simplicity, the cabin blends rustic charm with modern essentials to make your stay unforgettable.
        </motion.p>
        
        <motion.p
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.6 }}
          className="text-lg md:text-xl font-semibold text-zinc-50 text-center pt-4 md:pt-8"
        >
          Come experience the soul of the Caucasus — calm, clean, and completely yours.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
