import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SiAirbnb } from "react-icons/si";
import mountainImage from "../assets/5.jpg";

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<{
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}> = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center 70%",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-background/70 dark:bg-foreground/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<{ subheading: string; heading: string }> = ({
  subheading,
  heading,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-5xl text-white">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-8xl text-white">{heading}</p>
    </motion.div>
  );
};

const ExampleContent: React.FC<{ theme?: string }> = ({ theme }) => (
  <div className="mx-auto  max-w-5xl  gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    
    <div className="col-span-1 md:col-span-8">
      <motion.p 
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-4 text-xl md:text-3xl"
        style={{
          color: theme === 'light' ? '#3154cf' : undefined
        }}
      >
Surrounded by forest paths, mountain streams, and the quiet rhythm of nature, Sakhluka invites you to truly slow down. Spend your days exploring nearby trails or simply lounging in the sun-drenched yard with a good book. Evenings are perfect for gathering around the outdoor fire, sharing stories, and watching the stars light up the sky.

      </motion.p>
      <motion.p 
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
        className="mb-8 text-xl md:text-3xl"
        style={{
          color: theme === 'light' ? '#3154cf' : undefined
        }}
      >
Let the stillness of Racha renew your spirit. Book your stay at Sakhluka now and make space for peace, comfort, and unforgettable mountain moments.








      </motion.p>
      <motion.button 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
        onClick={() => window.open('https://airbnb.com', '_blank')}
        className="w-full md:w-fit px-9 py-4 text-xl rounded-md border-[1px] border-slate-300 bg-slate-950 text-white hover:bg-slate-800 transition-all duration-300 group relative overflow-hidden cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
        >
        </motion.div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          <SiAirbnb className="text-2xl group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
          Book Your Stay <FiArrowUpRight className="inline group-hover:rotate-12 transition-transform duration-300" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      </motion.button>
    </div>
  </div>
);

const About: React.FC<{ theme?: string }> = ({ theme }) => {
  return (
    <div id="about" className="bg-background transition-colors duration-300">
      <TextParallaxContent
        imgUrl={mountainImage}
        subheading="Discover"
        heading="Sakhluka"
      >
        <ExampleContent theme={theme} />
      </TextParallaxContent>
    </div>
  );
};

export default About;
