import { useState } from "react";
import './About.css';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { color: "#fcf6ee", text: "A testimonial from someone" },
    { color: "#fcf6ee", text: "Anotha" },
    { color: "#fcf6ee", text: "What the-" },
    { color: "#fcf6ee", text: "Sigma" },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <button className="carousel__button left" onClick={prevSlide}>
        ❮
      </button>

      <div
        className="carousel__slide"
        style={{ backgroundColor: slides[currentIndex].color }}
      >
        <h2>{slides[currentIndex].text}</h2>
      </div>

      <button className="carousel__button right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default TestimonialCarousel;
