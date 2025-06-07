import { motion } from "framer-motion";
import { ParallaxScroll } from "./ui/parallax-scroll";

// Import local gallery images
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";
import gallery8 from "../assets/gallery8.jpg";
import gallery9 from "../assets/gallery9.jpg";
import gallery10 from "../assets/gallery10.jpg";
import gallery11 from "../assets/gallery11.jpg";
import gallery12 from "../assets/gallery12.jpg";

export function ParallaxScrollDemo() {
  return (
    <div className="w-full bg-background">
      {/* Gallery Title Section */}
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-8">
        <motion.h2 
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center"
        >
          Our cabin, inside and out — a visual journey
        </motion.h2>
      </div>
      
      <ParallaxScroll images={images} />
    </div>
  );
}

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
];
