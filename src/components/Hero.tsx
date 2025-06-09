import { motion } from "framer-motion";
import heroImage from "../assets/gallery4.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center 25%',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Sakhluka in Racha
          </motion.h1>
          
          <motion.p
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl font-light mb-8 text-gray-200"
          >
            Experience the soul of the Caucasus in our mountain cabin
          </motion.p>
          
        
        </div>
      </div>
    </section>
  );
};

// Welcome section that was part of the old Schedule component
export const WelcomeSection = ({ theme }: { theme?: string }) => {
  return (
    <section
      id="about-cabin"
      className="mx-auto max-w-5xl px-4 py-16 md:py-24 text-foreground"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-8 md:mb-20 text-2xl md:text-4xl font-black uppercase text-center"
        style={{
          color: theme === 'light' ? '#3154cf' : undefined
        }}
      >
        Welcome to Sakhluka in Racha
      </motion.h1>
      
      <div className="space-y-4 md:space-y-8">
        <motion.p
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
          className="text-base md:text-lg leading-relaxed"
          style={{
            color: theme === 'light' ? '#3154cf' : undefined
          }}
        >
          Nestled in the heart of Racha's majestic mountains, our cabin offers a peaceful retreat surrounded by pristine nature, fresh air, and breathtaking views. Whether you're seeking a quiet getaway or an adventure-filled stay, our cozy cabin is the perfect base.
        </motion.p>
        
        <motion.p
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
          className="text-base md:text-lg leading-relaxed"
          style={{
            color: theme === 'light' ? '#3154cf' : undefined
          }}
        >
          Wake up to the sound of rustling trees, enjoy coffee with a view, and unwind by the fireplace after a day of exploring Racha's hidden gems. Designed for comfort and simplicity, the cabin blends rustic charm with modern essentials to make your stay unforgettable.
        </motion.p>
        
        <motion.p
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.6 }}
          className="text-lg md:text-xl font-semibold text-center pt-4 md:pt-8"
          style={{
            color: theme === 'light' ? '#3154cf' : undefined
          }}
        >
          Come experience the soul of the Caucasus — calm, clean, and completely yours.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
