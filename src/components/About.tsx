import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
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
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
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
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent: React.FC = () => (
  <div className="mx-auto  max-w-5xl  gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-3xl">
Surrounded by forest paths, mountain streams, and the quiet rhythm of nature, Sakhluka invites you to truly slow down. Spend your days exploring nearby trails or simply lounging in the sun-drenched yard with a good book. Evenings are perfect for gathering around the outdoor fire, sharing stories, and watching the stars light up the sky.

      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-3xl">
Let the stillness of Racha renew your spirit. Book your stay at Sakhluka now and make space for peace, comfort, and unforgettable mountain moments.








      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Book Your Stay <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <div id="about" className="bg-white">
      <TextParallaxContent
        imgUrl={mountainImage}
        subheading="Discover"
        heading="Sakhluka"
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  );
};

export default About;
