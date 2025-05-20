import { PokeProvider } from "@/context/PokeContext";
import { SliderProvider } from "@/context/SliderContext";
import PokeApi from "@/components/pokeapi/PokeApi";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center mt-4 overflow-x-hidden">
      <section className="flex flex-col items-center flex-grow">
        <PokeProvider>
          <SliderProvider>
            <PokeApi />
          </SliderProvider>
        </PokeProvider>
      </section>
    </main>
  );
}
