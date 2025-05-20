// Componente de animación utilizando una imagen de Pokeball

const Loader = () => {
  return (
    <div className={"loader"}>
      <img src="pokeicon.png" className="w-[50px] h-[45] sm:w-[60px] sm:h-[55px] loader_spinner" />
    </div>
  );
};

export default Loader;
