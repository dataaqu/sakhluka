"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

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

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Discover Our Gallery.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Explore the beauty of our curated gallery collection.
              </span>{" "}
              Each image tells a unique story, capturing moments of beauty, 
              creativity, and inspiration. Our carefully selected collection 
              showcases diverse perspectives and artistic expressions.
            </p>
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Photography",
    title: "Stunning Visual Stories",
    src: gallery1,
    content: <DummyContent />,
  },
  {
    category: "Art & Design",
    title: "Creative Expressions",
    src: gallery2,
    content: <DummyContent />,
  },
  {
    category: "Nature",
    title: "Natural Beauty Captured",
    src: gallery3,
    content: <DummyContent />,
  },
  {
    category: "Architecture",
    title: "Modern Design Elements",
    src: gallery4,
    content: <DummyContent />,
  },
  {
    category: "Lifestyle",
    title: "Moments of Inspiration",
    src: gallery5,
    content: <DummyContent />,
  },
  {
    category: "Culture",
    title: "Cultural Heritage",
    src: gallery6,
    content: <DummyContent />,
  },
  {
    category: "Travel",
    title: "Journey & Exploration",
    src: gallery7,
    content: <DummyContent />,
  },
  {
    category: "Urban",
    title: "City Life & Energy",
    src: gallery8,
    content: <DummyContent />,
  },
  {
    category: "Portrait",
    title: "Human Connection",
    src: gallery9,
    content: <DummyContent />,
  },
  {
    category: "Abstract",
    title: "Artistic Vision",
    src: gallery10,
    content: <DummyContent />,
  },
  {
    category: "Landscape",
    title: "Scenic Horizons",
    src: gallery11,
    content: <DummyContent />,
  },
  {
    category: "Minimalist",
    title: "Simple Elegance",
    src: gallery12,
    content: <DummyContent />,
  },
];
