// Este archivo contiene el contexto del slider para manejar el estado de las imágenes y la navegación entre ellas.

"use client";
import { createContext, useState, useContext } from "react";

const SliderContext = createContext();

export function SliderProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pics, setPics] = useState([]);

  const initializePics = (newPics) => {
    setPics(newPics);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pics.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? pics.length - 1 : prevIndex - 1));
  };

  return (
    <SliderContext.Provider value={{ currentIndex, nextSlide, prevSlide, initializePics, pics, setPics }}>
      {children}
    </SliderContext.Provider>
  );
}

export function useSlider() {
  return useContext(SliderContext);
}
