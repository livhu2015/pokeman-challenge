import { useEffect, useCallback, useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { Loader } from "./Loader";
import { Search } from "./Search";

export const HomeGrid = (props: any) => {
  const { isLoading, load, pokemons } = usePokemons();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { onSelectedPokemon } = props;

  useEffect(() => {
    load(currentPage);
  }, []);

  const handleSelectedPokemon = useCallback(
    (pokemon: any) => {
      onSelectedPokemon(pokemon);
    },
    [onSelectedPokemon]
  );

  const handleLoadMore = useCallback(() => {
    setCurrentPage((p) => {
      const page = ++p;
      load(page);
      return page;
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Search onSearch={setSearch} />
      <div className="flex flex-wrap place-items-center w-full mb-40">
        {pokemons
          .filter(
            (v) =>
              !search ||
              JSON.stringify(v).toLowerCase().includes(search.toLowerCase())
          )
          .map((pokemon) => (
            <div
              onClick={(e) => handleSelectedPokemon(pokemon)}
              className="xl:w-1/4 md:w-1/3 w-1/2 p-2 place-items-center relative"
            >
              <span className="absolute text-7xl opacity-10 hover:opacity-100 top-1/4 px-2 text-primary">
                {pokemon.id}
              </span>
              <div className="grid cursor-pointer place-items-center shadow-md rounded-sm hover:bg-secondary">
                <img className="h-28 w-auto" src={pokemon.frontImg} />
                <h4 className="font-semibold text-lg p-2">{pokemon.name}</h4>
              </div>
            </div>
          ))}
      </div>
      <div className="grid place-items-center my-10 fixed bottom-0 w-full">
        <button
          onClick={handleLoadMore}
          className="w-1/2 bg-primary p-2 mx-20 shadow-md rounded-lg bg-opacity-80 text-white hover:bg-opacity-100"
        >
          Load More
        </button>
      </div>
    </>
  );
};
