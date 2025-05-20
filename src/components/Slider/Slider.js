// Componente para mostrar una galería de imágenes en un slider

"use client";
import { useEffect } from "react";
import { useSlider } from "@/context/SliderContext";

const CustomSlider = ({ pics }) => {
  const { currentIndex, initializePics, pics: contextPics } = useSlider();

  useEffect(() => {
    if (JSON.stringify(contextPics) !== JSON.stringify(pics)) {
      initializePics(pics);
    }
  }, [pics]);

  return (
    <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[212px] max-w-3xl mx-auto overflow-hidden border border-black rounded-md shadow-lg bg-white">
      <div className="flex" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {contextPics.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i + 1}`} className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]" />
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {contextPics.map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full border border-black ${index === currentIndex ? "bg-blue-400" : "bg-gray-400"}`} />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
