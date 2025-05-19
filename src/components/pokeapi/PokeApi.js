"use client";
import { useState, useRef } from "react";
import { usePoke } from "@/context/PokeContext";
import CustomSlider from "@/components/Slider/Slider";
import { useSlider } from "@/context/SliderContext";
import Loader from "@/components/loader/Loader";

export default function PokeApi() {
  const { setDisplay, display, error, loading, searchPokemon, maxId } = usePoke();
  const [content, setContent] = useState("");
  const audioRef = useRef(null);

  const { nextSlide, prevSlide, setPics } = useSlider();

  const typeColors = {
    normal: "bg-gray-300",
    fighting: "bg-orange-700",
    flying: "bg-indigo-400",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    rock: "bg-gray-500",
    bug: "bg-lime-500",
    ghost: "bg-indigo-700",
    steel: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-300",
    dragon: "bg-purple-800",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    stellar: "bg-gray-600",
    unknown: "bg-gray-200",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPokemon(content.toLowerCase());
    setContent("");
  };

  const handlePlaySound = () => {
    if (!audioRef.current) return;

    const src = display?.cries?.legacy || display?.cries?.latest;

    if (!src) {
      console.warn("No hay audio disponible para este Pokémon.");
      return;
    }

    if (audioRef.current.src !== src) {
      audioRef.current.src = src;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error("Error reproduciendo el sonido:", err);
    });
  };

  const handleNextPokemon = () => {
    if (!display || !maxId) return;
    const nextId = display.id + 1;

    if (nextId > maxId) {
      searchPokemon(1);
    } else {
      searchPokemon(nextId);
    }
  };

  const handlePrevPokemon = () => {
    if (!display || !maxId) return;
    const prevId = display.id - 1;

    if (prevId < 1) {
      searchPokemon(maxId);
    } else {
      searchPokemon(prevId);
    }
  };

  const handleRandomSearch = () => {
    setDisplay(null);
    setPics([]);
    if (!maxId) return;
    const randomId = Math.floor(Math.random() * maxId) + 1;
    searchPokemon(randomId);
  };

  const renderSlider = () => {
    if (loading) return <Loader />;

    if (!display) {
      return (
        <div className="flex flex-col items-center gap-2">
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <form onSubmit={handleSearch} className="flex flex-col items-center gap-2">
            <input
              type="text"
              placeholder="Pokedex!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={16}
              className="text-black w-[150px] sm:w-[200px] p-1 border border-black rounded-md"
            />
            <button type="submit" className="border border-black px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
              Buscar
            </button>
          </form>

        </div>
      );
    }

    return (
      <CustomSlider
        pics={[
          display.sprites.front_default,
          display.sprites.front_shiny,
          display.sprites.back_default,
          display.sprites.back_shiny,
        ].filter(Boolean)}
      />
    );
  };


  const renderData = () => {
    if (loading) return <p>Cargando...</p>;
    if (error) return
    if (display)
      return (
        <div className="relative flex flex-col items-center justify-center h-full p-1 gap-2">
          <span className="absolute top-0 right-0 text-xs text-gray-600 pr-1">#{display.id}</span>
          <div className="relative w-full">
            <h3
              className="font-bold text-center w-full autoshrink"
              title={display.name}
            >
              {display.name.charAt(0).toUpperCase() + display.name.slice(1)}
            </h3>

          </div>
          <div className="w-full flex justify-evenly space-x-2">
            {display.types.map((item, i) => {
              const typeName = item.type.name.toLowerCase();
              const bgColor = typeColors[typeName] || "bg-gray-200";
              return (
                <p
                  key={i}
                  className={`px-1 py-1 text-white rounded border ${bgColor}`}
                >
                  {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                </p>
              );
            })}
          </div>
        </div>
      );
  };

  return (
    <>
      <div className="flex flex-col w-[350px] h-[600px] sm:w-[450px] sm:h-[650px] shadow-2xl items-center sm:mt-10 p-2 border-[3px] border-black bg-red-500 rounded-[10px]">
        <div className="relative h-[90px] sm:h-[120px] w-full top_border"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 50% 100%, 0% 100%)" }}>
          <span
            className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] absolute ring-4 ring-white left-4 top-1/2 transform -translate-y-1/2 rounded-full transition-colors duration-300 ${loading ? 'bg-blue-400 ring-blue-200' : 'bg-blue-800'}`} >
          </span>
          <div className="absolute left-[40%] top-4 transform -translate-x-1/2 flex items-center justify-center gap-5">
            <span className={`w-[12px] h-[12px] rounded-[100%] ${!display ? "ring-4 ring-red-300 bg-red-600" : "bg-red-800"}`}></span>
            <span className={`w-[12px] h-[12px] rounded-[100%] ${loading ? "ring-4 ring-yellow-300 bg-yellow-600" : "bg-yellow-800"}`}></span>
            <span className={`w-[12px] h-[12px] rounded-[100%] ${display ? "ring-4 ring-green-300 bg-green-600" : "bg-green-800"}`}></span>
          </div>
        </div>


        <div className="h-full w-full sm:mt-2 flex flex-col gap-5 justify-center">
          <div className="flex flex-col mt-9 relative h-[380px] sm:h-[400px] mx-6 sm:mx-11">
            <div className="flex items-center h-[300px] w-[100%] px-9 py-12 border border-black bg-gray-300 rounded-md" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 80% 170%, 0% 90%" }}>
              <div className="absolute left-11 w-[204px] sm:w-[254px] h-[203px] sm:h-[214px] flex items-center justify-center border border-black rounded-md"
                style={{
                  backgroundImage: "radial-gradient(at 50% 50%, #bae6fd, #60a5fa, #1e3a8a 150%)",
                }}>
                {renderSlider()}
              </div>

              <div className="absolute left-1/2 top-5 transform -translate-x-1/2 flex items-center justify-center gap-7">
                <span className={`w-[8px] h-[8px] ${display ? "ring ring-red-300 bg-red-600" : "bg-red-800"} rounded-[100%]`}></span>
                <span className={`w-[8px] h-[8px] ${display ? "ring ring-red-300 bg-red-600" : "bg-red-800"} rounded-[100%]`}></span>
              </div>

              <div>
                <span className="absolute right-9 bottom-[31px] border border-black w-[30px] rounded-xl"></span>
                <span className="absolute right-9 bottom-[23px] border border-black w-[30px] rounded-xl"></span>
                <span className="absolute right-9 bottom-[15px] border border-black w-[30px] rounded-xl"></span>
              </div>

              <span className="absolute left-12 bottom-[16px] transform w-[15px] h-[15px] ring-4 ring-red-400 bg-red-600 rounded-[100%]"></span>
            </div>

          </div>
          <div className="relative h-[100%]">
            <button onPointerDown={handleRandomSearch} className="w-[45px] h-[45px] ring ring-gray-800 bg-gray-700 absolute top-7 left-4 sm:top-5 rounded-[100%] ease-in-out active:scale-95"></button>

            <div className="absolute left-[50%] sm:left-[40%] top-0 transform -translate-x-1/2 flex items-center justify-center gap-9">
              <button onPointerDown={() => setDisplay(null)} className="w-[50px] h-[8px] ring ring-red-800 bg-red-700 rounded-lg ease-in-out active:scale-95"></button>
              <audio ref={audioRef} src={display?.cries?.latest || null} preload="auto" />
              <button onPointerDown={handlePlaySound} className="w-[50px] h-[8px] ring ring-blue-800 bg-blue-700 rounded-lg ease-in-out active:scale-95"></button>
            </div>

            <div className={`w-[155px] h-[90px] rounded-lg absolute bottom-6 sm:bottom-10 left-[85px] sm:left-[95px] ring ring-green-800 ${display ? "bg-green-500" : "bg-green-700"}`}>
              {renderData()}
            </div>

            <div className="absolute right-0 bottom-7 sm:right-9 sm:bottom-9 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
              <div className="relative w-full h-full">
                <button onPointerDown={handleNextPokemon} className="absolute left-1/2 transform -translate-x-1/2 w-[30px] h-[50px] bg-gray-800 rounded-md hover:scale-105 active:scale-95 text-gray-500 text-xl">▲</button>
                <button onPointerDown={prevSlide} className="pr-3 absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[30px] bg-gray-800 rounded-md hover:scale-105 active:scale-95 text-gray-500 text-xl">◄</button>
                <button onPointerDown={handlePrevPokemon} className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[30px] h-[50px] bg-gray-800 rounded-md hover:scale-105 active:scale-95 text-gray-500 text-xl">▼</button>
                <button onPointerDown={nextSlide} className=" justify-end pl-3 absolute top-1/2 right-0 transform -translate-y-1/2 w-[50px] h-[30px] bg-gray-800 rounded-md hover:scale-105 active:scale-95 text-gray-500 text-xl">►</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
