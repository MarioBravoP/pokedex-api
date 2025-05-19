"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { getFixedName } from "@/utils/pokemonAliases";

const PokeContext = createContext();

export function PokeProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxId, setMaxId] = useState(null);

  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1&offset=9999');
        const data = await res.json();
        if (data && data.count) {
          setMaxId(data.count);
        }
      } catch (err) {
        console.error('No se pudo obtener el número máximo de Pokémon', err);
      }
    };

    fetchMaxId();
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`, { signal });

        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }

        const data = await response.json();
        setDisplay(data);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") return;
        setDisplay(null);
        setError("Error, búsqueda no válida");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [searchTerm]);

  const searchPokemon = (name) => {
    const fixedName = getFixedName(name);
    setSearchTerm(fixedName);
  };

  return (
    <PokeContext.Provider value={{setDisplay, display, error, loading, searchPokemon, maxId }}>
      {children}
    </PokeContext.Provider>
  );
}

export function usePoke() {
  return useContext(PokeContext);
}
