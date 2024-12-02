import { useState } from "react";
import { motion } from "framer-motion";
import './About.css';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { color: "#fcf6ee", 
      text: "Jag älskar EasyBake! Det var så enkelt att hitta inspiration till att baka något riktigt gott. Designen är ren och lätt att navigera, och recepten är fulla av kreativa idéer. Jag hittade snabbt ett recept på muffins som blev en succé vid fikabordet! Det här är min nya favoritplats för bakningstips!",
      author: "- Anna Toadstoolsson"
    },
    { color: "#fcf6ee", 
      text: "Den här sidan är en riktig skattkista för oss som älskar att baka! Jag behövde något snabbt och enkelt till en fika och hittade ett recept på kladdkaka som blev perfekt. Tack för en tydlig och inspirerande sida!",
      author: "- Kalle Kanelberg"
    },
    { color: "#fcf6ee", 
      text: "Jag har aldrig haft så mycket bakglädje som efter att jag hittade den här sidan! Inspirationen flödar och jag uppskattar verkligen hur lätt det är att filtrera fram precis det jag är sugen på. Mina bullar blev en hit, och nu vill jag baka varje dag!",
      author: "- Sara Sockerlund"},
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="carousel">
      <button className="carousel__button left" onClick={prevSlide}>
        ❮
      </button>

      <motion.div
        className="carousel__slide"
        key={currentIndex}
        custom={1}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        style={{ backgroundColor: slides[currentIndex].color }}
      >
        <p className="carousel__text">{slides[currentIndex].text}</p>
        <p className="carousel__author">{slides[currentIndex].author}</p>
      </motion.div>

      <button className="carousel__button right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};
export default TestimonialCarousel;
